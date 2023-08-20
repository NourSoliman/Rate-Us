import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import voice1 from '../Images/voice1.png'
import voice0 from '../Images/voice0.png'
// import voice2 from '../Images/voice2.png'
import './Banners.css'
const BannerSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    fade:true,
  };

  return (
    <Slider {...settings} className='banner-container'>
      <div >
        <img src={voice0} alt="Banner 1" className="banner-images"/>
      </div>
      {/* <div>
        <img src={voice2} alt="Banner 2" className="banner-images"/>
      </div> */}
      <div>
        <img src={voice1} alt="Banner 3" className="banner-images"/>
      </div>

    </Slider>
  );
};

export default BannerSlider;
