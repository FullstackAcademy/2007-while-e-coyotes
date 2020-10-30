import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Cart = () =>{
    const cart = useSelector(state => state.cart)

    return(
        <div>
            {cart.items ? 
                cart.items.map(item=>{
                    return(
                        <div>
                            {item.name}
                        </div>
                    )
                })
            :
                <div>Loading Cart!</div>
            }
        </div>
    )
}

export default Cart