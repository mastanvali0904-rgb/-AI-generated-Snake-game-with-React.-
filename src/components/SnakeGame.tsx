import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const MOVE_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, MOVE_SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
      <div className="flex justify-between w-full px-4 glass py-4 rounded-xl border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-neon-cyan" />
          <span className="font-mono text-xl neon-glow-cyan uppercase tracking-tighter">Score: {score}</span>
        </div>
        <div className="font-mono text-white/40 uppercase text-xs flex items-center">
            High Score: {highScore}
        </div>
      </div>

      <div 
        className="relative aspect-square w-full bg-black/60 rounded-xl overflow-hidden border-2 border-cyan-500/30 neon-border-cyan shadow-[0_0_20px_rgba(0,255,255,0.1)]"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {/* Grid Lines */}
        <div className="absolute inset-0 grid pointer-events-none opacity-5" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-cyan-300" />
          ))}
        </div>

        {/* Snake Rendering */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${i}`}
            className="rounded-sm"
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
              backgroundColor: i === 0 ? '#00ffff' : '#00ffff66',
              boxShadow: i === 0 ? '0 0 10px #00ffff' : 'none'
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          />
        ))}

        {/* Food Rendering */}
        <motion.div
          className="rounded-full bg-neon-pink"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
            boxShadow: '0 0 15px #ff00ff'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm z-50"
            >
              <h2 className="text-4xl font-bold neon-glow-pink mb-2 text-neon-pink tracking-widest italic uppercase">System Crash</h2>
              <p className="text-white/60 font-mono mb-8 uppercase text-sm">Snake encountered a segmentation fault</p>
              <button 
                onClick={resetGame}
                className="p-4 bg-neon-cyan hover:bg-cyan-400 text-black rounded-lg transition-all font-bold flex items-center gap-2 group shadow-[0_0_20px_rgba(0,255,255,0.4)]"
              >
                <div className="group-hover:rotate-180 transition-transform duration-500">
                  <RotateCcw className="w-6 h-6" />
                </div>
                REBOOT SYSTEM
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-white/20 font-mono text-[10px] uppercase tracking-[0.2em] w-full flex justify-between px-2">
        <span>Use WASD or Arrows</span>
        <span>Grid v2.04.16</span>
      </div>
    </div>
  );
}
