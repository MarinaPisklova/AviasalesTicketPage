import { connect } from "react-redux"
import TabsMenu from './TabsMenu';
import { onClickTabs } from '../../redux/ticket-reducer';

let mapStateToProps = (state) => {
    return {
        tabs: state.ticketPage.sortValues.Tabs,
        sortValues: state.ticketPage.sortValues,
    }
}

let TabsMenuContainer = connect(mapStateToProps, { onClickTabs })(TabsMenu);

export default TabsMenuContainer;