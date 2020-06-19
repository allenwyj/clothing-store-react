import React from 'react';
import './MenuItem.scss';

const MenuItem = ({ title, imageUrl, size }) => {
  return (
    <div className={`${size} menu-item`}>
      <div
        // the reason why we have a new class for holding the background img, because we want to fix the img box 
        // when we hover the img, and the size remains the same. Not wrapping the context div is because we don't
        // want the background gets affect by the content box.
        // 
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
