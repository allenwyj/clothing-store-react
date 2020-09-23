import React from 'react';

import { withRouter } from 'react-router-dom';

//import './MenuItem.scss';
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './MenuItemStyles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    // navigate to new page /somematchedURL/linkURL
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer
        // the reason why we have a new class for holding the background img, because we want to fix the img box
        // when we hover the img, and the size remains the same. Not wrapping the context div is because we don't
        // want the background gets affect by the content box.
        //
        className="background-image"
        imageUrl={imageUrl}
      />
      <ContentContainer className="content">
        <ContentTitle>{title.toUpperCase()}</ContentTitle>
        <ContentSubtitle>SHOP NOW</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

// by using withRouter, now we can access the history, location, match props
// which App passes into HomePage in the Route.
export default withRouter(MenuItem);
