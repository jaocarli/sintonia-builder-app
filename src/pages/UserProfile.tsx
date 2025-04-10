
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  User, 
  MessageCircle, 
  Dumbbell, 
  Trophy, 
  UtensilsCrossed, 
  FileText, 
  Calendar, A 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { workouts } from '@/data/workouts';
import { recipes } from '@/data/recipes';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock user data
const userData = {
  id: "me",
  name: "Carlos Silva",
  username: "@carlossilva",
  avatar: null,
  bio: "Entusiasta de fitness, nutrição e bem-estar. Treinando há 3 anos e sempre em busca de novos desafios!",
  joinedDate: "Março 2022",
  stats: {
    workouts: 48,
    streak: 12,
    followers: 124,
    following: 56,
  }
};

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Filter workouts and recipes
  const userWorkouts = workouts.filter(workout => workout.id < 5);
  const userRecipes = recipes.filter(recipe => recipe.id < 3);
  
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    
    toast({
      title: isFollowing ? "Deixou de seguir" : "Agora seguindo",
      description: isFollowing 
        ? `Você deixou de seguir ${userData.name}.` 
        : `Você está seguindo ${userData.name}.`,
    });
  };
  
  const handleMessageClick = () => {
    toast({
      title: "Mensagem",
      description: `Iniciando conversa com ${userData.name}.`,
    });
    
    navigate('/social');
  };

  return (
    <div className="min-h-screen flex flex-col pb-6">
      <Header />
      
      <main className="container px-4 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                    {userData.avatar && (
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                    )}
                  </Avatar>
                  
                  <h1 className="text-xl font-bold mb-1">{userData.name}</h1>
                  <p className="text-sm text-muted-foreground mb-4">{userData.username}</p>
                  
                  <div className="w-full flex gap-2 mb-6">
                    <Button 
                      className="flex-1" 
                      variant={isFollowing ? "outline" : "default"}
                      onClick={handleFollowClick}
                    >
                      {isFollowing ? "Seguindo" : "Seguir"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleMessageClick}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm mb-6">{userData.bio}</p>
                  
                  <div className="grid grid-cols-2 w-full gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Treinos</p>
                      <p className="font-bold">{userData.stats.workouts}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Sequência</p>
                      <p className="font-bold">{userData.stats.streak} dias</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Seguidores</p>
                      <p className="font-bold">{userData.stats.followers}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">Seguindo</p>
                      <p className="font-bold">{userData.stats.following}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Entrou em {userData.joinedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content - Tabs with workouts, achievements, recipes */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="workouts">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="workouts" className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  <span className={isMobile ? "hidden" : "inline"}>Treinos</span>
                </TabsTrigger>
                <TabsTrigger value="recipes" className="flex items-center gap-1">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span className={isMobile ? "hidden" : "inline"}>Receitas</span>
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span className={isMobile ? "hidden" : "inline"}>Conquistas</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="workouts" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Treinos Recentes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userWorkouts.map(workout => (
                    <Card 
                      key={workout.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/workout/${workout.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            workout.type === 'strength' ? 'bg-blue-100 text-fitness-blue' : 
                            workout.type === 'cardio' ? 'bg-red-100 text-fitness-red' : 
                            'bg-green-100 text-fitness-green'
                          }`}>
                            <Dumbbell className="h-5 w-5" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium">{workout.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {workout.exercises.length} exercícios • {workout.duration} min
                            </p>
                            
                            {workout.completed ? (
                              <div className="flex items-center text-xs text-green-600">
                                <div className="h-2 w-2 rounded-full bg-green-600 mr-1" />
                                <span>Concluído</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-xs text-blue-600">
                                <div className="h-2 w-2 rounded-full bg-blue-600 mr-1" />
                                <span>Pendente</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recipes" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Receitas Compartilhadas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userRecipes.map(recipe => (
                    <Card 
                      key={recipe.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                      {recipe.image && (
                        <div className="h-32 w-full">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium">{recipe.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {recipe.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <UtensilsCrossed className="h-3 w-3 mr-1" />
                            <span>{recipe.difficulty}</span>
                          </div>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{recipe.time} min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-0">
                <h2 className="text-xl font-semibold mb-4">Conquistas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Iniciante", description: "Completou o primeiro treino", date: "10/03/2022", icon: <Dumbbell /> },
                    { name: "Consistente", description: "7 dias consecutivos de treino", date: "21/05/2022", icon: <Calendar /> },
                    { name: "Chef Saudável", description: "Compartilhou 5 receitas", date: "15/08/2022", icon: <UtensilsCrossed /> },
                    { name: "Atleta", description: "Completou 30 treinos", date: "03/11/2022", icon: <Trophy /> },
                    { name: "Social", description: "Conectou-se com 10 pessoas", date: "22/01/2023", icon: <User /> },
                    { name: "Especialista", description: "Concluiu todos os treinos do mês", date: "28/02/2023", icon: <FileText /> },
                  ].map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {achievement.icon}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{achievement.name}</h3>
                            <p className="text-sm text-muted-foreground mb-1">
                              {achievement.description}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{achievement.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
