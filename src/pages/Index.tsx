
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  TrendingUp, 
  Clock, 
  Calendar, 
  CheckCircle,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import WorkoutCard from '@/components/WorkoutCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { workouts } from '@/data/workouts';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const completedWorkouts = workouts.filter(workout => workout.completed).length;
  const totalWorkouts = workouts.length;
  const completionRate = (completedWorkouts / totalWorkouts) * 100;
  
  // Get recent and upcoming workouts
  const completedWorkoutsList = workouts.filter(workout => workout.completed);
  const upcomingWorkoutsList = workouts.filter(workout => !workout.completed).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container px-4 py-6 md:py-8 flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
          <Button onClick={() => navigate('/workouts')} className="w-full md:w-auto">
            <Dumbbell className="mr-2 h-4 w-4" />
            Ver Todos Treinos
          </Button>
        </div>
        
        {/* Stats Cards - Mobile Friendly Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Total de Treinos</p>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">{totalWorkouts}</h3>
                </div>
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mt-2 md:mt-0">
                  <Dumbbell className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Concluídos</p>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">{completedWorkouts}</h3>
                </div>
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-green-100 flex items-center justify-center mt-2 md:mt-0">
                  <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-fitness-green" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Conclusão</p>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">{completionRate.toFixed(0)}%</h3>
                </div>
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-blue-100 flex items-center justify-center mt-2 md:mt-0">
                  <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-fitness-blue" />
                </div>
              </div>
              <Progress className="mt-3 md:mt-4" value={completionRate} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-muted-foreground">Prox. Treino</p>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">Hoje</h3>
                </div>
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 md:h-6 md:w-6 text-fitness-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Próximos Treinos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Próximos Treinos</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/workouts')} className="text-sm p-0 h-auto">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Treinos Concluídos</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/history')} className="text-sm p-0 h-auto">
                Ver histórico
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {completedWorkoutsList.slice(0, isMobile ? 2 : 3).map(workout => (
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
