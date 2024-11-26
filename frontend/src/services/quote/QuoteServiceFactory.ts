import {QuoteService} from "./model/QuoteService";
import {BaseQuoteService} from "./impl/BaseQuoteService";

export class QuoteServiceFactory {
    static getQuoteService(productType?: string): QuoteService {
        return new BaseQuoteService()
    }
}