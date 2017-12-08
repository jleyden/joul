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
};

export const signup = (username, password) => {
    return {
        type: 'SIGNUP',
        username: username,
        password: password
    };
};

export const finish_tutorial = () => {
    return {
        type: 'FINISH_TUTORIAL',
  };
};
