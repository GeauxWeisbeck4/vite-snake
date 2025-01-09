import React, { useEffect, useCallback } from 'react';
import { useGameStore } from "../store/gameStore";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export const GameBoard: React.FC = () => {
    const { snake, food, moveSnake, setDirection, gameOver } = useGameStore();

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    setDirection('UP');
                    break;
                case 'ArrowDown':
                    setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    setDirection('RIGHT');
                    break;
            }
        },
        [setDirection]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(moveSnake, 100);
            return () => clearInterval(interval);
        }
    }, [moveSnake, gameOver]);

    return (
        <div
            className="relative bg-gray-600 border-2 border-gray-600"
            style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
            }}
        >
            {snake.map((segment, index) => (
                <div
                    key={index}
                    className="absolute bg-green-500 rounded-sm"
                    style={{
                        width: CELL_SIZE - 2,
                        height: CELL_SIZE - 2,
                        left: segment.x * CELL_SIZE,
                        top: segment.y * CELL_SIZE,
                    }}
                />
            ))}
            <div
                className="absolute bg-red-500 rounded-full"
                style={{
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    left: food.x * CELL_SIZE,
                    top: food.y * CELL_SIZE,
                }}
            />
        </div>
    );
};
