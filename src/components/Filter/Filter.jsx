import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import style from "./Filter.module.scss"

const Filter = (props) => {
    let FilterCheckboxes = props.checkboxes.map((checkbox, index) => <FilterCheckbox key={index} name={checkbox.name} value={checkbox.value} onChange={(name) => props.onChangeCheckbox(name)} />);
    return (
        <div className={style.leftSidebar}>
            <div className={`${style.leftSidebar__filter + " " + style.filter}`}>
                <h2 className={style.filter__title}>Количество пересадок</h2>
                {FilterCheckboxes}
            </div>
        </div>
    )
}

export default Filter;