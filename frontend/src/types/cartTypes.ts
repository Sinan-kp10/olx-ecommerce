import type { Product } from "./productTypes";

export interface CartItem {
    product: Product;
}

export interface Cart {
    _id?: string;
    user: string;
    items: CartItem[],
     totalAmount: number;
}