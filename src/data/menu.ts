export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured?: boolean
  available: boolean
  preparationTime: number
  allergens?: string[]
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  items: MenuItem[]
}

export const menuData = {
  categories: [
    {
      id: '1',
      name: 'Entradas',
      description: 'Aperitivos e petiscos para começar bem',
      image: '/images/categories/entradas.jpg',
      items: [
        {
          id: '1',
          name: 'Bruschetta',
          description: 'Pão italiano torrado com tomate, manjericão e azeite',
          price: 18.90,
          image: '/images/items/bruschetta.jpg',
          category: '1',
          featured: true,
          available: true,
          preparationTime: 15,
          allergens: ['gluten'],
          nutritionalInfo: {
            calories: 250,
            protein: 5,
            carbs: 30,
            fat: 12,
          },
        },
        {
          id: '2',
          name: 'Carpaccio',
          description: 'Finas fatias de filé mignon com rúcula e parmesão',
          price: 32.90,
          image: '/images/items/carpaccio.jpg',
          category: '1',
          available: true,
          preparationTime: 20,
          allergens: ['lactose'],
        },
      ],
    },
    {
      id: '2',
      name: 'Pratos Principais',
      description: 'Nossas especialidades da casa',
      image: '/images/categories/principais.jpg',
      items: [
        {
          id: '3',
          name: 'Filé ao Molho de Vinho',
          description: 'Filé mignon grelhado com molho de vinho tinto',
          price: 68.90,
          image: '/images/items/file-vinho.jpg',
          category: '2',
          featured: true,
          available: true,
          preparationTime: 30,
          allergens: ['lactose'],
          nutritionalInfo: {
            calories: 450,
            protein: 35,
            carbs: 15,
            fat: 25,
          },
        },
        {
          id: '4',
          name: 'Risoto de Cogumelos',
          description: 'Arroz arbóreo com mix de cogumelos e parmesão',
          price: 52.90,
          image: '/images/items/risoto.jpg',
          category: '2',
          available: true,
          preparationTime: 35,
          allergens: ['lactose'],
        },
      ],
    },
    {
      id: '3',
      name: 'Sobremesas',
      description: 'Doces para adoçar seu dia',
      image: '/images/categories/sobremesas.jpg',
      items: [
        {
          id: '5',
          name: 'Tiramisu',
          description: 'Clássico italiano com café e mascarpone',
          price: 24.90,
          image: '/images/items/tiramisu.jpg',
          category: '3',
          featured: true,
          available: true,
          preparationTime: 20,
          allergens: ['lactose', 'gluten'],
          nutritionalInfo: {
            calories: 350,
            protein: 8,
            carbs: 40,
            fat: 18,
          },
        },
        {
          id: '6',
          name: 'Panna Cotta',
          description: 'Creme italiano com calda de frutas vermelhas',
          price: 22.90,
          image: '/images/items/panna-cotta.jpg',
          category: '3',
          available: true,
          preparationTime: 15,
          allergens: ['lactose'],
        },
      ],
    },
  ],
} 