import React from 'react'
import { useSelector } from 'react-redux';
import storeBanner from '../Images/banner.jpg'
const StoreDetails = () => {
  const Store = useSelector((state) => state.store.store)
  const renderPicture = () => {
    if (Store && Store.picture) {
      return <img src={Store.picture} alt="Store" className='storeMainPicture'/>;
    } else {
      return <p>No Picture</p>;
    }
  };



  return (
    <div className='storeDetailsContainer'>
      {Store ? (
        <div className='storeContentContainer'>
          <div className='storeBannerContainer'>
            <img src={storeBanner} alt="banner" className='storeBanner' />
          <div className='mainPic-container'>
            {renderPicture()}
            </div>
            </div>
            <div className='storeInfoContainer'>
              <div>
              <h1 className='storeName'>{Store.name}</h1>
                </div>
              <p className='storeDesc'>{Store.description}</p>
            </div>
            </div>
      ) : (
        <p>No Stores to Show</p>
      )}
    </div>
  );
};

export default StoreDetails