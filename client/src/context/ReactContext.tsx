import { ReactElement, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../service/axiosInstance";
import { ProductT } from "../types/ProductT";

export type GlobalContent = {
    productList: ProductT[];
};

export const StateContext = createContext<GlobalContent>({
    productList: []
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

    return (
        <StateContext.Provider
            value={{
                productList
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export default ReactContext;
