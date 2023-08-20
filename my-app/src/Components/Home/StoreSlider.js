import React, { useEffect  } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { fetchAllStores } from '../../Redux/storesRedux/storeAction';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './StoreSlider.css'
import AOS from 'aos'
const StoreSlider = () => {
  const dispatch = useDispatch();
  const { stores: fetchedStores, loading } = useSelector((state) => state.store);
  useEffect(() => {
    dispatch(fetchAllStores());
  }, [dispatch]);

  useEffect(()=>{
    AOS.init({
      duration:800,
      easing:`ease-out`,
    })
  },[])
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear', 
    centerMode: true, 
    centerPadding: '300px',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          centerPadding:`20%`,

        },
      },
      {
        breakpoint: 1024, // Add your tablet breakpoint width here
        settings: {
          slidesToShow: 2, // Adjust the number of slides to show on tablets
          slidesToScroll: 1,
          adaptiveHeight: true,
          centerPadding: `15%`, 
        },
      },
      {
        breakpoint: 1440, 
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 1,
          adaptiveHeight: true,
          centerPadding: '10%', 
        },
      },
    ],
  };



  return (
    <div style={{ overflowX: 'hidden' }}>
      <Slider {...settings}>
        {fetchedStores && fetchedStores.map((store) => (
          <div key={store._id} style={{ margin: '0 5px' }} className="slider-images-container"
          >
            <NavLink to={`/stores/${store._id}`} >
              <img src={store.picture} alt={store.name}  className="slider-images"/>
            </NavLink>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default StoreSlider;
