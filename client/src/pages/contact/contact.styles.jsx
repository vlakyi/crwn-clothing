import styled, { keyframes } from 'styled-components';
import { inputStyles } from '../../components/form-input/form-input.styles';

const mainHeader = '#4285f4';

export const GroupContainer = styled.div`
    position: relative;
    margin-top: 0px;
    margin-bottom: 40px;
    grid-area: message;
    
    input[type='password'] {
        letter-spacing: 0.3em;
    }
    `;

export const ContactContainer = styled.div`
    font-size: 16px;
    box-sizing: content-box;
    width: 80%;
    max-width: 1200px;
    padding: 35px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: center;
    justify-content: center;
    
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
    
    @media screen and (max-width: 1000px) {
        font-size: 10px;
    }
    
    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr;
    }
    
    @media screen and (max-width: 425px) {
        font-size: 8px;
    }
    `;

export const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 32px;
    grid-template-areas:
    "name email"
    "message message";
    
    @media screen and (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-template-areas: 
        "name"
        "email"
        "message";
        
        & div {
            margin: 35px 0;
        }
    }
`;

export const StyledTextArea = styled.textarea`
    ${inputStyles};
    resize: none;
    width: 100%;
    margin-top: 0px;
    `;

export const StyledHeader = styled.h1`
    font-size: 3em;
    margin: 0;
    color: ${props => props.main ? mainHeader : ''};
    `;

// icon

const rotate = keyframes`
    0% {
        transform: rotateX(180deg);
    }
    
    50% {
        transform: rotateX(0deg);
    }
    
    100% {
        transform: rotateX(180deg);
    }
`;

const fadein = keyframes`
    0% {
        transform: translateX(-1000px);
    }
    
    100% {
        transform: translateX(0px);
    }
`;

export const IconContainer = styled.div`
    justify-self: center;
    align-self: center;
    transform: translateX(-1000px);
    animation: ${fadein} 1s forwards;
    
    @media screen and (max-width: 767px) {
        display: none;
    }
    `;

export const ArrowUp = styled.div`
    position: relative;
    width: 0; 
    height: 0; 
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 60px solid ${mainHeader};
    transform-origin: bottom;
    transform: rotateX(180deg);
    animation: ${rotate} 2s 1s forwards;
`;

export const InnerArrowUp = styled.div`
    position: absolute;
    top: 3px;
    transform: translate(-50%);
    width: 0; 
    height: 0; 
    border-left: 55px solid transparent;
    border-right: 55px solid transparent;
    border-bottom: 55px solid white;
`;

export const Box = styled.div`
    width: 120px;
    height: 80px;
    border: 2px solid ${mainHeader};
    border-top: 0px;
    background: transparent;
`;