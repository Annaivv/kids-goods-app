export interface Good {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export type NewGood = Omit<Good, 'id'>;
