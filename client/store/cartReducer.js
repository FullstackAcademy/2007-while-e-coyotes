import axios from 'axios'

const SET_CART = 'SET_CART'


export const fetchCart = () =>{
    return async (dispatch) =>{
        const { data } = await axios.get('/api/orders/5')
        console.log(data)
    }
}

const initialState = {}
export default function (state=initialState, action){
    switch(action.type){
        case SET_CART:
            return state
        default:
            return state
    }
}