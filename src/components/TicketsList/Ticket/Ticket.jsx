import style from "./Ticket.module.scss"
import TicketSegment from "./TicketSegment/TicketSegment"
//
const Ticket = (props) => {
    let SegmentsList = props.ticket.segments.map((segment, index) => <TicketSegment key={index} segment={segment} />)

    let price = Math.floor(props.ticket.price / 1000) + " ";
    if (props.ticket.price % 1000 === 0)
        price += "000";
    else if (props.ticket.price % 1000 < 100 && props.ticket.price % 1000 > 9) {
        price += "0" + props.ticket.price % 1000;
    }
    else if (props.ticket.price % 1000 < 10) {
        price += "00" + props.ticket.price % 1000;
    }
    else
        price += props.ticket.price % 1000;

    let companyLogo = "https://pics.avs.io/99/36/" + props.ticket.carrier + ".png";

    return (
        <div className={style.container}>
            <div className={`${style.container__ticket + " " + style.ticket}`}>
                <div className={style.ticket__topPart}>
                    <p className={style.ticket__price}>{price}</p>
                    <img className={style.ticket__logo} src={companyLogo} alt="logo" />
                </div>
                <div>
                    {SegmentsList}
                </div>
            </div>
        </div>
    )
}

export default Ticket;