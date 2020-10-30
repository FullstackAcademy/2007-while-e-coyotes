const axios = require('axios')

const SET_USER = 'SET_USER'

const setUser = (user) => {
    return {
        type : SET_USER,
        user
    }
}

export const validateLogin = (loginInfo) =>{
    return async (dispatch)=>{
        console.log(loginInfo)
       const {data} = await axios.post('/auth/login',loginInfo,
    {
        credentials: 'same-origin'
    })
       dispatch(setUser({user:data}))
    }
}

export const fetchUser = () => {
    return async (dispatch)=>{
        const {data} = await axios.post('/auth/onPageLoad')
        dispatch(setUser({user:data}))
    }
}


const initialState = {}
export default function(state= initialState, action){
    switch(action.type){
        case SET_USER:
            return {user:action.user}
        default:
            return state
    }
}