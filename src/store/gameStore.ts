import { create } from 'zustand';

/**
 * Position interface implementation
 *
 */
interface Position {
    x: number;
    y: number;
}

/**
 * Gamestate interface for variables
 * snake, food, direction, score, gameOver, isPlaying, setDirection, moveSnake, startGame, endGame
 */
interface GameState {
    snake: Position[];
    food: Position;
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    score: number;
    gameOver: boolean;
    isPlaying: boolean;
    setDirection: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
    moveSnake: () => void;
    startGame: () => void;
    endGame: () => void;
}

const GRID_SIZE = 20;

const createFood = (): Position => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
});

const initialSnake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];

export const useGameStore = create<GameState>((set, get) => ({
    snake: initialSnake,
    food: createFood(),
    direction: 'UP',
    score: 0,
    gameOver: false,
    isPlaying: false,

    setDirection: (newDirection) => {
        const { direction } = get();
        const opposites = {
            UP: 'DOWN',
            DOWN: 'UP',
            LEFT: 'RIGHT',
            RIGHT: 'LEFT',
        };

        if (opposites[newDirection] !== direction) {
            set({ direction: newDirection });
        }
    },

    moveSnake: () => {
        const { snake, food, direction, gameOver } = get();
        if (gameOver) return;

        const head = { ...snake[0] };

        switch (direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }

        // Check for collisions with wall
        if (
            head.x < 0 ||
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE
        ) {
            set({ gameOver: true });
            return;
        }

        // Check for collisions with self
        if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
            set({ gameOver: true });
            return;
        }

        const newSnake = [head];
        const ateFood = head.x === food.x && head.y === food.y;

        // If snake ateFood, don't remove tail and generate new food
        if (ateFood) {
            newSnake.push(...snake);
            set((state) => ({
                food: createFood(),
                score: state.score + 10,
            }));
        } else {
            newSnake.push(...snake.slice(0, -1));
        }

        set({ snake: newSnake });
    },

    startGame: () => {
        set({
            snake: initialSnake,
            food: createFood(),
            direction: 'UP',
            gameOver: false,
            isPlaying: true,
        });
    },

    endGame: () => {
        set({ gameOver: true, isPlaying: false });
    },
}));
