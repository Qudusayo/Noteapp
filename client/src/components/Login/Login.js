import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react'

import { real, checkuser, userInfo , getNotes} from '../../actions/noteActions';

import styles from './login.module.scss'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const auth = {
            username: this.state.username.toLowerCase(),
            password: this.state.password
        };

        let users = this.props.checkeduser.checkuser
        function check() {
            for (let i = 0; i < users.length; i++) {
                if (users[i][0] === auth.username && users[i][1] === auth.password) {
                    return true
                }
            }
            return false
        }
        if(check()){
            swal('Login Successful', '', 'success')
            this.props.real(true);
            this.props.userInfo(auth);
            this.props.getNotes(auth);
            this.props.history.push('/')
        }else{
            swal('Invalid Deatils', 'Invalid username or password', 'warning')
        }
    }

    componentDidMount() {
        this.props.checkuser()
    }

    render() {
        return (
            <form className={styles.form} onSubmit={this.onSubmit} >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={this.onChange} value={this.state.username} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} />
                <input type="submit" value="login" />
                <h2>New User ?<Link to="/signup"> SignUp Here</Link></h2>
            </form>
        )
    }
}

Login.propTypes = {
    checkuser: PropTypes.func.isRequired,
    userInfo: PropTypes.func.isRequired,
    real: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    checkeduser: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    checkeduser: state.notes,
    auth: state.notes
});

export default connect(mapStateToProps, { checkuser, real, userInfo ,getNotes })(Login);