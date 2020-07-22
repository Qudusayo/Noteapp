import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import Card from '../Card/Card'
import { getNotes, userInfo } from '../../actions/noteActions';

import './content.scss'
import { Link } from 'react-router-dom'

class Content extends Component {
    state = {
        notes: []
    }

    componentDidMount() {
        if (!this.props.info.auth) {
            this.props.history.push('/login')
        } else {
            fetch('http://localhost:4500/getNotes', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username: this.props.info.login.username, password: this.props.info.login.password })
            })
                .then(res => res.json())
                .then(notes =>
                    this.setState({ notes: notes })
                );
        }
    }
    componentDidUpdate() {
        fetch('http://localhost:4500/getNotes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: this.props.info.login.username, password: this.props.info.login.password })
        })
            .then(res => res.json())
            .then(notes =>
                this.setState({ notes: notes })
            );
    }

    render() {
        return (
            <div className="container">
                <Card>
                    <Link to="/new">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </Link>
                </Card>
                {
                    this.state.notes.map(note => {
                        return <Card key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                <h1>{note.title.length < 12 ? note.title : `${note.title.slice(0, 11)}..`}</h1>
                                <p className="context">{note.content.length < 101 ? note.content : `${note.content.slice(0, 100)} ....`}</p>
                                <p className="date">{note.date}</p>
                            </Link>
                        </Card>
                    })
                }
            </div>
        )
    }
}

Content.propTypes = {
    getNotes: PropTypes.func.isRequired,
    userInfo: PropTypes.func.isRequired,
    notes: PropTypes.object.isRequired,
    info: PropTypes.object
};

const mapStateToProps = state => ({
    notes: state.notes,
    info: state.notes
});

export default connect(mapStateToProps, { getNotes, userInfo })(Content);