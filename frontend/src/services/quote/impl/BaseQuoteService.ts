import {QuoteService} from "../model/QuoteService";
import {Product} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";
import {prepareCreateQuoteInput} from "../quote.helper";

export class BaseQuoteService implements QuoteService {
    async createQuote(products: Product[]): Promise<Quote> {
        try {
            const quoteInput = prepareCreateQuoteInput(products);
            const response = await fetch("/api/v1/quotes", {
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