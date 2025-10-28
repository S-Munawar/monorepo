export interface Game {
  name: string;
  id: string;
  image?: string;
  description: string;
  price: number;
  rating?: number;
  reviews?: Review[];
}

export interface Review{
  game: string;
  rating: number;
  content: string;
}

export interface CartItem {
  game: Game;
  quantity: number;
}

export const API_URL = '/api';
