
import React from 'react';
import { Dumbbell, Clock, RefreshCw, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Exercise } from '@/data/workouts';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  className?: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  index,
  className 
}) => {
  return (
    <div className={cn('exercise-item', className)}>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-medium">
        {index + 1}
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
      </div>
    </div>
  );
};

export default ExerciseItem;
