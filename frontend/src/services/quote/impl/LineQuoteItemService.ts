import {QuoteItemService} from "../interface/QuoteItemService";
import {Characteristic} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";

export class LineQuoteItemService extends QuoteItemService {
    updateCharacteristics(quoteItemId: number, characteristics: Characteristic[]): Promise<Quote | undefined> {
        return Promise.resolve(undefined);
    }
}