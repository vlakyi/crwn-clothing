import React, { useEffect, useRef } from 'react';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import UserActionTypes from '../../redux/user/user.types';
import CartActionTypes from '../../redux/cart/cart.types';

// Reselect
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

//Styled component
import { HeaderContainer, OptionsContainer, MainLinks, OptionLink, OptionLinkRight, HamburgerContainer } from './mobile-header.styles';

const MobileHeader = () => {
    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();

    const hamburgerRef = useRef();
    const optionsRef = useRef();
    const cartDropdownRef = useRef();

    const toggleHamburger = () => {
        hamburgerRef.current.classList.toggle('mobile__menu__hamburger--open');
        optionsRef.current.classList.toggle('mobile__menu__options--open');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target) && optionsRef.current.classList.contains('mobile__menu__options--open'))
                toggleHamburger();

            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target) && !hidden)
                dispatch({ type: CartActionTypes.TOGGLE_CART_HIDDEN });
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [optionsRef, dispatch, hidden]);

    return (
        <HeaderContainer>
            <HamburgerContainer ref={hamburgerRef} onClick={toggleHamburger}>
                <div></div>
                <div></div>
                <div></div>
            </HamburgerContainer>
            <CartIcon style={{ position: 'fixed', top: '30px', right: '40px' }} />
            {hidden ? null : <CartDropdown ref={cartDropdownRef} />}

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