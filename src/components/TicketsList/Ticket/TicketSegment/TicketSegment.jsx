import style from "../TicketSegment/TicketSegments.module.scss";

const TicketSegment = (props) => {
    let stopsTitle = props.segment.stops.length;
    if (stopsTitle === 0)
        stopsTitle = "Без пересадок";
    else if (stopsTitle === 1)
        stopsTitle += " пересадка";
    else
        stopsTitle += " пересадки";

    let duration = Math.floor(props.segment.duration / 60) + "ч " + (props.segment.duration - Math.floor(props.segment.duration / 60) * 60) + "м";


    let dateTime = new Date(props.segment.date);
    let startHour = dateTime.getHours();
    let startMinutes = dateTime.getMinutes();
    let startTime = startHour + ":" + startMinutes;

    let finishHour = +startHour + + Math.floor(props.segment.duration / 60);
    let finishMinutes = +startMinutes + +(props.segment.duration - Math.floor(props.segment.duration / 60) * 60);
    if (finishMinutes >= 60) {
        finishHour++;
        finishMinutes -= 60;
        if (finishMinutes < 10) {
            finishMinutes = "0" + finishMinutes;
        }
    }
    if (finishHour >= 24) {
        finishHour -= 24;
        if (finishHour < 10) {
            finishHour = "0" + finishHour;
        }
    }

    let finishTime = finishHour + ":" + finishMinutes;

    return (
        <div className={style.TicketSegment}>
            <div className={style.TicketSegment__infobox}>
                <p className={style.TicketSegment__title}>{props.segment.origin + " - " + props.segment.destination}</p>
                <p className={style.TicketSegment__value}>{startTime + " - " + finishTime}</p>
            </div>
            <div className={style.TicketSegment__infobox}>
                <p className={style.TicketSegment__title}>В пути</p>
                <p className={style.TicketSegment__value}>{duration}</p>
            </div>
            <div className={style.TicketSegment__infobox}>
                <p className={style.TicketSegment__title}>{stopsTitle}</p>
                <p className={style.TicketSegment__value}>{props.segment.stops.join(", ")}</p>
            </div>
        </div>
    )
}

export default TicketSegment;