
import React from 'react';
import { Dumbbell, Clock, RefreshCw, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import type { Exercise } from '@/data/workouts';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  className?: string;
  isActive: boolean;
  isCompleted: boolean;
  currentSet: number;
  totalSets: number;
  restTimeRemaining: number | null;
  onCompleteSet: () => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  index,
  className,
  isActive,
  isCompleted,
  currentSet,
  totalSets,
  restTimeRemaining,
  onCompleteSet
}) => {
  return (
    <div 
      className={cn(
        'exercise-item transition-all', 
        isActive && 'border-2 border-primary bg-primary/5',
        isCompleted && 'opacity-70',
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center h-10 w-10 rounded-full font-medium",
        isCompleted ? "bg-green-500/20 text-green-600" : "bg-primary/10 text-primary",
        isActive && "bg-primary text-primary-foreground"
      )}>
        {isCompleted ? <CheckCircle size={18} /> : index + 1}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{exercise.name}</h4>
            <p className="text-sm text-muted-foreground">{exercise.muscleGroup}</p>
          </div>
          
          {exercise.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 rounded-full hover:bg-secondary">
                    <Info size={16} className="text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{exercise.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <div className="flex gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <RefreshCw size={14} />
            <span>{exercise.sets} séries</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Dumbbell size={14} />
            <span>{exercise.reps} reps</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={14} />
            <span>{exercise.rest}s descanso</span>
          </div>
        </div>

        {isActive && !isCompleted && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Progresso: {currentSet}/{totalSets} séries
              </span>
              <span className="text-sm text-muted-foreground">
                {(currentSet / totalSets * 100).toFixed(0)}%
              </span>
            </div>
            <Progress value={currentSet / totalSets * 100} className="h-2" />
            
            {restTimeRemaining ? (
              <div className="bg-secondary p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tempo de descanso</span>
                  <span className="text-sm font-semibold">{restTimeRemaining}s</span>
                </div>
                <Progress value={(restTimeRemaining / exercise.rest) * 100} className="h-2" />
              </div>
            ) : (
              <Button 
                className="w-full mt-2" 
                onClick={onCompleteSet}
              >
                {currentSet < totalSets ? "Completar série" : "Finalizar exercício"}
              </Button>
            )}
          </div>
        )}

        {isCompleted && (
          <div className="mt-2 flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Exercício completo</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseItem;
