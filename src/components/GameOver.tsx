import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';

export const GameOver: React.FC = () => {
    const { score, startGame } = useGameStore();
    const [playerName, setPlayerName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerName.trim()) return;

        await supabase.from('scores').insert([
            {
                player_name: playerName,
                score,
            },
        ]);

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Score Submitted!</h2>
                <button
                    onClick={startGame}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-xl text-yellow-400 mb-4">Score: {score}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter Player Name"
                    className="px-4 py-2 rounded"
                    maxLength={20}
                    required
                />
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                    >
                        Submit Score
                    </button>
                </div>
            </form>
        </div>
    );
};
