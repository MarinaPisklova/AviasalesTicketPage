import { connect } from "react-redux"
import TabsMenu from './TabsMenu';
import { sortTickets, onClickTabs} from '../../redux/ticket-reducer';

let mapStateToProps = (state) => {
    return{
        tabs: state.ticketPage.sortValues.Tabs,
        sortValues: state.ticketPage.sortValues,
    }
}

let TabsMenuContainer = connect(mapStateToProps, {onClickTabs, sortTickets})(TabsMenu);

export default TabsMenuContainer;