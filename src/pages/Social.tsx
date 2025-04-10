
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Heart, Share, User, Users, Send, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for posts
const MOCK_POSTS = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'João Silva',
      avatar: null,
      initials: 'JS',
    },
    content: 'Acabei de bater meu recorde no supino! 💪 Quem mais está treinando hoje?',
    timeAgo: '10 min',
    likes: 12,
    comments: 4,
    shared: 2,
  },
  {
    id: 2,
    user: {
      id: 2,
      name: 'Maria Oliveira',
      avatar: null,
      initials: 'MO',
    },
    content: 'Compartilhando minha evolução após 3 meses de treino consistente. A mudança está acontecendo! #FitnessJourney #Determinação',
    timeAgo: '1h',
    likes: 24,
    comments: 8,
    shared: 5,
  },
  {
    id: 3,
    user: {
      id: 3,
      name: 'Pedro Costa',
      avatar: null,
      initials: 'PC',
    },
    content: 'Alguém tem dicas para recuperação muscular? Estou sentindo bastante dor depois dos treinos de perna.',
    timeAgo: '3h',
    likes: 5,
    comments: 15,
    shared: 1,
  },
  {
    id: 4,
    user: {
      id: 4,
      name: 'Ana Beatriz',
      avatar: null,
      initials: 'AB',
    },
    content: 'Consegui completar meu primeiro treino de HIIT sem pausas! Aos poucos estou melhorando meu condicionamento cardiovascular.',
    timeAgo: '5h',
    likes: 18,
    comments: 6,
    shared: 0,
  }
];

// Mock data for groups
const MOCK_GROUPS = [
  { id: 1, name: 'Treino de Força', members: 156 },
  { id: 2, name: 'Nutrição Fitness', members: 234 },
  { id: 3, name: 'Corrida e Cardio', members: 98 },
  { id: 4, name: 'Yoga e Flexibilidade', members: 75 }
];

const Social = () => {
  const [postContent, setPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [posts, setPosts] = useState(MOCK_POSTS);
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      setPosts(posts.map(post => 
        post.id === postId ? {...post, likes: post.likes - 1} : post
      ));
    } else {
      newLikedPosts.add(postId);
      setPosts(posts.map(post => 
        post.id === postId ? {...post, likes: post.likes + 1} : post
      ));
    }
    
    setLikedPosts(newLikedPosts);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      user: {
        id: 0,
        name: 'Você',
        avatar: null,
        initials: 'VC',
      },
      content: postContent,
      timeAgo: 'agora',
      likes: 0,
      comments: 0,
      shared: 0,
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    
    toast({
      title: "Post publicado!",
      description: "Seu post foi compartilhado com a comunidade.",
    });
  };

  const handleShare = (postId: number) => {
    toast({
      title: "Post compartilhado!",
      description: "O post foi compartilhado em seu perfil.",
    });
    
    setPosts(posts.map(post => 
      post.id === postId ? {...post, shared: post.shared + 1} : post
    ));
  };

  return (
    <div className="min-h-screen flex flex-col pb-6">
      <Header />
      
      <main className="container px-4 py-6 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Comunidade</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Groups and connections (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-medium flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  Grupos Fitness
                </h3>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-2">
                  {MOCK_GROUPS.map(group => (
                    <li key={group.id} className="flex items-center justify-between hover:bg-muted p-2 rounded-md cursor-pointer">
                      <span>{group.name}</span>
                      <span className="text-xs text-muted-foreground">{group.members}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver todos os grupos
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main content - Feed and posts */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="feed">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="groups">Grupos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-6">
                {/* Post input */}
                <Card>
                  <CardContent className="p-4 pt-4">
                    <form onSubmit={handlePostSubmit}>
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea 
                            placeholder="O que você está pensando?" 
                            className="resize-none mb-3 bg-muted/50"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button type="submit" disabled={!postContent.trim()}>
                              Publicar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                {/* Posts */}
                {posts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3 pt-4 px-4 flex flex-row items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {post.user.initials}
                        </AvatarFallback>
                        {post.user.avatar && (
                          <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        )}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{post.user.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3 px-4">
                      <p className="whitespace-pre-wrap">{post.content}</p>
                    </CardContent>
                    
                    <CardFooter className="px-4 py-3 border-t flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(post.id)}
                        className={likedPosts.has(post.id) ? "text-red-500" : ""}
                      >
                        <Heart className={`mr-1 h-4 w-4 ${likedPosts.has(post.id) ? "fill-red-500" : ""}`} />
                        {post.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        {post.comments}
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleShare(post.id)}
                      >
                        <Share className="mr-1 h-4 w-4" />
                        {post.shared}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="groups">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_GROUPS.map(group => (
                    <Card key={group.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">{group.members} membros</p>
                        </div>
                        <Button variant="outline" size="sm">Entrar</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Sidebar - Chat/Messages (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-medium flex items-center">
                  <MessageCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  Mensagens
                </h3>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="relative">
                  <Input placeholder="Procurar..." className="pl-8" />
                  <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                  </div>
                </div>
                
                <div className="mt-3 space-y-1">
                  {MOCK_POSTS.slice(0, 4).map(post => (
                    <div key={post.id} className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {post.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{post.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">Última mensagem...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="relative w-full">
                  <Input placeholder="Nova mensagem..." className="pr-10" />
                  <Button size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Social;
