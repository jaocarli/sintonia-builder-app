
export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  rest: number; // in seconds
  muscleGroup: string;
  description?: string;
  image?: string;
}

export interface Workout {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: string;
  exercises: Exercise[];
  image?: string;
  completed?: boolean;
}

export const workouts: Workout[] = [
  {
    id: 1,
    title: "Treino A - Peito e Tríceps",
    description: "Foco em hipertrofia para peito e tríceps",
    duration: 60,
    difficulty: "Intermediário",
    category: "Hipertrofia",
    exercises: [
      {
        id: 1,
        name: "Supino Reto",
        sets: 4,
        reps: 10,
        rest: 90,
        muscleGroup: "Peito",
        description: "Deite-se no banco e empurre a barra para cima, mantendo os cotovelos em ângulo de 45 graus."
      },
      {
        id: 2,
        name: "Crucifixo com Halteres",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Peito",
        description: "Deite-se no banco segurando halteres, abra os braços lateralmente e volte à posição inicial."
      },
      {
        id: 3,
        name: "Supino Inclinado",
        sets: 3,
        reps: 10,
        rest: 90,
        muscleGroup: "Peito",
        description: "Semelhante ao supino reto, mas com banco inclinado para focar na parte superior do peito."
      },
      {
        id: 4,
        name: "Tríceps Corda",
        sets: 4,
        reps: 12,
        rest: 60,
        muscleGroup: "Tríceps",
        description: "Utilizando a corda na polia, estenda os cotovelos mantendo os braços junto ao corpo."
      },
      {
        id: 5,
        name: "Tríceps Francês",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Tríceps",
        description: "Segure um halter acima da cabeça e dobre os cotovelos para baixar o peso atrás da cabeça."
      }
    ]
  },
  {
    id: 2,
    title: "Treino B - Costas e Bíceps",
    description: "Desenvolvimento de costas largas e bíceps definidos",
    duration: 65,
    difficulty: "Intermediário",
    category: "Hipertrofia",
    exercises: [
      {
        id: 6,
        name: "Puxada Frontal",
        sets: 4,
        reps: 10,
        rest: 90,
        muscleGroup: "Costas",
        description: "Puxe a barra para baixo em direção ao peito, mantendo as costas retas."
      },
      {
        id: 7,
        name: "Remada Curvada",
        sets: 4,
        reps: 10,
        rest: 90,
        muscleGroup: "Costas",
        description: "Incline o tronco para frente e puxe a barra em direção ao abdômen."
      },
      {
        id: 8,
        name: "Remada Unilateral",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Costas",
        description: "Apoie uma mão no banco e puxe o halter com a outra mão."
      },
      {
        id: 9,
        name: "Rosca Direta",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Bíceps",
        description: "Flexione os cotovelos para levantar a barra até os ombros."
      },
      {
        id: 10,
        name: "Rosca Alternada",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Bíceps",
        description: "Flexione um braço de cada vez, alternando entre direita e esquerda."
      }
    ]
  },
  {
    id: 3,
    title: "Treino C - Pernas",
    description: "Treino completo para desenvolvimento das pernas",
    duration: 70,
    difficulty: "Avançado",
    category: "Força",
    exercises: [
      {
        id: 11,
        name: "Agachamento Livre",
        sets: 4,
        reps: 8,
        rest: 120,
        muscleGroup: "Quadríceps/Glúteos",
        description: "Posicione a barra nos ombros e agache até que as coxas fiquem paralelas ao chão."
      },
      {
        id: 12,
        name: "Leg Press",
        sets: 4,
        reps: 10,
        rest: 90,
        muscleGroup: "Quadríceps/Glúteos",
        description: "Empurre a plataforma com os pés, estendendo os joelhos."
      },
      {
        id: 13,
        name: "Extensora",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Quadríceps",
        description: "Estenda os joelhos contra a resistência do aparelho."
      },
      {
        id: 14,
        name: "Flexora Deitado",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Posterior de Coxa",
        description: "Flexione os joelhos contra a resistência do aparelho."
      },
      {
        id: 15,
        name: "Panturrilha em Pé",
        sets: 4,
        reps: 15,
        rest: 60,
        muscleGroup: "Panturrilha",
        description: "Fique na ponta dos pés e depois abaixe os calcanhares."
      }
    ]
  },
  {
    id: 4,
    title: "Treino Fullbody",
    description: "Treino completo para todo o corpo em uma única sessão",
    duration: 75,
    difficulty: "Iniciante",
    category: "Condicionamento",
    completed: true,
    exercises: [
      {
        id: 16,
        name: "Agachamento",
        sets: 3,
        reps: 12,
        rest: 60,
        muscleGroup: "Pernas",
        description: "Agache como se fosse sentar em uma cadeira, mantendo o peito erguido."
      },
      {
        id: 17,
        name: "Supino",
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: "Peito",
        description: "Deite-se no banco e empurre a barra para cima."
      },
      {
        id: 18,
        name: "Remada",
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: "Costas",
        description: "Incline o tronco e puxe a barra em direção ao abdômen."
      },
      {
        id: 19,
        name: "Desenvolvimento",
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: "Ombros",
        description: "Empurre a barra sobre a cabeça, estendendo completamente os braços."
      },
      {
        id: 20,
        name: "Rosca Direta",
        sets: 2,
        reps: 12,
        rest: 45,
        muscleGroup: "Bíceps",
        description: "Flexione os cotovelos para levantar a barra até os ombros."
      },
      {
        id: 21,
        name: "Tríceps Corda",
        sets: 2,
        reps: 12,
        rest: 45,
        muscleGroup: "Tríceps",
        description: "Utilizando a corda na polia, estenda os cotovelos."
      }
    ]
  }
];
