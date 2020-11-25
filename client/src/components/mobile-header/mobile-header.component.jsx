import React, { useEffect, useRef } from 'react';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import UserActionTypes from '../../redux/user/user.types';

// Reselect
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

//Styled component
import { HeaderContainer, MainNavigation, OptionsContainer, MainLinks, OptionLink, OptionLinkRight, HamburgerContainer } from './mobile-header.styles';

const MobileHeader = () => {
    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();

    const hamburgerRef = useRef();
    const optionsRef = useRef();

    const toggleHamburger = () => {
        hamburgerRef.current.classList.toggle('mobile__menu__hamburger--open');
        optionsRef.current.classList.toggle('mobile__menu__options--open');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target) && optionsRef.current.classList.contains('mobile__menu__options--open'))
                toggleHamburger();
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [optionsRef]);

    return (
        <HeaderContainer>
            <MainNavigation>
                <HamburgerContainer ref={hamburgerRef} onClick={toggleHamburger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </HamburgerContainer>
                <CartIcon />
                {hidden ? null : <CartDropdown />}
            </MainNavigation>

            <OptionsContainer ref={optionsRef}>
                <MainLinks>
                    <OptionLink to='/shop/hats' onClick={toggleHamburger}>HATS</OptionLink>
                    <OptionLink to='/shop/jackets' onClick={toggleHamburger}>JACKETS</OptionLink>
                    <OptionLink to='/shop/sneakers' onClick={toggleHamburger}>SNEAKERS</OptionLink>
                    <OptionLink to='/shop/womens' onClick={toggleHamburger}>WOMENS</OptionLink>
                    <OptionLink to='/shop/mens' onClick={toggleHamburger}>MENS</OptionLink>
                    <OptionLink to='/' onClick={toggleHamburger}>HOME</OptionLink>
                    <OptionLink to='/contact' onClick={toggleHamburger}>CONTACT</OptionLink>
                </MainLinks>

                {
                    currentUser ?
                        <OptionLinkRight as='div' onClick={() => { dispatch({ type: UserActionTypes.SIGN_OUT_START }); toggleHamburger() }}>SING OUT</OptionLinkRight>
                        :
                        <OptionLinkRight to="/signin" onClick={toggleHamburger}>SING IN</OptionLinkRight>
                }
            </OptionsContainer>
        </HeaderContainer>
    )
};

export default MobileHeader;