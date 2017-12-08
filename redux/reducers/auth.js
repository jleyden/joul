const defaultState = {
    isLoggedIn: false,
    register: false,
    tutorial: false,
    username: '',
    password: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                isLoggedIn: true,
                register: false,
                tutorial: false,
                username: action.username,
                password: action.password
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                isLoggedIn: false,
                register: false,
                tutorial: false,
                username: '',
                password: ''
            });
        case 'REGISTER':
            return Object.assign({}, state, {
                isLoggedIn: false,
                register: true,
                tutorial: false,
                username:'',
                password:''
            });
        case 'SIGNUP':
            return Object.assign({}, state, {
                isLoggedIn: true,
                register: false,
                tutorial: true,
                username: action.username,
                password: action.password
            });
        case 'FINISH_TUTORIAL':
            return Object.assign({}, state, {
                isLoggedIn: true,
                register: false,
                tutorial: false,
                username: '',
                password: ''
            });


        default:
            return state;
    }
}