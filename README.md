
# Tic-Tac-Toe 
This repo contains solutions to problems 1 2 and 3 of the problem set 

### 1. Start the database
With a docker daemon running, from the project root:

```bash
docker compose up -d
```

### 2. Start the backend server
Navigate to the server file and start the backend

```bash
cd server
npm install
npm run dev
```

This should start the backend at localhost 3000

### 3. Start the frontend
In a separate terminal:

```bash
cd client
npm install
npm start
```

This should start the frontend at localhost 3001

### Gameplay: 

1. Enter names for player X and player O
2. Click Start Game
3. Play turns by clicking cells
4. After the game ends, use Reset Game to start again
5. Leaderboard stats are loaded from the backend

