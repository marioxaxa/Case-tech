import estadosSiglas from "./estadosSiglas";

export default function calcDelivery(state: string ) {
    
    const FIXED_PRICE = 50
    const STATE_PRICE = 5
    const STATE_LIST = estadosSiglas()

    let distance = 0

    const target_state = STATE_LIST.find((fullState) => {
        return fullState.estado == state
    })

    if(target_state){
        distance = target_state.distancia
    }

    const total_price = FIXED_PRICE + (STATE_PRICE * distance)

    return total_price
}