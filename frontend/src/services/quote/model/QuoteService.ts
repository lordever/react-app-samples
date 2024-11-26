import {Product} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";

export interface QuoteService {
    createQuote(products: Product[]): Promise<Quote>
}