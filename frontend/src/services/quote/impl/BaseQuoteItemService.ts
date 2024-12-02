import {QuoteItemService} from "../interface/QuoteItemService";
import {Characteristic} from "../../../model/product.model";
import {Quote} from "../../../model/quote.model";

export class BaseQuoteItemService extends QuoteItemService {
    async updateCharacteristics(quoteItemId: number, characteristics: Characteristic[]): Promise<Quote | undefined> {
        try {
            const response = await fetch(`${this.url}/${quoteItemId}/update-characteristics`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(characteristics),
            });

            if (!response.ok) {
                const error = await response.json();
                throw error;
            }

            return await response.json();
        } catch (e) {
            console.error("Update characteristics has been failed: ", e);
            throw e;
        }
    }
}