import React from 'react';
import {withRouter} from 'react-router-dom';

import {MenuItemContainer, BackgroundImage, MenuItemContent, MenuItemTitle, MenuItemSubtitle} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
    <MenuItemContainer size={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <BackgroundImage imageUrl = {imageUrl}
        />
        <MenuItemContent>
            <MenuItemTitle>{title.toUpperCase()}</MenuItemTitle>
            <MenuItemSubtitle>SHOP NOW</MenuItemSubtitle>
        </MenuItemContent>
    </MenuItemContainer>
);

// Adding MenuItem access to router's properties
export default withRouter(MenuItem);