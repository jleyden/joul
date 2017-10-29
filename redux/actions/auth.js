export const login = (username, password) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const register = () => {
    return {
        type: 'REGISTER'
    };
}

export const signup = (username, email, password) => {
    return (dispatch) => {
    };
};