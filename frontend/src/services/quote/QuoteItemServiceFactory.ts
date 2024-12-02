import {LineQuoteItemService} from "./impl/LineQuoteItemService";
import {DeviceQuoteItemService} from "./impl/DeviceQuoteItemService";
import {BaseQuoteItemService} from "./impl/BaseQuoteItemService";

export class QuoteItemServiceFactory {
    private static readonly url = "/api/v1/quotes/items"

    static getBaseQuoteItemService() {
        return new BaseQuoteItemService(this.url)
    }

    static getLineQuoteItemService() {
        return new LineQuoteItemService(this.url)
    }

    static getDeviceQuoteItemService() {
        return new DeviceQuoteItemService(this.url);
    }
}