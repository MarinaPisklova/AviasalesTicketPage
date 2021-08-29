import classes from "./Preloader.module.scss";
import preloader from "../../images/preloader.svg"

const Preloader = () => {
    return (
        <img className={classes.fetchIcon} src={preloader} alt="preloader"/>
    )
}

export default Preloader;