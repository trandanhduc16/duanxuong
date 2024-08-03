export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  isLiked: boolean; // Thêm thuộc tính isLiked
  category: Category;
  isShow: boolean;
};

export type Category = {
  _id: string;
  name: string;
  description: string;
};

export type ProductFormParams = {
  title: string;
  price: number;
  image: string;
  description: string;
  category: Category; 
  isShow: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  _id: string;
  user: string;
  products: CartItem[];
};
