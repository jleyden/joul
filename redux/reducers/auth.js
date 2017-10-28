const defaultState = {
    isLoggedIn: false,
    register: false,
    username: '',
    password: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                register: false,
                username: action.username,
                password: action.password
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                register: false,
                username: '',
                password: ''
            });
        case 'REGISTER':
            return Object.assign({}, state, {
                isLoggedIn: false,
                register: true,
                username:'',
                password:''
            })
        default:
            return state;
    }
}