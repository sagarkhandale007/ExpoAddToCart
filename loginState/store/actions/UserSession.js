export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = (ls) => {
    return {
        type: LOGIN_USER
        ,
        loginStatus: ls
    };
};