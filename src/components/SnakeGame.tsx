import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

// Game constants
const GRID_SIZE = 20; // Size of each grid cell
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 100; // milliseconds per frame
const POINTS_PER_FOOD = 10;

interface Position {
  x: number;
  y: number;
}

interface Direction {
  x: number;
  y: number;
}

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [scorePopup, setScorePopup] = useState<{ show: boolean; x: number; y: number }>({ 
    show: false, 
    x: 0, 
    y: 0 
  });

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * (400 / GRID_SIZE)),
        y: Math.floor(Math.random() * (400 / GRID_SIZE)),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      }

      const key = e.key.toLowerCase();
      
      // Prevent default for arrow keys to avoid page scrolling
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
      }

      setNextDirection(current => {
        // Arrow keys
        if ((key === "arrowup" || key === "w") && current.y === 0) {
          return { x: 0, y: -1 };
        }
        if ((key === "arrowdown" || key === "s") && current.y === 0) {
          return { x: 0, y: 1 };
        }
        if ((key === "arrowleft" || key === "a") && current.x === 0) {
          return { x: -1, y: 0 };
        }
        if ((key === "arrowright" || key === "d") && current.x === 0) {
          return { x: 1, y: 0 };
        }
        return current;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  // Main game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setDirection(nextDirection);
      
      setSnake(currentSnake => {
        // Calculate new head position
        const head = currentSnake[0];
        const newHead = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= 400 / GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= 400 / GRID_SIZE
        ) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return currentSnake;
        }

        // Create new snake with new head
        const newSnake = [newHead, ...currentSnake];

        // Check if food is eaten
        if (newHead.x === food.x && newHead.y === food.y) {
          // Snake grows (don't remove tail)
          setScore(s => {
            const newScore = s + POINTS_PER_FOOD;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("snakeHighScore", newScore.toString());
            }
            return newScore;
          });
          
          // Show score popup
          setScorePopup({ 
            show: true, 
            x: newHead.x * GRID_SIZE, 
            y: newHead.y * GRID_SIZE 
          });
          setTimeout(() => setScorePopup(prev => ({ ...prev, show: false })), 1000);
          
          // Generate new food
          setFood(generateFood(newSnake));
          return newSnake;
        } else {
          // Remove tail (no growth)
          newSnake.pop();
          return newSnake;
        }
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, nextDirection, food, generateFood, highScore]);

  // Render game on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid (subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 400; i += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 400);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(400, i);
      ctx.stroke();
    }

    // Draw snake with gradient
    snake.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        (segment.x + 1) * GRID_SIZE,
        (segment.y + 1) * GRID_SIZE
      );
      
      // Head is brightest, tail fades
      const alpha = 1 - (index / snake.length) * 0.5;
      gradient.addColorStop(0, `hsla(280, 80%, 60%, ${alpha})`);
      gradient.addColorStop(1, `hsla(320, 75%, 60%, ${alpha})`);

      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "hsl(280, 80%, 60%)";
      ctx.fillRect(
        segment.x * GRID_SIZE + 2,
        segment.y * GRID_SIZE + 2,
        GRID_SIZE - 4,
        GRID_SIZE - 4
      );
      ctx.shadowBlur = 0;
    });

    // Draw food with pulsing glow effect
    const time = Date.now() / 500;
    const pulseSize = Math.sin(time) * 2 + 2;
    
    const foodGradient = ctx.createRadialGradient(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      0,
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 + pulseSize
    );
    foodGradient.addColorStop(0, "hsl(190, 100%, 70%)");
    foodGradient.addColorStop(0.5, "hsl(190, 100%, 50%)");
    foodGradient.addColorStop(1, "hsl(190, 100%, 30%)");

    ctx.fillStyle = foodGradient;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "hsl(190, 100%, 50%)";
    ctx.beginPath();
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food]);

  // Restart game
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setScorePopup({ show: false, x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow opacity-30 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-30 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* Scoreboard */}
        <div className="w-full bg-glass-bg/50 backdrop-blur-xl border border-glass-border rounded-2xl p-6 shadow-elevated">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-muted-foreground text-sm font-medium mb-1">Score</div>
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {score}
              </div>
            </div>
            <div className="h-12 w-px bg-glass-border" />
            <div className="text-center">
              <div className="text-muted-foreground text-sm font-medium mb-1">High Score</div>
              <div className="text-4xl font-bold text-neon-cyan">
                {highScore}
              </div>
            </div>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div className="relative bg-glass-bg/50 backdrop-blur-xl border-2 border-glass-border rounded-2xl p-4 shadow-elevated">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="rounded-xl bg-display-bg"
          />

          {/* Score Popup */}
          {scorePopup.show && (
            <div
              className="absolute text-2xl font-bold text-neon-cyan animate-fade-in pointer-events-none"
              style={{
                left: `${scorePopup.x + 20}px`,
                top: `${scorePopup.y + 20}px`,
                textShadow: "0 0 10px hsl(190, 100%, 50%)",
              }}
            >
              +{POINTS_PER_FOOD}
            </div>
          )}

          {/* Start Message */}
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
              <div className="text-center p-6 space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Snake Game
                </h2>
                <p className="text-muted-foreground">
                  Use Arrow Keys or WASD to start
                </p>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm rounded-xl animate-scale-in">
              <div className="text-center p-6 space-y-6">
                <h2 className="text-4xl font-bold text-destructive animate-glow-pulse">
                  Game Over
                </h2>
                <div className="space-y-2">
                  <p className="text-xl text-foreground">
                    Final Score: <span className="font-bold text-neon-cyan">{score}</span>
                  </p>
                  {score === highScore && score > 0 && (
                    <p className="text-sm text-accent animate-fade-in">
                      🎉 New High Score!
                    </p>
                  )}
                </div>
                <Button
                  onClick={restartGame}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
                >
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Controls Info */}
        <div className="text-center text-muted-foreground text-sm space-y-1">
          <p>🎮 Arrow Keys or WASD to move</p>
          <p>🍎 Eat the glowing orbs to grow and score points</p>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
