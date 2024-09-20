import { ProductQuantityT } from "../types/ProductQuantityT";

export default function prodQToProdVector(
    productQuantity: ProductQuantityT
): { key: string; data: { [field: string]: number } }[] {
    return Object.keys(productQuantity).map((key) => ({
        key,
        data: productQuantity[key],
    }));
}
