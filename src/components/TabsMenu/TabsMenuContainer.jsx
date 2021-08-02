import { connect } from "react-redux"
import TabsMenu from './TabsMenu';
import { onClickTabs, sortTickets} from '../../redux/ticket-reducer';

let mapStateToProps = (state) => {
    return{
        tabs: state.ticketPage.sortValues.Tabs,
    }
}

let TabsMenuContainer = connect(mapStateToProps, {onClickTabs, sortTickets})(TabsMenu);

export default TabsMenuContainer;