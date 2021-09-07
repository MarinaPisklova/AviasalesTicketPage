import { connect } from "react-redux"
import { aggregateTickets, onChangeCheckbox } from "../../redux/ticket-reducer";

import Filter from './Filter';

let mapStateToProps = (state) => {
    return {
        checkboxes: state.ticketPage.sortValues.Filters,
    }
}

let FilterContainer = connect(mapStateToProps, { onChangeCheckbox, aggregateTickets })(Filter)

export default FilterContainer;