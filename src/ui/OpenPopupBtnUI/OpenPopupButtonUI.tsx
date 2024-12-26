import { FaFilter } from "react-icons/fa";
import styles from "./OpenPopupButtonUI.module.css"

const OpenPopupButton = () => {
  return (
    <div className={styles["btn--container"]}>
        <FaFilter />
    </div>
  )
}

export default OpenPopupButton