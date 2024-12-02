import {Characteristic, Product} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";

export abstract class QuoteService {
    protected readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    abstract createQuote(products: Product[]): Promise<Quote>
}