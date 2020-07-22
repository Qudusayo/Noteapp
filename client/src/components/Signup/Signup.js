import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react'

import { newUser, allUsers } from '../../actions/noteActions';

import styles from './signup.module.scss'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            cpassword: ''
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
            password: this.state.password,
        };
        if (this.state.password !== this.state.cpassword) {
            swal("Password mismatch", "", "warning")
        } else  if(this.state.username.length < 2) {
            swal("Username too short", "", "warning")
        }else  if(this.props.users.users.includes(this.state.username)) {
            swal("Username already exits", "Try another username", "warning")
        } else {
            this.props.newUser(auth)
            swal("Registration Successful", "Kindly Login", "success")
            this.setState({ username: '', password: '', cpassword: '' });
        }
    }

    componentDidMount(){
        this.props.allUsers()
    }

    render() {
        return (
            <form className={styles.form} onSubmit={this.onSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={this.onChange} value={this.state.username} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={this.onChange} value={this.state.password} />

                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" id="cpassword" name="cpassword" onChange={this.onChange} value={this.state.cpassword} />
                <input type="submit" value="Signup" />
                <h2>Already  a User ?<Link to="/login"> Login Here</Link></h2>
            </form>
        )
    }
}

Signup.propTypes = {
    newUser: PropTypes.func.isRequired,
    allUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    user: state.notes,
    users: state.notes
});

export default connect(mapStateToProps, { newUser, allUsers })(Signup);