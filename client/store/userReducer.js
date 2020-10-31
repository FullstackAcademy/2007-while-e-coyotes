const axios = require('axios')

const SET_USER = 'SET_USER'

const setUser = (user) => {
    return {
        type : SET_USER,
        user
    }
}

export const validateLogin = (loginInfo, history) =>{
    return async (dispatch)=>{
       const { data } = await axios.post('/auth/login',loginInfo,
    {
        credentials: 'same-origin'
    })
       dispatch(setUser(data))
       history.push('/');
    }
}

export const fetchUser = () => {
    return async (dispatch)=>{
        const { data } = await axios.post('/auth/onPageLoad')
        dispatch(setUser(data))
    }
}


const initialState = {}
export default (state= initialState, action) =>{
    switch(action.type){
        case SET_USER:
            return action.user
        default:
            return state
    }
}
