import styles from "./HomePage.module.css"
import PreferenceComponent from '../../components/PreferenceComponent/PreferenceComponent';
import NewsComponent from "../../components/NewsComponent/NewsComponent";

const HomePage = () => {

  return (
    <div className={styles["main--container"]}>
      <PreferenceComponent/>
      <NewsComponent />
    </div>
  )
}

export default HomePage