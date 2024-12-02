import {Characteristic} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";

export abstract class QuoteItemService {
    protected readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    abstract updateCharacteristics(quoteItemId: number, characteristics: Characteristic[]): Promise<Quote | undefined>
}