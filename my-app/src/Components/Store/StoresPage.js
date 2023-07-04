import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStores } from '../../Redux/storesRedux/storeAction';
import Footer from '../Home/Footer';
import { Col, Row , Spinner } from 'react-bootstrap';
import './FilterStores.css'
import './media.css'
import NavBar from '../Home/NavBar';
import AOS from 'aos'
const StoresPage = () => {
    const dispatch = useDispatch();
    const [stores, setStores] = useState([]);
    const [searchQuery, setSearchQuery] = useState(``)
    const { stores: fetchedStores } = useSelector((state) => state.store);
    const loading = useSelector((state)=>state.store.loading)
    console.log(stores);
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
    if (loading) {
      return (
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <h2 className='loading'>Loading...</h2>
        </div>
      );
    }
    return (
        <div className='wrapper'>
            <NavBar />
            <Row className="store-row">
            {/* <StoresTypes /> */}
            <Col className="search-bar-container" lg={12}>
            <input type="text" placeholder='Search' value={searchQuery} onChange={handleSearch} className="search-bar"></input>
            </Col>
            <div className="filtered-stores-div">
            {filteredStores.map((store) => (
            <Col key={store._id} lg={2}  md={6} className="store-card" data-aos='fade-up'>
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
            </div>
        </Row>
        <Footer />
        </div>
    );
};

export default StoresPage;
