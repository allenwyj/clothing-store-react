import React from 'react';

import { withRouter } from 'react-router-dom';

import './MenuItem.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    // navigate to new page /somematchedURL/linkURL
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
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

// by using withRouter, now we can access the history, location, match props
// which App passes into HomePage in the Route.
export default withRouter(MenuItem);
