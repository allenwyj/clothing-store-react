import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/DirectorySelector';
import MenuItem from '../menu-item/MenuItem';

import { DirectoryMenuContainer } from './DirectoryStyles';
//import './Directory.scss';

const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    {
      // destructuring each section and passing them into MenuItem
      sections.map(({ id, ...otherSectionProps }) => (
        // desturcturing and pass the rest fields of section, and use the same name as the field name.
        <MenuItem key={id} {...otherSectionProps} />
      ))
    }
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
