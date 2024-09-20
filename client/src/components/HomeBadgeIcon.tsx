import { Home } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SaleT } from "../types/SaleT";
import { StateContext } from "../context/ReactContext";
import { useAuth } from "../context/AuthContext";

type Props = {};

export default function HomeBadgeIcon({}: Props) {
    const { salesList } = React.useContext(StateContext);

    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        let countHOLDER = 0;

        salesList?.forEach((sale: SaleT) =>
            sale.is_pending ? countHOLDER++ : null
        );

        setBadgeCount(countHOLDER);
    }, [salesList]);

    const { auth } = useAuth();

    const [is_manager, setIs_manager] = useState<boolean | undefined>(false);

    useEffect(() => {
        setIs_manager(auth.user?.manager);
    }, [auth]);

    return (
        <Badge badgeContent={ is_manager ? badgeCount : 0} color="secondary">
            <Home />
        </Badge>
    );
}
