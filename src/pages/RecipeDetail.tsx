
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  UtensilsCrossed, 
  Award, 
  ListChecks, 
  ArrowLeft, 
  Heart, 
  Share, 
  Tag,
  MessageCircle,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { recipes } from '@/data/recipes';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the recipe by id
  const recipe = recipes.find(r => r.id.toString() === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container px-4 py-6 flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Receita não encontrada</h2>
              <p className="text-muted-foreground mb-6">A receita que você está procurando não existe ou foi removida.</p>
              <Button onClick={() => navigate('/recipes')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Receitas
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const handleLike = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removida dos favoritos" : "Adicionada aos favoritos",
      description: isFavorite 
        ? "Esta receita foi removida dos seus favoritos." 
        : "Esta receita foi adicionada aos seus favoritos.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "O link da receita foi copiado para a área de transferência.",
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi adicionado com sucesso.",
    });
    
    setComment('');
  };

  return (
    <div className="min-h-screen flex flex-col pb-6">
      <Header />
      
      <main className="container px-4 py-6 flex-1">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/recipes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Receitas
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Recipe main content */}
            <Card className="overflow-hidden">
              {recipe.image && (
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">{recipe.title}</h1>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleLike}
                      className={isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className={isFavorite ? "fill-red-500" : ""} />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleShare}
                    >
                      <Share />
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">{recipe.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">{recipe.time} min</span>
                    <span className="text-xs text-muted-foreground">Tempo</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">{recipe.difficulty}</span>
                    <span className="text-xs text-muted-foreground">Dificuldade</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <Award className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-sm font-medium">{recipe.calories} kcal</span>
                    <span className="text-xs text-muted-foreground">Por porção</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <ListChecks className="mr-2 h-5 w-5" />
                    Ingredientes
                  </h2>
                  
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <UtensilsCrossed className="mr-2 h-5 w-5" />
                    Modo de Preparo
                  </h2>
                  
                  <ol className="space-y-4">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="flex">
                        <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm mr-3">
                          {index + 1}
                        </div>
                        <p className="flex-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
            
            {/* Comments section */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Comentários
                </h2>
                
                <form onSubmit={handleComment} className="mb-6">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Adicione um comentário..." 
                        className="resize-none mb-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={!comment.trim()}>
                          Comentar
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                
                <div className="space-y-4">
                  {recipe.comments?.map((comment, index) => (
                    <div key={index} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  
                  {(!recipe.comments || recipe.comments.length === 0) && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - nutrition & related recipes */}
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Informação Nutricional
                </h3>
                
                {recipe.nutrition?.map((item, index) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-0">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
                
                {(!recipe.nutrition || recipe.nutrition.length === 0) && (
                  <p className="text-center text-muted-foreground">
                    Informação nutricional não disponível
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {recipe.tags?.map((tag, index) => (
                    <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                      {tag}
                    </div>
                  ))}
                  
                  {(!recipe.tags || recipe.tags.length === 0) && (
                    <p className="text-center text-muted-foreground">
                      Nenhuma tag disponível
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
