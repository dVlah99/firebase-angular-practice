export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  isDeleted: boolean;
  uid: string;
}

export interface AddProductInput {
  name: string;
  price: number;
  description: string;
  isDeleted: boolean;
}

export interface EditProductInput {
  id: string;
  name: string;
  price: number;
  description: string;
  isDeleted: boolean;
}
