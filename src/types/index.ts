export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CreateProductInput {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
