
import { z } from "zod";

// Define the recipe schema
export const RecipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  category: z.string(),
  time: z.number(),
  difficulty: z.string(),
  calories: z.number().optional(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  nutrition: z.array(z.object({
    name: z.string(),
    value: z.string()
  })).optional(),
  tags: z.array(z.string()).optional(),
  author: z.string(),
  dateAdded: z.string(),
  likes: z.number(),
  isFavorite: z.boolean().optional(),
  comments: z.array(z.object({
    author: z.string(),
    text: z.string(),
    date: z.string()
  })).optional()
});

// Define the Recipe type
export type Recipe = z.infer<typeof RecipeSchema>;

// Export mock recipes data
export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Bowl de Proteínas com Frango e Quinoa",
    description: "Um bowl nutritivo e cheio de proteínas, perfeito para depois do treino de força.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
    category: "lunch",
    time: 25,
    difficulty: "Médio",
    calories: 450,
    ingredients: [
      "150g de peito de frango",
      "50g de quinoa",
      "1 abacate pequeno",
      "1/2 pepino",
      "1/4 de cebola roxa",
      "1 colher de sopa de azeite de oliva",
      "Suco de 1/2 limão",
      "Sal e pimenta a gosto"
    ],
    steps: [
      "Tempere o frango com sal, pimenta e ervas a gosto.",
      "Grelhe o frango em uma frigideira antiaderente até dourar dos dois lados.",
      "Cozinhe a quinoa conforme as instruções da embalagem.",
      "Corte o abacate em cubos e o pepino em rodelas finas.",
      "Fatie a cebola roxa finamente.",
      "Monte o bowl: coloque a quinoa na base, adicione o frango fatiado e os vegetais ao redor.",
      "Tempere com azeite, limão, sal e pimenta a gosto."
    ],
    nutrition: [
      { name: "Calorias", value: "450 kcal" },
      { name: "Proteínas", value: "35g" },
      { name: "Carboidratos", value: "30g" },
      { name: "Gorduras", value: "22g" },
      { name: "Fibras", value: "8g" }
    ],
    tags: ["proteína", "pós-treino", "low carb", "sem glúten"],
    author: "Carlos Silva",
    dateAdded: "2023-10-15",
    likes: 42,
    isFavorite: false,
    comments: [
      {
        author: "Maria Oliveira",
        text: "Adorei a receita! Substitui o frango por tofu e ficou incrível também.",
        date: "15/10/2023"
      },
      {
        author: "Pedro Costa",
        text: "Perfeito para o meu plano de alimentação. Simples e nutritivo!",
        date: "16/10/2023"
      }
    ]
  },
  {
    id: 2,
    title: "Smoothie Energético de Frutas",
    description: "Um smoothie refrescante e energético, ideal para antes do treino ou como café da manhã.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1000",
    category: "breakfast",
    time: 10,
    difficulty: "Fácil",
    calories: 320,
    ingredients: [
      "1 banana congelada",
      "100g de morangos",
      "1 colher de sopa de pasta de amendoim",
      "1 colher de sopa de sementes de chia",
      "250ml de leite de amêndoas",
      "1 scoop de proteína de whey sabor baunilha (opcional)"
    ],
    steps: [
      "Adicione todos os ingredientes no liquidificador.",
      "Bata até obter uma mistura homogênea.",
      "Se necessário, adicione mais leite vegetal para ajustar a consistência.",
      "Sirva imediatamente."
    ],
    nutrition: [
      { name: "Calorias", value: "320 kcal" },
      { name: "Proteínas", value: "20g" },
      { name: "Carboidratos", value: "40g" },
      { name: "Gorduras", value: "10g" },
      { name: "Fibras", value: "6g" }
    ],
    tags: ["pré-treino", "café da manhã", "vegetariano", "rápido"],
    author: "Ana Beatriz",
    dateAdded: "2023-11-02",
    likes: 38,
    isFavorite: true
  },
  {
    id: 3,
    title: "Salada de Atum com Ovos",
    description: "Uma salada rica em proteínas, perfeita para um almoço leve mas nutritivo.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000",
    category: "lunch",
    time: 15,
    difficulty: "Fácil",
    calories: 380,
    ingredients: [
      "1 lata de atum em água, escorrido",
      "2 ovos cozidos",
      "1 tomate médio",
      "1/2 pepino",
      "1/4 de cebola roxa",
      "Mix de folhas verdes",
      "1 colher de sopa de azeite extra virgem",
      "1 colher de chá de vinagre balsâmico",
      "Sal e pimenta a gosto"
    ],
    steps: [
      "Cozinhe os ovos por cerca de 8 minutos, depois descasque e corte em quartos.",
      "Corte o tomate em fatias, o pepino em rodelas e a cebola em anéis finos.",
      "Em uma tigela grande, coloque o mix de folhas verdes.",
      "Adicione o atum, os ovos e os vegetais cortados.",
      "Em um recipiente pequeno, misture o azeite, vinagre, sal e pimenta para fazer o molho.",
      "Regue a salada com o molho e sirva imediatamente."
    ],
    nutrition: [
      { name: "Calorias", value: "380 kcal" },
      { name: "Proteínas", value: "30g" },
      { name: "Carboidratos", value: "15g" },
      { name: "Gorduras", value: "22g" },
      { name: "Fibras", value: "5g" }
    ],
    tags: ["rich in protein", "low carb", "rápido", "almoço"],
    author: "João Silva",
    dateAdded: "2023-09-20",
    likes: 25,
    isFavorite: false
  },
  {
    id: 4,
    title: "Wrap de Frango com Abacate",
    description: "Um wrap saudável e prático, ótimo para o almoço ou jantar leve.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000",
    category: "dinner",
    time: 20,
    difficulty: "Fácil",
    calories: 410,
    ingredients: [
      "1 tortilha integral",
      "100g de peito de frango grelhado e desfiado",
      "1/2 abacate",
      "1/4 de pimentão vermelho",
      "1/4 de cebola",
      "Folhas de alface",
      "1 colher de sopa de iogurte natural",
      "Suco de 1/2 limão",
      "Sal e pimenta a gosto"
    ],
    steps: [
      "Tempere o frango com sal e pimenta e grelhe até dourar.",
      "Desfie o frango depois de grelhado.",
      "Corte o abacate em fatias finas, o pimentão em tiras e a cebola em rodelas.",
      "Misture o iogurte com suco de limão, sal e pimenta para fazer o molho.",
      "Aqueça levemente a tortilha numa frigideira.",
      "Monte o wrap: espalhe o molho, coloque o frango, o abacate, o pimentão, a cebola e as folhas de alface.",
      "Enrole firmemente e corte ao meio."
    ],
    author: "Pedro Costa",
    dateAdded: "2023-08-10",
    likes: 31,
    isFavorite: true
  },
  {
    id: 5,
    title: "Overnight Oats com Frutas e Nuts",
    description: "Uma opção prática e nutritiva para o café da manhã, que pode ser preparada na noite anterior.",
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1000",
    category: "breakfast",
    time: 5,
    difficulty: "Fácil",
    calories: 350,
    ingredients: [
      "1/2 xícara de aveia em flocos",
      "2/3 xícara de leite (de sua preferência)",
      "1 colher de sopa de sementes de chia",
      "1 colher de sopa de mel ou maple syrup",
      "1/2 banana cortada em rodelas",
      "Punhado de mirtilos ou outras frutas vermelhas",
      "1 colher de sopa de nozes picadas",
      "1/2 colher de chá de canela em pó"
    ],
    steps: [
      "Em um pote com tampa, misture a aveia, o leite, as sementes de chia e o mel.",
      "Tampe e deixe na geladeira por pelo menos 4 horas ou durante a noite toda.",
      "Pela manhã, adicione a banana, as frutas vermelhas, as nozes e polvilhe com canela.",
      "Sirva frio ou aqueça levemente se preferir."
    ],
    author: "Maria Oliveira",
    dateAdded: "2023-07-05",
    likes: 45,
    isFavorite: false
  },
  {
    id: 6,
    title: "Muffins de Banana e Aveia",
    description: "Muffins saudáveis, perfeitos para um lanche pré ou pós-treino.",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=1000",
    category: "snack",
    time: 30,
    difficulty: "Médio",
    calories: 180,
    ingredients: [
      "2 bananas maduras",
      "2 ovos",
      "1/4 xícara de óleo de coco derretido",
      "1/4 xícara de mel",
      "1 colher de chá de extrato de baunilha",
      "1 e 1/2 xícara de aveia em flocos finos",
      "1 colher de chá de fermento em pó",
      "1/2 colher de chá de canela",
      "Pitada de sal",
      "1/4 xícara de nozes picadas (opcional)"
    ],
    steps: [
      "Pré-aqueça o forno a 180°C e unte formas de muffin.",
      "Em uma tigela, amasse as bananas e adicione os ovos, óleo de coco, mel e baunilha. Misture bem.",
      "Em outra tigela, misture a aveia, o fermento, a canela e o sal.",
      "Combine os ingredientes secos com os úmidos, misturando até incorporar. Adicione as nozes, se desejar.",
      "Divida a massa nas formas de muffin.",
      "Asse por 20-25 minutos ou até que um palito inserido no centro saia limpo.",
      "Deixe esfriar antes de servir."
    ],
    author: "Ana Beatriz",
    dateAdded: "2023-10-10",
    likes: 37,
    isFavorite: true
  }
];
