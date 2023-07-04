import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchStoreTypes } from '../../Redux/storesRedux/storeAction'
const StoresTypes = () => {
    const dispatch = useDispatch()

    const handleFilterBySellingTypes = (sellingTypes) => {
        dispatch(fetchStoreTypes(sellingTypes));
    };

    return (
        <div>
            <NavLink to="#" onClick={() => handleFilterBySellingTypes(`Clothes`)}>Clothes</NavLink>
            <NavLink to="#" onClick={() => handleFilterBySellingTypes(`Shorts`)}>Shorts</NavLink>
            <NavLink to="#" onClick={() => handleFilterBySellingTypes(`Books`)}>Books</NavLink>
            <NavLink></NavLink>
            <NavLink></NavLink>
        </div>
    )
}

export default StoresTypes