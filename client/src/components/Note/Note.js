import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from '@sweetalert/with-react'

import { findNote, deleteNote, editNote } from '../../actions/noteActions';

import './note.scss'


class Note extends Component {

    componentDidMount() {
        this.props.findNote({username: this.props.note.userinfo.username, id: parseInt(this.props.match.params.id)});
    }
    delete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Oops! Your note has been deleted!", {
                        icon: "success",
                    });
                    this.props.deleteNote({username: this.props.note.userinfo.username, id: parseInt(this.props.match.params.id)});
                    this.props.history.push('/')
                } else {
                    swal("Your note is safe!");
                }
            });
    }
    edit = () => {
        this.props.findNote({username: this.props.note.userinfo.username, id: parseInt(this.props.match.params.id)});
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
    render() {
        return (
            <div className="Note">
                <div className="editor">
                    <h3>
                        {this.props.note.note.date}
                    </h3>
                    <div className="selector">
                        <svg onClick={this.delete} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(248, 34, 34)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>

                        <svg onClick={this.edit} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgb(0, 119, 255)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </div>
                </div>
                <h2>{this.props.note.note.title}</h2>
                <p>
                    {this.props.note.note.content}
                </p>
            </div>
        )
    }
}

Note.propTypes = {
    findNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    note: state.notes,
});

export default connect(mapStateToProps, { findNote, deleteNote, editNote })(Note);