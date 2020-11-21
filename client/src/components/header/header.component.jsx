import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import UserActionTypes from '../../redux/user/user.types';

// Reselect
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

//Styled component
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();

    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className='logo' title="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink to='/contact'>CONTACT</OptionLink>
                {
                    currentUser ?
                        <OptionLink as='div' onClick={() => dispatch({ type: UserActionTypes.SIGN_OUT_START })}>SING OUT</OptionLink>
                        :
                        <OptionLink to="/signin">SING IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {hidden ? null : <CartDropdown />}
        </HeaderContainer>
    )
};

export default Header;