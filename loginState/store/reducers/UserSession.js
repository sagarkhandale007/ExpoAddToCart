const initialState = {
    loginStatus: false
}

export default (state = initialState, action) => {
    return {
        ...state,
        loginStatus: action.loginStatus
    }
}