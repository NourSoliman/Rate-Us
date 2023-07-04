import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStores } from "../../Redux/storesRedux/storeAction";
import { Col, Row ,Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './HighRated.css'
const HighRatedStores = () => {
  const dispatch = useDispatch();
  const { stores: fetchedStores , loading } = useSelector((state) => state.store);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllStores());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

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

  // Sort the stores based on Recommended and Solved Cases in descending order
  const sortedStores = fetchedStores.sort((a, b) => {
    const aTotal = a.Recommended + a.solvedCases;
    const bTotal = b.Recommended + b.solvedCases;
    return bTotal - aTotal;
  });

  // Get the top 6 stores
  const topStores = sortedStores.slice(0, 6);

  return (
    <div >
      <h2 className="famous-stores">High Rated Stores</h2>
      <Row className="store-grid">
        {topStores.map((store) => (
          <Col
            key={store._id}
            lg={2}
            md={6}
            className="store-card"
            data-aos="fade-up"
          >
            <NavLink to={`/stores/${store._id}`}>
              {store.picture && (
                <div className="store-image">
                  <img
                    src={store.picture}
                    alt={store.name}
                    className="store-picture"
                  />
                </div>
              )}
              <div className="store-details">
                <h3 className="store-name">{store.name}</h3>
              </div>
            </NavLink>
            <p className="store-desc">{store.description}</p>
            <div className="status-stores-container">
              <div className="reco-container">
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
    </div>
  );
};

export default HighRatedStores;
