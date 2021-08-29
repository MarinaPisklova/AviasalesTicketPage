import Note from "../Note/Note";
import React from 'react';
import styles from './ToDo.module.scss';
import Counter from "../Counter/Counter";
import Header from "../Header/Header";

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                { id: 0, text: "Купить молоко", status: true },
                { id: 1, text: "Сделать уборку", status: true },
                { id: 2, text: "Убрать зимние вещи", status: false },
            ],
            newNoteText: '',
            isLengthMatch: true,
        };
        this.tabs = [
            { type: 0, name: "Все", isActive: true },
            { type: 1, name: "Выполненные", isActive: false },
            { type: 2, name: "Невыполненные", isActive: false },
        ];
        this.state.filteredNotes = this.getFilteredNotes(this.state.notes);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onKeyPressHandler = this.onKeyPressHandler.bind(this);
        this.onClickTabs = this.onClickTabs.bind(this);
    }

    onChangeStatus(id) {
        let newNotes = this.state.notes.map(note => {
            if (note.id === id)
                note.status = !note.status;
            return note;
        });

        this.setState({
            notes: newNotes,
            filteredNotes: this.getFilteredNotes(newNotes),
        })
    }

    deleteNote(id) {
        let newNotes = this.state.notes;
        let indexNote;

        newNotes.forEach((note, index) => {
            if (note.id === id)
                indexNote = index;
        });
        newNotes.splice(indexNote, 1);

        this.setState({
            notes: newNotes,
            filteredNotes: this.getFilteredNotes(newNotes),
        })
    }

    onChangeNote(e) {
        if (e.target.value !== '\n') {
            if (e.target.value.length > 20) {
                this.setState({
                    isLengthMatch: false,
                });
            }
            else {
                this.setState({
                    newNoteText: e.target.value,
                    isLengthMatch: true,
                });
            }
        }
    }

    onKeyPressHandler(event) {
        if (event.charCode === 13 && this.state.isLengthMatch) {
            if (this.state.newNoteText.length !== 0) {
                let newNotes = this.state.notes;
                newNotes.push({ id: newNotes[newNotes.length - 1].id + 1, text: this.state.newNoteText, status: false });
                this.setState({
                    notes: newNotes,
                    filteredNotes: this.getFilteredNotes(newNotes),
                    newNoteText: '',
                })
            }
        }
    }

    onClickTabs(type) {
        this.tabs.forEach(tab => {
            tab.isActive = tab.type === type ? true : false;
        });

        this.setState({
            filteredNotes: this.getFilteredNotes(this.state.notes),
        })
    }

    getFilteredNotes(newNotes) {
        const type = this.getFilterType();
        if (type === 0) {
            return newNotes;
        }
        else if (type === 1) {
            return newNotes.filter(note => note.status === true);
        }
        else if (type === 2) {
            return newNotes.filter(note => note.status === false);
        }
    }

    getFilterType() {
        return this.tabs.filter(tab => tab.isActive)[0].type;
    }

    render() {
        const ToDoItems = this.state.filteredNotes.map((item, index) => <Note key={item.text} notes={item} index={index} deleteNote={this.deleteNote} onChangeStatus={this.onChangeStatus} />);
        const tabsItems = this.tabs.map((tab, index) => <div className={tab.isActive ? (styles.options__item + " " + styles.options__item_active) : styles.options__item} key={tab.name} onClick={() => {
            this.onClickTabs(tab.type);
        }}>{tab.name}</div>);

        return (
            <div className={styles.todo}>
                <Header />
                <div>
                    <textarea className={styles.input} onKeyPress={this.onKeyPressHandler} onChange={this.onChangeNote} value={this.state.newNoteText} placeholder="Записать что-то еще..." ></textarea>
                    {
                        !this.state.isLengthMatch
                        && <p className={styles.warning}>Длина записи не может превышать 20</p>
                    }
                    <div className={styles.options}>
                        {tabsItems}
                    </div>
                    <ul className={styles.list}>{ToDoItems}</ul>
                </div>
                <Counter notes={this.state.notes} />
            </div >
        )
    }
}

export default ToDo;