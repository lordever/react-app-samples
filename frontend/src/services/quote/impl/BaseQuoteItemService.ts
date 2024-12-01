import {QuoteService} from "../interface/QuoteService";
import {QuoteItemService} from "../interface/QuoteItemService";
import {Characteristic} from "../../../model/product.model";

export class BaseQuoteItemService implements QuoteItemService {
    updateQuoteItemCharacteristics(quoteItemId: number, characteristics: Characteristic[]): Characteristic[] {
        return [];
    }
}