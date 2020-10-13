import React from 'react';
import MenuItem from '../menu-item/menu-item.component';

import { connect } from 'react-redux';
import { selectDirecorySections } from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect';

import { DirectoryMenu } from './directory.styles';

const Directory = ({ sections }) => (
    <DirectoryMenu>
        {
            sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem key={id} {...otherSectionProps} />
            ))
        }
    </DirectoryMenu>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirecorySections
});

export default connect(mapStateToProps)(Directory);
