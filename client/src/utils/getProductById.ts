import { GridRowId } from "@mui/x-data-grid/models/gridRows";
import { ProductT } from "../types/ProductT";

export default function getProductById(ProductId: string | GridRowId, ProductList: ProductT[]) {
    return ProductList.find((Product: ProductT) => Product.id === ProductId);
}