export interface Product {
    id: number;
    name: string;
    characteristics: Characteristic[];
}

interface Characteristic {
    id: number;
    name: string;
    value: string;
}