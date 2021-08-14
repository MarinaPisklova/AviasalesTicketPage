import React from "react";
import { connect } from "react-redux"
import TicketsList from './TicketsList';
import Preloader from "../Preloader/Preloader";
import { sortTickets, aggregateTickets, showMoreTickets, getTickets } from "../../redux/ticket-reducer";

class TicketsListContainer extends React.Component {
    componentDidMount() {
        this.props.getTickets(this.props);
    }

    render() {
        return (this.props.addTicketsButton.numTickets ? <TicketsList {...this.props} /> : <Preloader />)
    }
}

let mapStateToProps = (state) => {
    return {
        addTicketsButton: state.ticketPage.addTicketsButton,
        tickets: state.ticketPage.sortedTickets,
        sortValues: state.ticketPage.sortValues,
    }
}

export default connect(mapStateToProps, { sortTickets, aggregateTickets, showMoreTickets, getTickets })(TicketsListContainer);
