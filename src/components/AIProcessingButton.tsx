
import React, { useState, useEffect } from 'react';
import { Check, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessingStep {
  id: string;
  text: string;
  duration: number;
}

interface AIProcessingButtonProps {
  className?: string;
}

const AIProcessingButton: React.FC<AIProcessingButtonProps> = ({ className }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completed, setCompleted] = useState(false);

  const processingSteps: ProcessingStep[] = [
    { id: 'fetch', text: 'Fetching Electricity Consumption Data', duration: 1500 },
    { id: 'calculate', text: 'Calculating Emissions with the right Emission Factor', duration: 2000 },
    { id: 'update', text: 'Updating Dashboard', duration: 1500 },
    { id: 'done', text: 'Processing Done', duration: 1000 }
  ];

  useEffect(() => {
    if (!isProcessing) return;

    let stepIndex = 0;
    let timers: NodeJS.Timeout[] = [];

    const runStep = (index: number, delay: number) => {
      const timer = setTimeout(() => {
        setCurrentStep(index);
        
        // If this is the last step, mark as completed after its duration
        if (index === processingSteps.length - 1) {
          const completionTimer = setTimeout(() => {
            setCompleted(true);
            // Reset after a delay
            const resetTimer = setTimeout(() => {
              setIsProcessing(false);
              setCurrentStep(-1);
              setCompleted(false);
            }, 2000);
            timers.push(resetTimer);
          }, processingSteps[index].duration);
          timers.push(completionTimer);
        }
      }, delay);
      
      timers.push(timer);
    };

    // Schedule each step with cumulative delays
    let cumulativeDelay = 0;
    processingSteps.forEach((_, index) => {
      runStep(index, cumulativeDelay);
      cumulativeDelay += index > 0 ? processingSteps[index - 1].duration : 0;
    });

    return () => {
      // Clean up all timers when component unmounts or when processing state changes
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isProcessing]);

  const handleClick = () => {
    if (!isProcessing) {
      setIsProcessing(true);
      setCompleted(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={cn(
          "relative w-full py-3 px-6 mb-8 rounded-xl font-medium text-white bg-primary",
          "shadow-md button-transition outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
          "disabled:opacity-80 disabled:cursor-not-allowed",
          className
        )}
      >
        {isProcessing ? "Processing..." : "Analyze Electricity Usage"}
      </button>
      
      {isProcessing && (
        <div className="glass-morphism rounded-2xl p-6 space-y-5 animate-scale-up">
          {processingSteps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "processing-step py-2",
                index <= currentStep ? "animate-slide-in" : "opacity-0",
                completed && index === processingSteps.length - 1 ? "text-green-500 font-medium" : ""
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              <div 
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-full",
                  index < currentStep 
                    ? "bg-green-500 text-white" 
                    : index === currentStep 
                      ? "bg-primary text-white animate-pulse-light" 
                      : "bg-gray-200"
                )}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : index === currentStep ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : null}
              </div>
              
              <span 
                className={cn(
                  "text-sm sm:text-base",
                  index === currentStep ? "text-primary font-medium" : "",
                  index < currentStep ? "text-muted-foreground" : ""
                )}
              >
                {step.text}
              </span>
              
              {index === currentStep && (
                <div className="processing-indicator active w-full absolute bottom-0 left-0"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIProcessingButton;
