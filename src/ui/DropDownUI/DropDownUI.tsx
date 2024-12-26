import React, { useState } from 'react';
import styles from './DropDownUI.module.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store'
import { setMenu, setSearch, setDropdown } from "../../redux/features/preferenceSlice"

type Props = {
    heading: string;
    menu: string[];
    type: string;
};

const DropDown: React.FC<Props> = ({
    heading,
    menu,
    type
}: Props) => {
    const [showMenu, setShowMenu] = useState(false);

    const selectedMenu = useSelector((state: RootState) => state.preference.menu);
    const selectCategory = useSelector((state: RootState) => state.preference.dropdownType)

    const dispatch = useDispatch()

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    const selectMenu = (menu: string) => {
        if(type==="sortby"){

            dispatch(setMenu(menu));
            dispatch(setSearch(""));
            dispatch(setDropdown(""))
        }else{
            dispatch(setDropdown(menu))
        }
    }

    return (
        <div onClick={handleClick} className={styles['dropdown--container']}>
            <div  className={styles['--heading']}>
                {
                    (type === "sortby" && selectedMenu.length)?
                    selectedMenu : (type === "category" && selectCategory.length )?
                    selectCategory.split("/")[selectCategory.split("/").length-1] : heading
                }
            </div>
            {showMenu && (
                <div className={styles['--body']}>
                    {menu?.map((ele, i) => (
                        <p onClick={() => { selectMenu(ele) }} key={i}>{
                            type === "category" ?
                            
                            ele.split("/")[ele.split("/").length-1]
                            
                            :ele
                            }</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;