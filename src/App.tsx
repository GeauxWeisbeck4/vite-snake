
import { GameBoard } from './components/GameBoard';
import { Scoreboard } from './components/Scoreboard';
import { GameOver } from './components/GameOver';
import { useGameStore } from './store/gameStore';
import { Gamepad2 } from 'lucide-react';

function App() {
  const { score, gameOver, isPlaying, startGame } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
            <Gamepad2 className="w-10 h-10" />
            Snake.js
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {!isPlaying ? (
              <div className="flex items-center justify-center h-full">
                <button
                  onClick={startGame}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition-colors"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-white text-xl font-bold">Score: {score}</div>
                <GameBoard />
                {gameOver && <GameOver />}
              </div>
            )}
          </div>

          <div>
            <Scoreboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
