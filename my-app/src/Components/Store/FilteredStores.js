import React, { useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { Col, Row , Spinner } from 'react-bootstrap';
import { fetchStoreTypes } from '../../Redux/storesRedux/storeAction';
import './FilterStores.css';
import './media.css'
import NavBar from '../Home/NavBar'
import AOS from 'aos'
import Footer from '../Home/Footer';
const FilteredStores = () => {
  const dispatch = useDispatch();
  const { sellingTypes } = useParams();
  const { stores } = useSelector((state) => state.store);
  const loading = useSelector((state)=>state.store.loading)
  useEffect(() => {
    dispatch(fetchStoreTypes(sellingTypes));
  }, [dispatch, sellingTypes]);

  useEffect(()=>{
    AOS.init({
      duration:800,
      easing:`ease-out`,
    })
  },[])
  // if (!stores || stores.length === 0) {
  //   return <div>No stores found for {sellingTypes}</div>;
  // }
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
    <div className='filter-stores-main-div'>
      <NavBar />
    <Row className="store-row">
      <h2 className='comments-header'>Stores selling {sellingTypes}</h2>
      <div className='filtered-stores-container' data-aos='fade-up'>
      {stores.map((store) => (
        <Col key={store._id} lg={2.6}  md={6} className="store-card">
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
              <div className='status-stores-container' >
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
      <Footer />
    </Row>
    </div>
  );
};

export default FilteredStores;
