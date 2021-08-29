import style from "./TicketsList.module.scss"
import Ticket from './Ticket/Ticket';

const TicketsList = (props) => {
    let listOfTickets = [];
    for (let i = 0; i < props.addTicketsButton.numTickets; i++) {
        listOfTickets.push(<Ticket key={i} ticket={props.tickets[i]} />)
    }
    
    return (
        <div className={style.container}>
            <div className={style.TicketsList}>
                {listOfTickets}
            </div>
            <button className={`${style.button + " " + style.container__button}`} disabled={props.addTicketsButton.disabled} onClick={props.showMoreTickets}>
                Показать еще 5 билетов!
            </button>
        </div>

    )
}

export default TicketsList;