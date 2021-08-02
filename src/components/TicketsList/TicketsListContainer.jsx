import React from "react";
import { connect } from "react-redux"
import TicketsList from './TicketsList';
import Preloader from "../Preloader/Preloader";
import { sortTickets, aggregateTickets, showMoreTickets } from "../../redux/ticket-reducer";


async function initSearchTickets(props) {
    let searchResponse = await fetch("https://front-test.beta.aviasales.ru/search");

    if (searchResponse.status !== 200) {
        await initSearchTickets();
    }
    else {
        let searchData = await searchResponse.json();
        await getTickets(searchData, props);
    }
}

async function getTickets(searchData, props) {
    let ticketsResponse = await fetch("https://front-test.beta.aviasales.ru/tickets?searchId=" + searchData.searchId);

    if (ticketsResponse.status !== 200) {
        await getTickets(searchData, props);
    }
    else {
        let ticketsData = await ticketsResponse.json();
        props.aggregateTickets(ticketsData.tickets);
        if (ticketsData.stop === false) {
            await getTickets(searchData, props);
        }
        else {
            props.sortTickets();
        }
    }
}

class TicketsListContainer extends React.Component {
    componentDidMount() {
        initSearchTickets(this.props);
    }

    render() {
        return (this.props.addTicketsButton.numTickets ? <TicketsList {...this.props} /> : <Preloader />)
    }
}

let mapStateToProps = (state) => {
    return {
        addTicketsButton: state.ticketPage.addTicketsButton,
        tickets: state.ticketPage.sortedTickets,
    }
}

export default connect(mapStateToProps, { sortTickets, aggregateTickets, showMoreTickets })(TicketsListContainer);
