import {Product} from "../../model/product.model";
import {Quote, QuoteItem, QuoteItemTypeEnum, QuoteTypeEnum} from "../../model/quote.model";

export const prepareCreateQuoteInput = (products: Product[]): Quote => {
    const quoteItems: QuoteItem[] = products.map((product) => ({
        name: product.name,
        type: QuoteItemTypeEnum.ADD,
        product: {
            id: product.id,
            name: product.name,
            characteristics: product.characteristics.map((char) => ({
                name: char.name,
                value: char.value
            })),
            prices: product.prices.map((price) => ({
                recurrent: price.recurrent,
                oneTime: price.oneTime,
                upfront: price.upfront
            }))
        },
        characteristic: product.characteristics.map((char) => ({
            name: char.name,
            value: char.value
        })),
        prices: product.prices.map((price) => ({
            recurrent: price.recurrent,
            oneTime: price.oneTime,
            upfront: price.upfront,
        }))
    }));

    return {
        name: `Quote #${Date.now()}`,
        type: QuoteTypeEnum.IN_MEMORY,
        quoteItems
    };
};