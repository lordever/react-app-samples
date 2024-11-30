import {Product} from "./product.model";

export interface Quote {
    id?: number;
    name: string;
    type: QuoteTypeEnum;
    quoteItems: QuoteItem[];
    totalPrice?: QuoteTotalPrice;
}

export interface QuoteItem {
    id?: number;
    name: string;
    type: QuoteItemTypeEnum;
    product: Product;
    characteristic: QuoteItemCharacteristic[];
    prices: QuoteItemPrice[];
}

export interface QuoteItemCharacteristic {
    id?: number;
    name: string;
    value: string;
}

export interface QuoteItemPrice {
    id?: number;
    recurrent: number;
    oneTime: number;
    upfront: number;
}

export interface QuoteTotalPrice {
    recurrent: number;
    oneTime: number;
    upfront: number;
}

export enum QuoteTypeEnum {
    SUBMIT = "SUBMIT",
    IN_MEMORY = "IN_MEMORY"
}

export enum QuoteItemTypeEnum {
    ADD = "ADD",
    UPDATE = "UPDATE"
}