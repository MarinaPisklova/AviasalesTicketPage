import React from 'react';
import styles from './Counter.module.scss';

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {notes: this.props.notes};
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.notes.length !== prevProps.notes.length) {
          this.setState({
              notes: this.props.notes,
            });
        }
    }

    render() {
        this.noteDone = 0;
        this.noteUndone = 0;

        this.state.notes.forEach(note => {
            if(note.status)
                this.noteDone++;
            else
                this.noteUndone++;
        });

        return(
            <div className={styles.counter}>
                <span>Выполнено: {this.noteDone} / Невыполнено: {this.noteUndone}</span>
            </div>
        )
    }
}

export default Counter;