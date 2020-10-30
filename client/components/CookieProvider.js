import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../store/userReducer'
import { fetchCart } from '../store/cartReducer'



const CookieProvider = () => { 
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const mountFirstTime = (...funcs) => {
        useEffect(()=>{
            funcs.forEach(func=>{
                dispatch(func())
            })
        },[])
    }

    mountFirstTime (fetchUser,fetchCart)

    console.log('cookie provider', user)


    return(<></>)


}

export default CookieProvider



// class CookieProvider extends React.Component {

//     componentDidMount(){
//         this.props.validateUser()
//     }

//     render(){
//         return(<></>)
//     }

// }

// const mapStateToProps =(state)=> {
//     return {
//         user: state.user
//     }
// }

// const mapDispatchToProps = (dispatch) =>{
//     return{
//         validateUser: () => dispatch(fetchUser())
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(CookieProvider)