import styles from "./PreferenceComponent.module.css"
import Search from '../../ui/SearchUI/SearchUI'
import DropDown from '../../ui/DropDownUI/DropDownUI'
import OpenPopupButton from '../../ui/OpenPopupBtnUI/OpenPopupButtonUI'
import LayoutComponent from '../LayoutComponent/LayoutComponent'
import {  useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
// import Popup from '../PopupComponent/PopupComponent'
// import { setPopup } from '../../redux/features/PreferenceSlice';



const PreferenceComponent = () => {
  const menu = useSelector((state: RootState) => state.preference.menu);
  const search = useSelector((state: RootState) => state.preference.search);
  const categoryArray = useSelector((state: RootState) => state.preference.categoryArray);
  // const popup = useSelector((state: RootState) => state.preference.popup);

  let type = "text";

  if (menu === "date") {
    type = "date";
  }

  // const [isPopupOpen, setPopupOpen] = useState(false);

  // const togglePopup = () => {
  //   console.log("popup", popup)
  //   dispatch(setPopup(!popup))
  // };

  return (
    <LayoutComponent>
      {/* <Popup isOpen={popup} onClose={togglePopup}>
        <h2>Choose Preference</h2>
        <p>
          <DropDown heading={"Chose Category"} menu={categoryArray}
            type={"category"} />
        </p>
      </Popup> */}
      <div className={styles["main--container"]}>
        <div className={styles["filter--wrapper"]}>
          <Search inputType={type} placeHolder={`Search by ${menu}`} value={search} />
          {
            menu === "category" ?
              <DropDown heading={"Chose Category"} menu={categoryArray}
                type={"category"}
              /> : ""
          }
        </div>
        <div className={styles["filter--wrapper"]}>
          <div 
          // onClick={togglePopup}
          >
            <OpenPopupButton />
          </div>
          <DropDown heading={"Sort By"} menu={[
            "date",
            "category",
            "source",
            "keyword"
          ]}
            type={"sortby"}
          />
        </div>
      </div>
    </LayoutComponent>
  )
}

export default PreferenceComponent