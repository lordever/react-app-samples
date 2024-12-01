import {Product} from "../../../../model/product.model";

export interface BundleFlowModel {
    product: Product
    hasLine: boolean;
    hasDevice: boolean;
}