import { ProductT } from "../types/ProductT";

export default function getProductById(ProductId: string, ProductList: ProductT[]) {
    return ProductList.find((Product: ProductT) => Product.id === ProductId);
}