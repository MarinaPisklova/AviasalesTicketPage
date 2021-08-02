import { connect } from "react-redux"
import { onChangeCheckbox, aggregateTickets, sortTickets } from "../../redux/ticket-reducer";
import Filter from './Filter';

let mapStateToProps = (state) => {
    return {
        checkboxes: state.ticketPage.sortValues.Filters,
    }
}

let FilterContainer = connect(mapStateToProps, { onChangeCheckbox, aggregateTickets, sortTickets })(Filter)

export default FilterContainer;