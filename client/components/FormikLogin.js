import { withFormik } from "formik"
import Login from "./Login"
import axios from 'axios'

const LoginWrapper = Login

export default withFormik({
    mapPropsToValues : () =>{
      return{
      username : '',
      password : ''
      }
    },
    handleSubmit: (values) => {
    
    axios.post('/api/users/login',values,
    {
        credentials: 'same-origin'
    })
  },
})(LoginWrapper)