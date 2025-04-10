
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Dumbbell, 
  ArrowLeft, 
  CheckCircle2, 
  BarChart3 
} from 'lucide-react';
import Header from '@/components/Header';
import ExerciseItem from '@/components/ExerciseItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { workouts } from '@/data/workouts';
import { toast } from "@/hooks/use-toast";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const workout = workouts.find(w => w.id === Number(id));
  
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
    toast({
      title: "Treino iniciado!",
      description: "Boa sorte com seu treino hoje!",
    });
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
                <h3 className="font-semibold text-lg mb-4">Iniciar Treino</h3>
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
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Treino marcado como concluído",
                      description: "Parabéns por completar seu treino!",
                    });
                  }}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Marcar como Concluído
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutDetail;
