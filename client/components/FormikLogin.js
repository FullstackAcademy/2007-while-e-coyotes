import { withFormik } from "formik"
import Login from "./Login"
import axios from 'axios'

const LoginWrapper = Login

export default withFormik({
    handleSubmit: (values, { setSubmitting }) => {
    
    axios.post('/api/users/login',values,
    {
        withCredentials: true,
        credentials: 'same-origin'
    })

    // Simulates the delay of a real request
    setTimeout(() => setSubmitting(false), 3 * 1000)
  },
  validationSchema: null,
})(LoginWrapper)