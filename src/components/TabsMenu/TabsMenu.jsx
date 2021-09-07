import style from "./TabsMenu.module.scss"
import Tab from "./Tab/Tab";

const TabsMenu = (props) => {
    let TabsList = props.tabs.map((tab, index) => <Tab key={index} name={tab.name} value={tab.value} sortV={props.sortValues} onClick={props.onClickTabs} />);
    return (
        <div className={style.TabsMenu}>
            {TabsList}
        </div>
    )
}

export default TabsMenu;