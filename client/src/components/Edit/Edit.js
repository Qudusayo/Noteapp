import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react'

import { findNote, editNote, userInfo } from '../../actions/noteActions';


import './edit.module.scss'

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.note.note.title,
            content: this.props.note.note.content
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
            id: parseInt(this.props.match.params.id),
            username: this.props.note.userinfo.username,
            title: this.state.title,
            content: this.state.content
        };
        
        if (note.title === this.props.note.note.title && note.content === this.props.note.note.content) {
            swal("Note not changed", "", "warning");
        } else {
            this.props.editNote(note);
            swal("Note Edited", "", "success");
            this.setState({ title: '', content: '' });
            this.props.userInfo({username: this.props.note.userinfo.username, password: this.props.note.userinfo.password})
            this.props.history.push(`/note/${this.props.match.params.id}`);
        }
    }

    reset = () => {
        swal({
            title: "Are you sure to Reset?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.setState({ title: this.props.note.note.title, content: this.props.note.note.contemt});
                } else {
                    return
                }
            });
    }

    render() {
        return (
            <form className="Form" onSubmit={this.onSubmit} onReset={this.reset}>
                <label htmlFor="title">Title</label>
                <input autoComplete="false" type="text" id="title" name="title" className="title" placeholder="title" onChange={this.onChange} value={this.state.title} />

                <label htmlFor="content">Note</label>
                <textarea name="content" id="content" placeholder="I have a Note to jot." className="content" onChange={this.onChange} value={this.state.content}>

                </textarea>
                <div>
                    <button id="save" type="submit">SAVE</button>
                    <button id="del" type="reset">RESET</button>
                </div>
            </form>
        )
    }
}

Edit.propTypes = {
    editNote: PropTypes.func.isRequired,
    userInfo: PropTypes.func.isRequired,
    findNote: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    note: state.notes,
});

export default connect(mapStateToProps, { findNote, editNote, userInfo })(Edit);