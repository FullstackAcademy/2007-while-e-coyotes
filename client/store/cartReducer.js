import axios from 'axios'

const SET_CART = 'SET_CART'

const _setCart = (cartData) =>{
    return {
        type: SET_CART,
        cartData
    }
}

export const fetchCart = (user) =>{
    return async (dispatch) =>{
        try{
            const { data } = await axios.get(`/api/orders/${user.id}`)
            dispatch(_setCart(data))
        }catch(err){
        }
    }
}

const initialState = {}
export default function (state=initialState, action){
    switch(action.type){
        case SET_CART:
            return action.cartData
        default:
            return state
    }
}