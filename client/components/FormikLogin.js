import { withFormik } from "formik"
import Login from "./Login"
import { connect } from 'react-redux'
import { validateLogin } from '../store/userReducer'

const FormikLogin = withFormik({
    mapPropsToValues : (props) =>{
      return{
      username : '',
      password : '',
      loginUser :props.loginUser,
      history: props.history
      }
    },
    handleSubmit: (values) => {
      const loginInfo = {
        username : values.username,
        password : values.password
      }
      values.loginUser(loginInfo, values.history)
  },
})(Login)


const mapStateToProps =(state)=> {
  return {
      user: state.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    loginUser: (loginInfo, history) => dispatch(validateLogin(loginInfo, history))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(FormikLogin)
