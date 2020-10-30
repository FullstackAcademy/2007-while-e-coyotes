import { withFormik } from "formik"
import Login from "./Login"
import { connect } from 'react-redux'
import { validateLogin } from '../store/userReducer'
import { fetchCart } from '../store/cartReducer'

const FormikLogin = withFormik({
    mapPropsToValues : (props) =>{
      return{
      username : '',
      password : '',
      loginUser :props.loginUser
      }
    },
    handleSubmit: async (values) => {
      const loginInfo = {
        username : values.username,
        password : values.password
      }
      await values.loginUser(loginInfo)
      values.getCart(values)
  },
})(Login)


const mapStateToProps =(state)=> {
  return {
      user: state.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    loginUser: (loginInfo) => dispatch(validateLogin(loginInfo)),
    getCart: (user) => dispatch(fetchCart(user))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(FormikLogin)