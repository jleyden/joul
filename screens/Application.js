import React from 'react';
import { connect } from 'react-redux';
import Secured from './Secured';
import Login from './LoginandRegisterComponents/Login/Login';
import Register from './LoginandRegisterComponents/Register/Register';



class Application extends React.Component {

    render() {
        if (this.props.isLoggedIn) {
            return <Secured />;
        } else if (this.props.register) {
            return <Register/>
        } else {
            return <Login />;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        register: state.auth.register
    };
}

export default connect(mapStateToProps)(Application);


