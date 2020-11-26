import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    position: relative;
    z-index: 90;

    .mobile__menu__options--open {
        transform: translateX(0px);
    }

    .mobile__menu__hamburger--open {
        transform-origin: center;
        width: 31px;
        justify-content: center;
        
        & div:first-of-type, & div:last-of-type {
            width: 32px;
        }

        & div:first-of-type {
            transform: translateY(4px) rotate(135deg);
        }

        & div:nth-of-type(2) {
            transform: translateX(-50vw);
            width: 24px;
        }

        & div:last-of-type {
            transform: translateY(-4px) rotate(45deg);
        }
    }

    @media screen and (max-width: 800px) {
        height: 60px;
        padding: 0 30px;
        margin-bottom: 20px;
    }
`;

export const OptionsContainer = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    max-width: 800px;
    padding: 30px;
    padding-top: 130px;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    z-index: 95;
    background: white;
    transform: translateX(-100vw);
    transition: all 0.5s;
    box-shadow: 8px 0px 13px 0px rgba(0,0,0,0.16);

    @media screen and (orientation: portrait) and (max-width: 800px), (orientation: landscape) and (max-height: 800px) {
        overflow-y: scroll; 
        box-shadow: unset;
        padding-top: 100px;
    }
`;

export const MainLinks = styled.div`
    display: flex;
    flex-direction: column;
`;

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    margin-bottom: 32px;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;

    @media screen and (max-height: 760px), (max-width: 360px) {
        font-size: 20px;
        margin-bottom: 26px;
    }

    @media screen and (max-height: 570px), (max-width: 320px) {
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

export const OptionLinkRight = styled(OptionLink)`
    align-self: flex-end;
    margin-bottom: unset;
    padding-bottom: 12px;
`

export const HamburgerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 36px;
    height: 24px;
    z-index: 100;
    position: fixed;
    top: 30px;
    left: 40px;
    cursor: pointer;

    & div {
        transition: all 0.5s;
        border: 2px solid black;
        border-radius: 5px;
    }

    & div:nth-of-type(2) {
        width: 24px;
    }

`;