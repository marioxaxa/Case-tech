import { ProductQuantityT } from "../types/ProductQuantityT";
import { ProductT } from "../types/ProductT";
import getProductById from "./getProductById";
import prodQToProdVector from "./prodQToProdVector";

export default function calcTotalPrice(
    selecionedProducts: ProductQuantityT,
    is_cash_payment: number,
    productList: ProductT[]
) {
    let product_price = 0;
    const prodIterable = prodQToProdVector(selecionedProducts);

    for (const id of prodIterable) {
        const product = getProductById(id.key, productList);
        if (is_cash_payment == 1) {
            product_price +=
                (product?.preco_descontado ?? 0) * id.data.quantidade;
        } else {
            product_price += (product?.preco_cheio ?? 0) * id.data.quantidade;
        }
    }
    return product_price;
}
