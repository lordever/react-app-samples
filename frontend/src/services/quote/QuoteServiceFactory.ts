import {QuoteService} from "./interface/QuoteService";
import {BaseQuoteService} from "./impl/BaseQuoteService";

export class QuoteServiceFactory {
    private static readonly url = "/api/v1/quotes"

    static getQuoteService(productType?: string): QuoteService {
        return new BaseQuoteService(this.url)
    }
}