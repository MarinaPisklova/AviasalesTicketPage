import React from 'react';
import styles from './Note.module.scss'

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.deleteThisNote = this.deleteThisNote.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    deleteThisNote() {
        this.props.deleteNote(this.props.notes.id);
    }

    changeStatus() {
        this.props.onChangeStatus(this.props.notes.id);
    }

    render() {
        return (
            <li className={styles.note}>
                <div className={styles.note__container}>
                    <input className={styles.checkbox} id='checkbox' type='checkbox' onChange={this.changeStatus} checked={this.props.notes.status}></input>
                    <label className={styles.checkbox__label}></label>
                    <div className={styles.note__text} onClick={this.changeStatus}>{this.props.notes.text}</div>
                </div>
                <svg className={styles.trash} onClick={this.deleteThisNote} width="15px" height="15px" viewBox="0 0 55 56" version="1.1" >
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Trash" fill="rgb(199, 131, 248)">
                            <polygon id="Shape" points="49.6 55.3 5.4 55.3 5.4 10.8 8.4 10.8 8.4 52.3 46.6 52.3 46.6 10.8 49.6 10.8"></polygon>
                            <rect id="Rectangle-path" x="0.1" y="9.3" width="54.8" height="3"></rect>
                            <polygon id="Shape" points="38.2 11 35.2 11 35.2 3.3 19.8 3.3 19.8 11 16.8 11 16.8 0.3 38.2 0.3"></polygon>
                            <g id="Group" transform="translate(19.000000, 22.000000)">
                                <rect id="Rectangle-path" x="0" y="0.3" width="3" height="20"></rect>
                                <rect id="Rectangle-path" x="14" y="0.3" width="3" height="20"></rect>
                            </g>
                        </g>
                    </g>
                </svg>
            </li>
        )
    }
}

export default Note