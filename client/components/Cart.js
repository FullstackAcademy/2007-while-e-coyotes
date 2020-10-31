import React, { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem } from '../store/cartReducer'

const Cart = () =>{

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    return(
        <div>
            {cart.items ? 
                <div>
                    {cart.items.map(item=>{
                    const { orderItem } = item;
                        return(   
                            <div key={item.id}>
                                <img src={item.imageUrl} />
                                Name: {item.name}
                                Price: {orderItem.priceOrdered }
                                Quantity: {orderItem.quantity}
                                <button onClick={()=>dispatch(deleteItem(cart.userId,cart.id,item.id))}>Remove From Cart</button> 
                            </div>
                        )
                    })}
                    <div>
                        <button onClick={()=>console.log('need to add a checkout component :^)')}>Checkout!</button>
                    </div>
                </div>           
            :
                <div>Loading Cart!</div>
            }
        </div>
    )
}

export default Cart