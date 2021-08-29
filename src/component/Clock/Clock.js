import React from 'react';
import styles from "./Clock.module.scss"

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        this.getWeekDay = this.getWeekDay.bind(this);
        this.getTodayDate = this.getTodayDate.bind(this);
        this.getTime = this.getTime.bind(this);
    }

    getWeekDay() {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        return days[this.state.date.getDay()];
    }

    getTodayDate() {
        const date = this.state.date;
        const monthes=['Янв','Фев', 'Мар','Апр', 'Май','Июн','Июл',
            'Авг', 'Сен','Окт', 'Ноя','Дек'];
        
        return monthes[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    getTime() {
        return this.state.getHours() + ":" + this.state.getMinutes() + ":" + this.state.getSeconds();
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.setState({date: new Date()}), 1000);        
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className={styles.clock}>
                <div className={styles.clock__weekday}>{this.getWeekDay()}</div>
                <div className={styles.clock__date}>{this.getTodayDate()}</div>
                <div className={styles.clock__time}>{this.state.date.toLocaleTimeString()}</div>
            </div>
        )
    }
}

export default Clock