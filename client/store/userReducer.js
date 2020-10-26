const axios = require('axios')

const SET_USER = 'SET_USER'

const setUser = (user) => {
    return {
        type : SET_USER,
        user
    }
}

export const fetchUser = () => {
    return (dispatch)=>{
        const data = axios.post('/api/users/validation')
        console.log(data)


        //dispatch(setUser({user:'sudoku'}))
    }
}

const initialState = {}
export default (state= initialState, action) =>{
    switch(action.type){
        case SET_USER:
            return {...state,user:action.user}
        default:
            return state
    }
}