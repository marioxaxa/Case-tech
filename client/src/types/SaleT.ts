export type SaleT = {
    id: string; 
    is_pending: boolean;
    is_cash_payment: boolean;
    discount: number;
    max_discount: number;
    shipping: number;
    extra: number;
    price: number;
    products: ProductArray[]; 
    is_aproved: boolean | null,
    seller: string
  };
  
type ProductArray = {
    id: string,
    quantity: number
}