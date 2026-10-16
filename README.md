# Platinum 24s Web Game SE

## Running the Game Locally

The game uses a Python server to serve the web application and provide persistent leaderboard functionality.

### Requirements

- Python 3 installed
- A web browser
- No additional Python packages required

### Starting the Game

1. Open the project folder in VS Code.
2. Open a terminal in the project's root directory (where `server.py` is located).
3. Start the Python server:

   `python server.py`

   If that command does not work on Windows, try:

   `py server.py`

4. Open a browser and navigate to:

   **http://127.0.0.1:8000**

5. To stop the server, press **Ctrl+C** in the terminal.

### Leaderboard

The leaderboard uses a Python API to save and retrieve player scores.

- **GET /api/leaderboard** — Retrieves the top five scores.
- **POST /api/leaderboard** — Submits a player's completion time.
- Scores are saved in `data/leaderboard.json`.
- The server automatically creates the data directory and leaderboard file when the first score is saved.

**Important:** Run the game through the Python server rather than opening `index.html` directly. The leaderboard API requires the server to be running.

### Additional Server Options

To run the game on a different port:

`python server.py --port 8080`

To stop the server, press Ctrl+C.