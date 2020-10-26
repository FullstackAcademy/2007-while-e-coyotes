import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../store/userReducer'

class CookieProvider extends React.Component {
    constructor(){
        super()
    }
/*
    will check for a cookie 

    if cookie

        check if cookie has valid user
        load user

    no cookie

        generate a cookie -> give broser cookie
        generate an anon serID (? do you generate cookie first, or a userID )
*/

    componentDidMount(){
        this.props.validateUser()
    }

    render(){
        return(<></>)
    }

}

const mapStateToProps =(state)=> {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        validateUser: () => dispatch(fetchUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CookieProvider)