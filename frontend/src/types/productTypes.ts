export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    seller: string;
    isSold: boolean;
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export interface Productprops {
    product : Product
}

export interface ErrorResponse {
    success: boolean;
    message: string;
}

