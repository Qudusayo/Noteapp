import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react'

import { insertNote, userInfo } from '../../actions/noteActions';


import './new.scss'

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const note = {
            username: this.props.note.userinfo.username,
            title: this.state.title,
            content: this.state.content
        };

        if (note.title === '' || note.content === '') {
            swal("", "Please add content to your note", "warning");
        } else {
            this.props.insertNote(note);
            swal("Notes Created", "", "success");
            this.setState({ title: '', content: '' });
            this.props.userInfo({username: this.props.note.userinfo.username, password: this.props.note.userinfo.password})
            this.props.history.push('/');
        }
    }

    reset = () => {
        swal({
            title: "Are you sure to Discard ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Your note has been deleted!", {
                        icon: "success",
                    });
                    this.setState({ title: '', content: '' });
                } else {
                    swal("Your note is safe!", "", "success");
                }
            });
    }

    render() {
        return (
            <form className="Form" onSubmit={this.onSubmit} >
                <label htmlFor="title">Title</label>
                <input autoComplete="false" type="text" id="title" name="title" className="title" placeholder="title" onChange={this.onChange} value={this.state.title} />

                <label htmlFor="content">Note</label>
                <textarea name="content" id="content" placeholder="I have a Note to jot." className="content" onChange={this.onChange} value={this.state.content}>

                </textarea>
                <div>
                    <button id="save" type="submit">SAVE</button>
                    <button id="del" type="button" onClick={this.reset}>DISCARD</button>
                </div>
            </form>
        )
    }
}

New.propTypes = {
    insertNote: PropTypes.func.isRequired,
    userInfo: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    note: state.notes,
});

export default connect(mapStateToProps, { insertNote, userInfo })(New);