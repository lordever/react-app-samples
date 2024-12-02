import {QuoteService} from "../interface/QuoteService";
import {Product} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";
import {prepareCreateQuoteInput} from "../helpers/quote.helper";
import {Simulate} from "react-dom/test-utils";


export class BaseQuoteService extends QuoteService {
    async createQuote(products: Product[]): Promise<Quote> {
        try {
            const quoteInput = prepareCreateQuoteInput(products);
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quoteInput),
            });

            if (!response.ok) {
                const error = await response.json();
                throw error;
            }

            return await response.json();
        } catch (e) {
            console.error("Quote creation has been failed: ", e);
            throw e;
        }
    }
}