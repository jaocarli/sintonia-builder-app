
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, UtensilsCrossed, PlusCircle, Filter, ChevronRight } from 'lucide-react';
import { recipes } from '@/data/recipes';

const Recipes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || recipe.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col pb-6">
      <Header />
      
      <main className="container px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Receitas Fitness</h1>
            <p className="text-muted-foreground">Encontre receitas saudáveis para complementar seu treino</p>
          </div>
          
          <Button onClick={() => navigate('/add-recipe')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Receita
          </Button>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <TabsList className="h-auto p-1">
                <TabsTrigger value="all" className="text-xs md:text-sm">Todas</TabsTrigger>
                <TabsTrigger value="popular" className="text-xs md:text-sm">Populares</TabsTrigger>
                <TabsTrigger value="recent" className="text-xs md:text-sm">Recentes</TabsTrigger>
                <TabsTrigger value="favorites" className="text-xs md:text-sm">Favoritas</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar receitas..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="breakfast">Café da Manhã</SelectItem>
                    <SelectItem value="lunch">Almoço</SelectItem>
                    <SelectItem value="dinner">Jantar</SelectItem>
                    <SelectItem value="snack">Lanche</SelectItem>
                    <SelectItem value="dessert">Sobremesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map(recipe => (
                    <Card 
                      key={recipe.id} 
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                      {recipe.image && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-full h-full object-cover"
                          />
                          <Badge 
                            className="absolute top-2 right-2" 
                            variant={recipe.category === 'breakfast' ? 'default' : 
                                    recipe.category === 'lunch' ? 'secondary' : 
                                    recipe.category === 'dinner' ? 'outline' : 
                                    recipe.category === 'snack' ? 'destructive' : 'default'}
                          >
                            {recipe.category === 'breakfast' ? 'Café da Manhã' : 
                            recipe.category === 'lunch' ? 'Almoço' : 
                            recipe.category === 'dinner' ? 'Jantar' : 
                            recipe.category === 'snack' ? 'Lanche' : 
                            recipe.category === 'dessert' ? 'Sobremesa' : recipe.category}
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg line-clamp-1">{recipe.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{recipe.description}</p>
                        
                        <div className="flex items-center mt-3 gap-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{recipe.time} min</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <UtensilsCrossed className="mr-1 h-4 w-4" />
                            <span>{recipe.difficulty}</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-4 pt-0 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-sm gap-1">
                          Ver receita
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <UtensilsCrossed className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhuma receita encontrada</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      Não encontramos receitas com os critérios de busca atuais. Tente mudar os filtros ou adicione uma nova receita.
                    </p>
                    <Button onClick={() => navigate('/add-recipe')}>
                      Adicionar Nova Receita
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredRecipes
                  .sort((a, b) => b.likes - a.likes)
                  .slice(0, 6)
                  .map(recipe => (
                    <Card 
                      key={recipe.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                      {/* Recipe card content - same as above */}
                      {/* ... */}
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredRecipes
                  .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                  .slice(0, 6)
                  .map(recipe => (
                    <Card 
                      key={recipe.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                      {/* Recipe card content - same as above */}
                      {/* ... */}
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredRecipes
                  .filter(recipe => recipe.isFavorite)
                  .map(recipe => (
                    <Card 
                      key={recipe.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/recipes/${recipe.id}`)}
                    >
                      {/* Recipe card content - same as above */}
                      {/* ... */}
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Recipes;
