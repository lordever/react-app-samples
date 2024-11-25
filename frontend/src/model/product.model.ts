export interface Product {
    id: number;
    name: string;
    characteristics: Characteristic[];
    prices: ProductPrice[];
}

export interface Characteristic {
    id?: number;
    name: string;
    value: string;
}

export interface ProductPrice {
    id?: number;
    recurrent: number;
    oneTime: number;
    upfront: number;
}