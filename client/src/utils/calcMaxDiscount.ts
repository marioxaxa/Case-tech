export default function calcMaxDiscount(
    product_price: number,
    delivery_price: number,
    extra: number
) {
    let total_price = 0;
    switch (extra) {
        case 0:
            total_price = product_price * 1.05;
            break;
        case 1:
            total_price = product_price * 1.1;
            break;
        case 2:
            total_price = product_price * 1.2;
            break;
        default:
            total_price = product_price * 1.05;
            break;
    }
    return delivery_price > total_price ? delivery_price : total_price
}
