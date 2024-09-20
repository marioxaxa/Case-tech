export function extraToString(extra: number) {
    switch (extra) {
        case 0:
            return "Padrão";
        case 1:
            return "Turbo";
        case 2:
            return "Super Turbo";
        default:
            return "Padrão";
    }
}

export function isCashToString(isCash: number) {
    switch (isCash) {
        case 0:
            return "Cartão de Credito";
        case 1:
            return "Pix ou Boleto";
        default:
            return "Cartão de Credito";
    }
}
