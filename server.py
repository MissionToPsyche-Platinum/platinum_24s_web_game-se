"""Local game server and JSON leaderboard. No extra packages required."""

# 1. Imports and project location: find docs/ and data/ beside this file.
import argparse
import json
import math
import os
from pathlib import Path
import tempfile
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent


# 2. Validate submissions: check the player name and completion time.
def validate_entry(value):
    if not isinstance(value, dict):
        raise ValueError("Expected a JSON object.")

    name = value.get("name")
    time_ms = value.get("timeMs")

    if not isinstance(name, str) or not name.strip() or len(name.strip()) > 50:
        raise ValueError("name must contain 1–50 characters.")

    name = name.strip()

    if any(ord(char) < 32 or ord(char) == 127 for char in name):
        raise ValueError("name cannot contain control characters.")

    if (
        isinstance(time_ms, bool)
        or not isinstance(time_ms, (int, float))
        or not math.isfinite(time_ms)
        or not 0 < time_ms <= 86_400_000
    ):
        raise ValueError(
            "timeMs must be greater than zero and at most 86400000."
        )

    return {"name": name, "timeMs": time_ms}


# 3. JSON storage: read/save the top five; replace this class for a database later.
class LeaderboardStore:
    def __init__(self, path):
        self.path = Path(path)
        # Prevent simultaneous requests from overwriting each other's scores.
        self.lock = threading.Lock()

    def _read(self):
        if not self.path.exists():
            return []

        entries = json.loads(self.path.read_text(encoding="utf-8"))

        if not isinstance(entries, list):
            raise ValueError("Invalid leaderboard file.")

        return sorted(
            (validate_entry(entry) for entry in entries),
            key=lambda entry: entry["timeMs"],
        )[:5]

    def load(self):
        with self.lock:
            return self._read()

    def save(self, entry):
        with self.lock:
            entries = sorted(
                self._read() + [entry],
                key=lambda item: item["timeMs"],
            )[:5]

            self.path.parent.mkdir(parents=True, exist_ok=True)
            temporary = None

            try:
                # Write a temporary file first, then replace the existing file.
                with tempfile.NamedTemporaryFile(
                    mode="w",
                    encoding="utf-8",
                    dir=self.path.parent,
                    delete=False,
                ) as file:
                    temporary = file.name
                    json.dump(entries, file, indent=2, allow_nan=False)
                    file.write("\n")
                    file.flush()
                    os.fsync(file.fileno())

                os.replace(temporary, self.path)
            finally:
                if temporary and os.path.exists(temporary):
                    os.unlink(temporary)

            return entries


# 4. Create the server: serve game files from docs/ and attach the API handler.
def make_server(host, port, data_file):
    store = LeaderboardStore(data_file)

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(
                *args,
                directory=str(ROOT / "docs"),
                **kwargs,
            )

        # 5. JSON responses: send a status code, headers, and response body.
        def reply(self, status, value, head=False):
            body = json.dumps(value, allow_nan=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()

            if not head:
                self.wfile.write(body)

        # 6. GET requests: return leaderboard scores or serve game files.
        def do_GET(self):
            path = urlsplit(self.path).path

            if path == "/api/leaderboard":
                try:
                    self.reply(200, store.load())
                except (OSError, ValueError):
                    self.reply(
                        500,
                        {"error": "Leaderboard storage is unavailable."},
                    )
            elif path.startswith("/api/"):
                self.reply(404, {"error": "Unknown API endpoint."})
            else:
                super().do_GET()

        # HEAD serves file headers; the API currently supports GET and POST.
        def do_HEAD(self):
            if urlsplit(self.path).path.startswith("/api/"):
                self.reply(405, {"error": "Use GET or POST."}, head=True)
            else:
                super().do_HEAD()

        # 7. POST requests: validate a score, save it, and return the top five.
        def do_POST(self):
            if urlsplit(self.path).path != "/api/leaderboard":
                self.reply(404, {"error": "Unknown API endpoint."})
                return

            # Close the connection after handling or rejecting the submission.
            self.close_connection = True

            if self.headers.get_content_type() != "application/json":
                self.reply(
                    415,
                    {"error": "Content-Type must be application/json."},
                )
                return

            try:
                length = int(self.headers.get("Content-Length", "0"))

                if not 0 < length <= 4096:
                    self.reply(
                        413,
                        {"error": "Request body must contain 1–4096 bytes."},
                    )
                    return

                self.connection.settimeout(10)
                entry = validate_entry(
                    json.loads(self.rfile.read(length))
                )
            except (ValueError, UnicodeError):
                self.reply(
                    400,
                    {"error": "Invalid JSON, name, or timeMs."},
                )
                return
            except OSError:
                self.reply(408, {"error": "Request body timed out."})
                return

            try:
                self.reply(201, store.save(entry))
            except (OSError, ValueError):
                self.reply(
                    500,
                    {"error": "Leaderboard storage is unavailable."},
                )

    return ThreadingHTTPServer((host, port), Handler)


# 8. Start the server: defaults to localhost:8000; Ctrl+C stops it.
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument(
        "--data-file",
        type=Path,
        default=ROOT / "data" / "leaderboard.json",
    )
    args = parser.parse_args()

    server = make_server(args.host, args.port, args.data_file)
    print(
        f"Game: http://{args.host}:{server.server_port}",
        flush=True,
    )

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()