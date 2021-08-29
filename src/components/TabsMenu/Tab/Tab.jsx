import style from "./Tab.module.scss"

const Tab = (props) => {
    const onClickTab = () => {
        props.onClick(props.name);
        props.onSortFunc();
    }

    return (
        <div className={`${props.value === true ? style.tab + " " + style.tab_active : style.tab}`} onClick={onClickTab}>
            <p className={`${props.value === true ? style.tab__name + " " + style.tab__name_active : style.tab__name}`}>{props.name}</p>
        </div>
    )
}

export default Tab;