import {Characteristic} from "../../../model/product.model";

export interface QuoteItemService {
    updateQuoteItemCharacteristics(quoteItemId: number, characteristics: Characteristic[]): Promise<Characteristic[]>
}