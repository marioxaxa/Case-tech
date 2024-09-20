import { ReactElement, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../service/axiosInstance";
import { ProductT } from "../types/ProductT";
import { SaleT } from "../types/SaleT";

export type GlobalContent = {
    productList: ProductT[];
    salesList: SaleT[]
};

export const StateContext = createContext<GlobalContent>({
    productList: [],
    salesList: []
});

type Props = { children: ReactElement };

function ReactContext({ children }: Props) {
    const { data: productList } = useQuery({
        queryKey: ["productListContext"],
        queryFn: async () => {
            const response = await axiosInstance.get("shop");
            return response.data;
        },
    });

    const { data: salesList } = useQuery({
        queryKey: ["salesListContext"],
        queryFn: async () => {
            const response = await axiosInstance.get("shop/sale");
            return response.data;
        },
    });

    return (
        <StateContext.Provider
            value={{
                productList,
                salesList
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export default ReactContext;
