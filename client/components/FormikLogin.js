import { withFormik } from "formik"
import Login from "./Login"
import axios from 'axios'

const LoginWrapper = Login

export default withFormik({
    handleSubmit: (values) => {
    
    axios.post('/api/users/login',values,
    {
        withCredentials: true,
        credentials: 'same-origin'
    })
  },
  validationSchema: null,
})(LoginWrapper)