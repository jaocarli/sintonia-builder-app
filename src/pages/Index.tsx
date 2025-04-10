
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  TrendingUp, 
  Clock, 
  Calendar, 
  BarChart3,
  CheckCircle,
  PlusCircle
} from 'lucide-react';
import Header from '@/components/Header';
import WorkoutCard from '@/components/WorkoutCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { workouts } from '@/data/workouts';

const Index = () => {
  const navigate = useNavigate();
  const completedWorkouts = workouts.filter(workout => workout.completed).length;
  const totalWorkouts = workouts.length;
  const completionRate = (completedWorkouts / totalWorkouts) * 100;
  
  // Get recent and upcoming workouts
  const completedWorkoutsList = workouts.filter(workout => workout.completed);
  const upcomingWorkoutsList = workouts.filter(workout => !workout.completed).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => navigate('/workouts')}>
            <Dumbbell className="mr-2 h-4 w-4" />
            Ver Todos Treinos
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Treinos</p>
                  <h3 className="text-2xl font-bold mt-1">{totalWorkouts}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Treinos Concluídos</p>
                  <h3 className="text-2xl font-bold mt-1">{completedWorkouts}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-fitness-green" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</p>
                  <h3 className="text-2xl font-bold mt-1">{completionRate.toFixed(0)}%</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-fitness-blue" />
                </div>
              </div>
              <Progress className="mt-4" value={completionRate} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prox. Treino</p>
                  <h3 className="text-2xl font-bold mt-1">Hoje</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-fitness-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Próximos Treinos */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Próximos Treinos</h2>
            <Button variant="ghost" onClick={() => navigate('/workouts')}>
              Ver todos
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingWorkoutsList.length > 0 ? (
              upcomingWorkoutsList.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <div className="col-span-full">
                <Card className="border-dashed">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum treino pendente</h3>
                    <p className="text-muted-foreground mb-4">
                      Parabéns! Você concluiu todos os seus treinos programados.
                    </p>
                    <Button variant="outline" onClick={() => navigate('/workouts')}>
                      Adicionar Novo Treino
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
        
        {/* Treinos Concluídos */}
        {completedWorkoutsList.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Treinos Concluídos</h2>
              <Button variant="ghost" onClick={() => navigate('/history')}>
                Ver histórico
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedWorkoutsList.slice(0, 3).map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
