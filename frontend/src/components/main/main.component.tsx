import React, {useEffect} from 'react';
import {useAppDispatch} from "../../hooks/store.hook";
import {fetchTestArr} from "../../store/test/test.thunk";
import {useSelector} from "react-redux";
import {selectTestArr} from "../../store/test/test.selector";

const Main = () => {

    const dispatch = useAppDispatch()
    const testArr = useSelector(selectTestArr)

    useEffect(() => {
        dispatch(fetchTestArr())
    }, [dispatch]);


    return (
        <div>
            Main Component

            {!!testArr && !!testArr.length && (
                <ul>
                    {testArr.map((item, index) => (
                        <li key={`${item}_${index}`}>
                            {item}
                        </li>
                    ))
                    }
                </ul>
            )}
        </div>
    );
};

export default Main;