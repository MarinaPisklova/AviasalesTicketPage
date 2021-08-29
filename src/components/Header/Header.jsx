import logo from "../../images/Logo.svg"
import style from "./Header.module.scss"

const Header = () => {
    return (
        <div className={style.header}>
            <img src={logo} alt="logo" />
        </div>
    )
}

export default Header;