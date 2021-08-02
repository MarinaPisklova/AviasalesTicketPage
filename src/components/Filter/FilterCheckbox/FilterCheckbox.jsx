import style from "./FilterCheckbox.module.scss"

const FilterCheckbox = (props) => {
    const onChangeCheckbox = () => {
        props.onChange(props.name);
    }

    return (
        <div className={style.checkboxItem} >
            <div className={`${style.checkboxItem__checkbox + " " + style.checkbox}`} >
                <input className={style.checkbox__box} type="checkbox" checked={props.value} onChange={onChangeCheckbox} id={props.name}></input>
                <label className={style.checkbox__name}>{props.name}</label>
            </div>
        </div>
    )
}

export default FilterCheckbox;