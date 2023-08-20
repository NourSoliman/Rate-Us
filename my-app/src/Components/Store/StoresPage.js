import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores } from '../../Redux/storesRedux/storeAction';
import Footer from '../Footer/Footer';
import { Col, Row  , Container } from 'react-bootstrap';
import './FilterStores.css'
import './media.css'
import AOS from 'aos'
import { fetchStoreTypes } from '../../Redux/storesRedux/storeAction';
import { Bars } from  'react-loader-spinner'

const StoresPage = () => {
    const dispatch = useDispatch();
    const [stores, setStores] = useState([]);
    const [selectedTypes , setSelectedTypes] = useState(``)
    const [searchQuery, setSearchQuery] = useState(``)
    const { stores: fetchedStores } = useSelector((state) => state.store);
    const isLoading = useSelector((state)=>state.store.isLoading)
    useEffect(() => {
        dispatch(fetchAllStores());
    }, [dispatch]);

    useEffect(() => {
        if (fetchedStores) {
            setStores(fetchedStores);
        }
    }, [fetchedStores]);

    useEffect(()=>{
        AOS.init({
          duration:800,
          easing:`ease-out`,
        })
      },[])

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }
    const filteredStores = stores.filter((store) => {
        return store.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
    const handleFilterByType = (sellingType) => {
      dispatch(fetchStoreTypes(sellingType))
      setSelectedTypes(sellingType)
    }

    if (isLoading) {
      return (
        <div className="loading-spinner">
        <Bars
          color="#18122B"
          height="80"
          width="80"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
          <h2 className="loading">Loading...</h2>
        </div>
      );
    }
    return (
        <div className='wrapper'>
          <Container>
            {/* <NavBar /> */}
            <div className='filter-option-container'>
            <select onChange={(e) => handleFilterByType(e.target.value)} value={selectedTypes}>
            <option value="" disabled>
            Filter
          </option> 
              <option
              value="Clothes"
              >
              Clothes
              </option>
              <option
              value="Socks"
              >
              Socks
              </option>
              <option
              value="Furniture"
              >
              Furniture
              </option>
            </select>
            </div>
            <Row className="store-row">
            {/* <StoresTypes /> */}
            <Col className="search-bar-container" lg={12}>
            <input type="text" placeholder='Search' value={searchQuery} onChange={handleSearch} className="search-bar"></input>
            </Col>
            <Row className="filtered-stores-div">
            {filteredStores.map((store) => (
            <Col key={store._id} lg={4}  md={6} className="store-card" data-aos='fade-up'>
            <NavLink to={`/stores/${store._id}`}>
            {store.picture && (
            <div className="store-image">
              <img src={store.picture} alt={store.name} className="store-picture" />
            </div>
          )}
          <div className="store-details">
            <h3 className="store-name">{store.name}</h3>
          </div>
        </NavLink>
            <p className="store-desc">{store.description}</p>
            <div className='status-stores-container'>
              <div className='reco-container'>
              <p className="status-numbers-stores">{store.Recommended}</p>
                <span className="status-tag-stores">Recommended</span>
              </div>
              <div>
                <p className="status-numbers-stores">{store.solvedCases}</p>
                <span className="status-tag-stores">SolvedCases</span>
              </div>
              <div className="notreco-container">
              <p className="status-numbers-stores">{store.NotRecommended}</p>
                <span className="status-tag-stores">NotRecommended</span>
              </div>
            </div>
      </Col>
            ))}
            </Row>
        </Row>
        </Container>
        </div>
    );
};

export default StoresPage;
