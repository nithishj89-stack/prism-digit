import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Calculator Component
 * A beautiful, modern calculator with glassmorphism and neon aesthetics
 * Performs basic arithmetic operations: +, -, *, /
 */
const Calculator = () => {
  // State to store the current display value
  const [display, setDisplay] = useState("0");
  // State to store the previous value for operations
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  // State to store the current operation
  const [operation, setOperation] = useState<string | null>(null);
  // Flag to check if we just finished an operation
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  /**
   * Handle number button clicks
   * Appends the clicked number to the display
   */
  const handleNumberClick = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  /**
   * Handle decimal point button click
   * Adds a decimal point if one doesn't already exist
   */
  const handleDecimalClick = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  /**
   * Handle operation button clicks (+, -, *, /)
   * Stores the current value and operation for later calculation
   */
  const handleOperationClick = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || "0";
      const newValue = performCalculation(parseFloat(currentValue), inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  /**
   * Perform the actual calculation based on the operation
   * Returns the result of the calculation
   */
  const performCalculation = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  /**
   * Handle equals button click
   * Performs the final calculation and displays the result
   */
  const handleEqualsClick = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = parseFloat(previousValue);
      const newValue = performCalculation(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  /**
   * Handle clear button click
   * Resets the calculator to initial state
   */
  const handleClearClick = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  /**
   * Calculator button configuration
   * Defines the layout and properties of each button
   */
  const buttons = [
    { label: "C", onClick: handleClearClick, variant: "special" as const, className: "col-span-2" },
    { label: "/", onClick: () => handleOperationClick("/"), variant: "operator" as const },
    { label: "*", onClick: () => handleOperationClick("*"), variant: "operator" as const },
    
    { label: "7", onClick: () => handleNumberClick("7"), variant: "digit" as const },
    { label: "8", onClick: () => handleNumberClick("8"), variant: "digit" as const },
    { label: "9", onClick: () => handleNumberClick("9"), variant: "digit" as const },
    { label: "-", onClick: () => handleOperationClick("-"), variant: "operator" as const },
    
    { label: "4", onClick: () => handleNumberClick("4"), variant: "digit" as const },
    { label: "5", onClick: () => handleNumberClick("5"), variant: "digit" as const },
    { label: "6", onClick: () => handleNumberClick("6"), variant: "digit" as const },
    { label: "+", onClick: () => handleOperationClick("+"), variant: "operator" as const },
    
    { label: "1", onClick: () => handleNumberClick("1"), variant: "digit" as const },
    { label: "2", onClick: () => handleNumberClick("2"), variant: "digit" as const },
    { label: "3", onClick: () => handleNumberClick("3"), variant: "digit" as const },
    { label: "=", onClick: handleEqualsClick, variant: "equals" as const, className: "row-span-2" },
    
    { label: "0", onClick: () => handleNumberClick("0"), variant: "digit" as const, className: "col-span-2" },
    { label: ".", onClick: handleDecimalClick, variant: "digit" as const },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-card">
      {/* Animated background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Calculator container with glassmorphism effect */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-glass-bg/40 border border-glass-border rounded-3xl p-8 shadow-elevated">
          {/* LED Display */}
          <div className="mb-8 p-6 bg-display-bg rounded-2xl border border-glass-border shadow-inner">
            <div className="text-right">
              <div className="text-5xl font-bold text-display-text tracking-wider font-mono break-all">
                {display}
              </div>
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((button, index) => (
              <CalculatorButton
                key={index}
                label={button.label}
                onClick={button.onClick}
                variant={button.variant}
                className={button.className}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Calculator Button Component
 * Renders individual calculator buttons with different variants
 */
interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant: "digit" | "operator" | "special" | "equals";
  className?: string;
}

const CalculatorButton = ({ label, onClick, variant, className = "" }: CalculatorButtonProps) => {
  // Define variant-specific styles
  const variantStyles = {
    digit: "bg-gradient-to-br from-muted/80 to-muted/60 hover:from-muted hover:to-muted/80 text-foreground hover:shadow-glow-cyan border-glass-border",
    operator: "bg-gradient-to-br from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-primary-foreground hover:shadow-glow border-primary/30",
    special: "bg-gradient-to-br from-destructive/70 to-destructive/50 hover:from-destructive hover:to-destructive/80 text-destructive-foreground border-destructive/30",
    equals: "bg-gradient-to-br from-secondary/80 to-neon-blue/80 hover:from-secondary hover:to-neon-blue text-secondary-foreground hover:shadow-glow-cyan border-secondary/30",
  };

  return (
    <Button
      onClick={onClick}
      className={`
        ${variantStyles[variant]}
        ${className}
        h-16 text-2xl font-semibold rounded-2xl
        border-2 backdrop-blur-sm
        transition-all duration-300 ease-smooth
        hover:scale-105 hover:-translate-y-1
        active:scale-95 active:translate-y-0
        shadow-lg hover:shadow-2xl
      `}
    >
      {label}
    </Button>
  );
};

export default Calculator;
