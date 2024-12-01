import {QuoteService} from "./interface/QuoteService";
import {BaseQuoteService} from "./impl/BaseQuoteService";

export class QuoteServiceFactory {
    static getQuoteService(productType?: string): QuoteService {
        return new BaseQuoteService()
    }
}