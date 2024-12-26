import  { useEffect } from 'react';
import styles from "./NewsComponent.module.css"
import CardUI from '../../ui/CardUI/CardUI';
import LayoutComponent from '../LayoutComponent/LayoutComponent';
import { useGetArticlesQuery, useGetCategoriesQuery } from '../../redux/api/newsApi';
import { setData, setCategoryArray } from '../../redux/features/preferenceSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store'



const NewsComponent = () => {
    const dispatch = useDispatch();
    const keyword = useSelector((state: RootState) => state.preference.search);
    const menu = useSelector((state: RootState) => state.preference.menu);
    const category = useSelector((state: RootState)=> state.preference.dropdownType);
    const popup = useSelector((state: RootState) => state.preference.popup);
    

    // Fetch news data from API using RTK Query
    const { data, error, isLoading } = useGetArticlesQuery({
        keyword: menu==="category"? category : keyword,
        page: 1,
        type: menu
    });


    // Fetch categories conditionally based on menu type
    const shouldFetchCategories = menu === 'category' || popup === true; // Add your condition here
    const { data: categoryData} = useGetCategoriesQuery(
        { keyword },
        { skip: !shouldFetchCategories } // Skip the query if condition is false
    );

    // Dispatch fetched categories to Redux (if necessary)
    useEffect(() => {
        if (categoryData) {
            const catArray = Object.keys(categoryData).map((ele:any)=>{
                return categoryData[ele]["uri"];
            })
            dispatch(setCategoryArray(catArray))
        }
    }, [categoryData]);

    // Access the Redux data state
    const reduxData = useSelector((state: RootState) => state.preference.data);

    // Dispatch data to Redux store when new data is fetched
    useEffect(() => {
        if (data) {
            // @ts-ignore
            dispatch(setData(data));  // Dispatch fetched data to Redux
        }
    }, [data, dispatch, keyword, category]);




    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle error state
    if (error) {
        console.log(error);
        return <div>Error fetching news.</div>;
    }

    // console.log("reduxData", reduxData);

    return (
        <LayoutComponent>

            <div className={styles["main--container"]}>
                {
                    reduxData.length ? reduxData.map((ele, key) => (
                        <CardUI key={key} data={ele} />
                    )) : ""
                }
            </div>
        </LayoutComponent>
    )
}

export default NewsComponent