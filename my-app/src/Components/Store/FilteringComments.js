import React, { useState, useEffect } from 'react'
import { fetchStore } from '../../Redux/storesRedux/storeAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AOS from "aos";
import { Spinner } from 'react-bootstrap';
const FilteringComments = () => {
    const { storeId } = useParams();
    const dispatch = useDispatch()
    const [filterStatus, setFilterStatus] = useState('');
    const loading = useSelector((state)=>state.store.loading)
    useEffect(() => {
        dispatch(fetchStore(storeId, filterStatus));
    }, [dispatch, storeId, filterStatus]);
    //Filtering comments 
    const handleFilterStatus = (status) => {
        setFilterStatus(status);
    };
    useEffect(() => {
        AOS.init({ duration: 800, offset: 200 });
      }, []);
    
      if (loading) {
        return (
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
            <h2>Loading...</h2>
          </div>
        );
      }
    return (
        <div className='filter-comments' >
            <ul className='filter-ul' data-aos="zoom-in" data-aos-anchor-placement="top-bottom">
                <li>
                    <button onClick={() => handleFilterStatus(``)}>All-Comments</button>
                </li>
                <li>
                    <button onClick={() => handleFilterStatus(`NotRecommended`)}>NotRecommended</button>
                </li>
                <li>
                    <button onClick={() => handleFilterStatus(`Recommended`)}>Recommended</button>
                </li>
                <li>
                    <button onClick={() => handleFilterStatus(`Solved-Case`)}>Solved-Cases</button>
                </li>
            </ul>
        </div>
    )
}

export default FilteringComments