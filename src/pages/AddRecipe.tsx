
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ImagePlus,
  UtensilsCrossed,
  ListChecks
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const recipeSchema = z.object({
  title: z.string().min(3, { message: 'O título deve ter pelo menos 3 caracteres' }),
  description: z.string().min(10, { message: 'A descrição deve ter pelo menos 10 caracteres' }),
  category: z.string().min(1, { message: 'Selecione uma categoria' }),
  time: z.coerce.number().min(1, { message: 'O tempo deve ser maior que 0' }),
  difficulty: z.string().min(1, { message: 'Selecione um nível de dificuldade' }),
  calories: z.coerce.number().optional(),
});

// Form type
type RecipeFormValues = z.infer<typeof recipeSchema> & {
  ingredients: string[];
  steps: string[];
  image?: string;
};

const AddRecipe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  
  // Initialize form
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      time: 30,
      difficulty: 'Médio',
      calories: 0,
      ingredients: [''],
      steps: [''],
    },
  });

  const onSubmit = (data: RecipeFormValues) => {
    // Filter out empty ingredients and steps
    const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
    const filteredSteps = steps.filter(step => step.trim() !== '');
    
    if (filteredIngredients.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Adicione pelo menos um ingrediente",
        variant: "destructive",
      });
      return;
    }
    
    if (filteredSteps.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Adicione pelo menos um passo no modo de preparo",
        variant: "destructive",
      });
      return;
    }
    
    // Combine form data with ingredients and steps
    const recipeData = {
      ...data,
      ingredients: filteredIngredients,
      steps: filteredSteps,
      id: Date.now(),
      dateAdded: new Date().toISOString(),
      author: 'Você',
      likes: 0,
      comments: [],
    };
    
    // In a real app, you would save this to a database
    console.log('Recipe data:', recipeData);
    
    toast({
      title: "Receita salva!",
      description: "Sua receita foi salva com sucesso.",
    });
    
    // Navigate back to recipes page
    navigate('/recipes');
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length === 1) return;
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length === 1) return;
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
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
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Nova Receita</CardTitle>
            <CardDescription>
              Compartilhe sua receita fitness com a comunidade
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload Placeholder */}
                  <div className="col-span-full">
                    <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center">
                      <ImagePlus className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">Adicionar Imagem</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Arraste e solte ou clique para fazer upload
                      </p>
                      <Button variant="outline" type="button">
                        Escolher Imagem
                      </Button>
                    </div>
                  </div>
                  
                  {/* Recipe Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FormLabel>Título da Receita</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Salada de Quinoa com Frango" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Recipe Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Uma breve descrição da sua receita..." 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="breakfast">Café da Manhã</SelectItem>
                            <SelectItem value="lunch">Almoço</SelectItem>
                            <SelectItem value="dinner">Jantar</SelectItem>
                            <SelectItem value="snack">Lanche</SelectItem>
                            <SelectItem value="dessert">Sobremesa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Difficulty */}
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dificuldade</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a dificuldade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Fácil">Fácil</SelectItem>
                            <SelectItem value="Médio">Médio</SelectItem>
                            <SelectItem value="Difícil">Difícil</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Cooking Time */}
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempo de Preparo (min)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Calories */}
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calorias (kcal por porção)</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} {...field} />
                        </FormControl>
                        <FormDescription>Opcional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Ingredients */}
                  <div className="col-span-full">
                    <div className="flex items-center justify-between mb-4">
                      <FormLabel className="text-base flex items-center">
                        <ListChecks className="mr-2 h-5 w-5" />
                        Ingredientes
                      </FormLabel>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddIngredient}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">
                            {index + 1}
                          </div>
                          <Input
                            placeholder="Ex: 100g de frango desfiado"
                            value={ingredient}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveIngredient(index)}
                            disabled={ingredients.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Preparation Steps */}
                  <div className="col-span-full">
                    <div className="flex items-center justify-between mb-4">
                      <FormLabel className="text-base flex items-center">
                        <UtensilsCrossed className="mr-2 h-5 w-5" />
                        Modo de Preparo
                      </FormLabel>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAddStep}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs mt-2">
                            {index + 1}
                          </div>
                          <Textarea
                            placeholder={`Passo ${index + 1}: Descreva o que fazer`}
                            value={step}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                            className="flex-1 resize-none"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveStep(index)}
                            disabled={steps.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/recipes')}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar Receita</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default AddRecipe;
