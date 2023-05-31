import React  from 'react'
import {  useSelector } from 'react-redux';
const StoreDetails = () => {
    const Store = useSelector((state) => state.store.store)
    const renderPicture = () => {
      if (Store && Store.picture) {
        return <img src={Store.picture} alt="Store" />;
      } else {
        return <p>No Picture</p>;
      }
    };
    
    
    
  return (
    <div>
        {Store ? (
            <div>
        <h1>{Store.name}</h1>
        {renderPicture()}
        <p>Description: {Store.description}</p>
        <p>{Store.name} Recommended by {Store.Recommended} People</p>
        <p>{Store.name} Not Recommended by {Store.NotRecommended} People</p>
        <p>{Store.name} Solved  {Store.solvedCases} Cases</p>
        </div>
        ) : (<p>No Stores to Show</p>
        )}
    </div>
  )
}

export default StoreDetails