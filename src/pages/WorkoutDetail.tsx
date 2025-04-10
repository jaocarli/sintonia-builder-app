
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Dumbbell, 
  ArrowLeft, 
  CheckCircle2, 
  BarChart3,
  Timer,
  Play,
  Pause
} from 'lucide-react';
import Header from '@/components/Header';
import ExerciseItem from '@/components/ExerciseItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { workouts } from '@/data/workouts';
import { toast } from "@/hooks/use-toast";

interface ExerciseStatus {
  completed: boolean;
  currentSet: number;
}

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the workout
  const workout = workouts.find(w => w.id === Number(id));
  
  // State for tracking exercise progress
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);
  const [exercisesStatus, setExercisesStatus] = useState<ExerciseStatus[]>([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [isWorkoutTimerRunning, setIsWorkoutTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const workoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize exercise status
  useEffect(() => {
    if (workout) {
      setExercisesStatus(
        workout.exercises.map(() => ({
          completed: false,
          currentSet: 0
        }))
      );
    }
  }, [workout]);
  
  // Workout timer logic
  useEffect(() => {
    if (workoutStarted && isWorkoutTimerRunning) {
      workoutTimerRef.current = setInterval(() => {
        setTotalWorkoutTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (workoutTimerRef.current) {
        clearInterval(workoutTimerRef.current);
      }
    };
  }, [workoutStarted, isWorkoutTimerRunning]);
  
  // Rest timer logic
  useEffect(() => {
    if (restTimer !== null && restTimer > 0) {
      timerRef.current = setInterval(() => {
        setRestTimer(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timerRef.current!);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [restTimer]);
  
  // No workout found
  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Treino não encontrado</h2>
            <Button onClick={() => navigate('/')}>Voltar para Dashboard</Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleStartWorkout = () => {
    setWorkoutStarted(true);
    setActiveExerciseIndex(0);
    setIsWorkoutTimerRunning(true);
    toast({
      title: "Treino iniciado!",
      description: "Boa sorte com seu treino hoje!",
    });
  };
  
  const handlePauseResumeWorkout = () => {
    setIsWorkoutTimerRunning(prev => !prev);
    toast({
      title: isWorkoutTimerRunning ? "Treino pausado" : "Treino retomado",
      description: isWorkoutTimerRunning 
        ? "Você pode continuar quando estiver pronto" 
        : "Continue seu treino de onde parou",
    });
  };
  
  const handleCompleteSet = () => {
    if (activeExerciseIndex === null) return;
    
    setExercisesStatus(prev => {
      const newStatus = [...prev];
      const exercise = workout.exercises[activeExerciseIndex];
      const currentExerciseStatus = newStatus[activeExerciseIndex];
      
      if (currentExerciseStatus.currentSet < exercise.sets) {
        // Increment set count
        newStatus[activeExerciseIndex] = {
          ...currentExerciseStatus,
          currentSet: currentExerciseStatus.currentSet + 1
        };
        
        // If all sets completed, mark as completed
        if (newStatus[activeExerciseIndex].currentSet >= exercise.sets) {
          newStatus[activeExerciseIndex].completed = true;
          
          // Move to next exercise if available
          if (activeExerciseIndex < workout.exercises.length - 1) {
            // Wait for specified rest time before activating next exercise
            toast({
              title: "Exercício concluído!",
              description: "Próximo exercício começará após o descanso.",
            });
          } else {
            // All exercises completed
            setWorkoutCompleted(true);
            setActiveExerciseIndex(null);
            setIsWorkoutTimerRunning(false);
            toast({
              title: "Treino concluído!",
              description: "Parabéns por completar seu treino!",
            });
          }
        } else {
          // Start rest timer
          setRestTimer(exercise.rest);
          toast({
            title: "Série completada!",
            description: `Descanse por ${exercise.rest} segundos.`,
          });
        }
      }
      
      return newStatus;
    });
  };
  
  // When rest timer completes
  useEffect(() => {
    if (restTimer === null && activeExerciseIndex !== null) {
      const currentStatus = exercisesStatus[activeExerciseIndex];
      
      // If exercise is completed, move to next
      if (currentStatus.completed && activeExerciseIndex < workout.exercises.length - 1) {
        setActiveExerciseIndex(activeExerciseIndex + 1);
      }
    }
  }, [restTimer, activeExerciseIndex, exercisesStatus, workout.exercises.length]);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!workout || !exercisesStatus.length) return 0;
    
    let totalSets = 0;
    let completedSets = 0;
    
    workout.exercises.forEach((exercise, index) => {
      totalSets += exercise.sets;
      completedSets += exercisesStatus[index]?.currentSet || 0;
    });
    
    return (completedSets / totalSets) * 100;
  };
  
  const difficultyColor = {
    'Iniciante': 'bg-green-100 text-green-800',
    'Intermediário': 'bg-yellow-100 text-yellow-800',
    'Avançado': 'bg-red-100 text-red-800',
  }[workout.difficulty];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container py-8 flex-1">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Voltar</span>
        </button>
        
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">{workout.title}</h1>
              <p className="text-muted-foreground mb-4">{workout.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={difficultyColor}>
                  {workout.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {workout.category}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-1">
                  <Clock size={18} />
                  <span>{workout.duration} minutos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell size={18} />
                  <span>{workout.exercises.length} exercícios</span>
                </div>
              </div>
              
              {workoutStarted && !workoutCompleted && (
                <div className="mt-6 p-4 bg-card border rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Timer size={18} className="text-primary" />
                      <span className="font-medium">Tempo de treino: {formatTime(totalWorkoutTime)}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePauseResumeWorkout}
                    >
                      {isWorkoutTimerRunning ? (
                        <>
                          <Pause size={16} />
                          <span>Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          <span>Continuar</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso geral</span>
                      <span>{calculateOverallProgress().toFixed(0)}%</span>
                    </div>
                    <Progress value={calculateOverallProgress()} className="h-2" />
                  </div>
                </div>
              )}
              
              {workoutCompleted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 size={20} />
                    <span className="font-medium">Treino concluído! Tempo: {formatTime(totalWorkoutTime)}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Exercícios</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {workout.exercises.map((exercise, index) => (
                      <ExerciseItem 
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                        isActive={activeExerciseIndex === index}
                        isCompleted={exercisesStatus[index]?.completed || false}
                        currentSet={exercisesStatus[index]?.currentSet || 0}
                        totalSets={exercise.sets}
                        restTimeRemaining={activeExerciseIndex === index ? restTimer : null}
                        onCompleteSet={handleCompleteSet}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  {workoutStarted ? "Status do Treino" : "Iniciar Treino"}
                </h3>
                
                {!workoutStarted ? (
                  <>
                    <p className="text-muted-foreground mb-6">
                      Pronto para começar? Clique no botão abaixo para iniciar seu cronômetro e acompanhar seu progresso.
                    </p>
                    
                    <Button 
                      className="w-full mb-4" 
                      onClick={handleStartWorkout}
                    >
                      <Dumbbell className="mr-2 h-4 w-4" />
                      Iniciar Treino
                    </Button>
                  </>
                ) : workoutCompleted ? (
                  <>
                    <div className="mb-6">
                      <p className="mb-2"><strong>Tempo total:</strong> {formatTime(totalWorkoutTime)}</p>
                      <p className="mb-2"><strong>Exercícios concluídos:</strong> {workout.exercises.length}</p>
                      <p><strong>Séries realizadas:</strong> {exercisesStatus.reduce((acc, ex) => acc + ex.currentSet, 0)}</p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar aos Treinos
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="mb-2">
                        <strong>Exercício atual:</strong> {activeExerciseIndex !== null ? workout.exercises[activeExerciseIndex].name : "Nenhum"}
                      </p>
                      <p className="mb-2">
                        <strong>Progresso:</strong> {calculateOverallProgress().toFixed(0)}% concluído
                      </p>
                      <p>
                        <strong>Tempo decorrido:</strong> {formatTime(totalWorkoutTime)}
                      </p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mb-4"
                      onClick={() => {
                        setWorkoutCompleted(true);
                        setActiveExerciseIndex(null);
                        setIsWorkoutTimerRunning(false);
                        toast({
                          title: "Treino marcado como concluído",
                          description: "Parabéns por completar seu treino!",
                        });
                      }}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Marcar como Concluído
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutDetail;
