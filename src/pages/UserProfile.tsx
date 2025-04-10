
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Dumbbell, 
  Trophy, 
  Clock, 
  MessageSquare, 
  Share2,
  Heart,
  Send
} from 'lucide-react';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { workouts } from '@/data/workouts';
import WorkoutCard from '@/components/WorkoutCard';

// User profile data (mock)
const userProfiles = {
  me: {
    id: "me",
    name: "João Silva",
    username: "@joaosilva",
    bio: "Apaixonado por treinos e vida saudável. Nutricionista 🥦 e Personal Trainer 💪",
    avatar: "/placeholder.svg",
    following: 245,
    followers: 1253,
    joinedDate: "Março 2023",
    completedWorkouts: 86,
    streakDays: 14,
    posts: [
      {
        id: 1,
        content: "Completei mais um treino hoje! Superando meus limites 💪",
        date: "2h atrás",
        likes: 24,
        comments: 5
      },
      {
        id: 2,
        content: "Nova receita de smoothie pós-treino: banana, whey, aveia e pasta de amendoim. Delicioso e nutritivo!",
        date: "2d atrás",
        likes: 42,
        comments: 12
      }
    ]
  },
  user1: {
    id: "user1",
    name: "Maria Oliveira",
    username: "@mariaoliveira",
    bio: "Fitness enthusiast. Compartilhando minha jornada de saúde e bem-estar.",
    avatar: "/placeholder.svg",
    following: 187,
    followers: 932,
    joinedDate: "Janeiro 2023",
    completedWorkouts: 124,
    streakDays: 30,
    posts: [
      {
        id: 1,
        content: "Novo recorde pessoal no agachamento hoje! 💪",
        date: "5h atrás",
        likes: 56,
        comments: 8
      }
    ]
  }
};

// Filter completed workouts for the user
const getCompletedWorkouts = (userId: string) => {
  return workouts.filter(workout => workout.completed);
};

const UserProfile = () => {
  const { id = "me" } = useParams();
  const [commentText, setCommentText] = useState("");
  const profile = userProfiles[id as keyof typeof userProfiles] || userProfiles.me;
  const completedWorkouts = getCompletedWorkouts(id);
  
  // Check if it's the user's own profile
  const isOwnProfile = id === "me";
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>
                <User size={32} />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.username}</p>
              <p className="mt-2 text-sm max-w-xl">{profile.bio}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{profile.following}</span>
                  <span className="text-muted-foreground">Seguindo</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{profile.followers}</span>
                  <span className="text-muted-foreground">Seguidores</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Entrou em {profile.joinedDate}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              {isOwnProfile ? (
                <Button variant="outline">Editar Perfil</Button>
              ) : (
                <Button>Seguir</Button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 border rounded-lg p-4">
            <div className="text-center">
              <div className="flex justify-center">
                <Dumbbell size={24} className="text-primary mb-2" />
              </div>
              <div className="font-bold text-xl">{profile.completedWorkouts}</div>
              <div className="text-xs text-muted-foreground">Treinos</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Trophy size={24} className="text-yellow-500 mb-2" />
              </div>
              <div className="font-bold text-xl">{profile.streakDays}</div>
              <div className="text-xs text-muted-foreground">Dias consecutivos</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Clock size={24} className="text-green-500 mb-2" />
              </div>
              <div className="font-bold text-xl">24h</div>
              <div className="text-xs text-muted-foreground">Total de treino</div>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="posts">Atividades</TabsTrigger>
            <TabsTrigger value="workouts">Treinos</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="space-y-6">
            {isOwnProfile && (
              <Card>
                <CardContent className="pt-6">
                  <Textarea 
                    placeholder="Compartilhe como foi seu treino hoje..." 
                    className="resize-none mb-4"
                  />
                  <div className="flex justify-end">
                    <Button>Publicar</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {profile.posts.map(post => (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-xs text-muted-foreground">{post.date}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Heart size={18} className="mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare size={18} className="mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share2 size={18} className="mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center gap-3 mt-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={isOwnProfile ? profile.avatar : userProfiles.me.avatar} />
                      <AvatarFallback>
                        <User size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 relative">
                      <Textarea 
                        placeholder="Adicione um comentário..." 
                        className="resize-none pr-10 py-2 min-h-0"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 absolute right-2 top-1/2 transform -translate-y-1/2"
                        disabled={!commentText.trim()}
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="workouts">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Treinos Concluídos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} className="bg-white shadow-sm" />
                ))}
              </div>
              
              {completedWorkouts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum treino concluído ainda</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trophy size={48} className="mx-auto mb-4 text-yellow-500" />
                  <h3 className="font-bold text-lg mb-1">Primeira Semana</h3>
                  <p className="text-sm text-muted-foreground">Completou 7 dias consecutivos de treino</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Dumbbell size={48} className="mx-auto mb-4 text-blue-500" />
                  <h3 className="font-bold text-lg mb-1">Mestre do Supino</h3>
                  <p className="text-sm text-muted-foreground">Completou 50 séries de supino</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock size={48} className="mx-auto mb-4 text-green-500" />
                  <h3 className="font-bold text-lg mb-1">Maratonista</h3>
                  <p className="text-sm text-muted-foreground">Treinou por mais de 20 horas no total</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserProfile;
