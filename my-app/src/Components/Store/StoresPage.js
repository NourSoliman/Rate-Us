import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores } from '../../Redux/storesRedux/storeAction';

const StoresPage = () => {
    const dispatch = useDispatch();
    const [stores, setStores] = useState([]);
    const [searchQuery, setSearchQuery] = useState(``)
    const { stores: fetchedStores } = useSelector((state) => state.store);

    useEffect(() => {
        dispatch(fetchAllStores());
    }, [dispatch]);

    useEffect(() => {
        if (fetchedStores) {
            setStores(fetchedStores);
        }
    }, [fetchedStores]);
    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }
    const filteredStores = stores.filter((store) => {
        return store.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
    return (
        <div>
            <h1>Stores</h1>
            <input type="text" placeholder='Search' value={searchQuery} onChange={handleSearch}></input>
            {filteredStores.map((store) => (
                <div key={store._id}>
                    <NavLink to={`/stores/${store._id}`}>
                        {store.picture && <img src={store.picture} alt={store.name} />}
                    </NavLink>
                    <h3>{store.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default StoresPage;
