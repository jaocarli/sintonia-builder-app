
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Dumbbell, BarChart3, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Workout } from '@/data/workouts';

interface WorkoutCardProps {
  workout: Workout;
  className?: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, className }) => {
  const navigate = useNavigate();
  
  const difficultyColor = {
    'Iniciante': 'bg-green-100 text-green-800',
    'Intermediário': 'bg-yellow-100 text-yellow-800',
    'Avançado': 'bg-red-100 text-red-800',
  }[workout.difficulty];

  return (
    <div 
      className={cn('workout-card', className)}
      onClick={() => navigate(`/workout/${workout.id}`)}
    >
      {workout.completed && (
        <div className="absolute -top-2 -right-2 bg-fitness-green text-white rounded-full p-1">
          <CheckCircle size={20} />
        </div>
      )}
      
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{workout.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{workout.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className={difficultyColor}>
              {workout.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {workout.category}
            </Badge>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell size={16} />
              <span>{workout.exercises.length} exercícios</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/workout/${workout.id}`);
              }}
            >
              Ver treino
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
