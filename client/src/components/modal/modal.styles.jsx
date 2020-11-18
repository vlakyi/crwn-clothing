import styled, { css, keyframes } from 'styled-components';

const centeredFlexbox = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const fadeIn = keyframes`
    from {
        transform: translateY(-100vh);
    }

    to {
        transform: translateY(0);
    }
`;

const grow = keyframes`
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
`;

export const Overlay = styled.div`
    ${centeredFlexbox};
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
`;

export const ModalContainer = styled.div`
    width: 80%;
    max-width: 560px;
    background: white;
    ${centeredFlexbox};
    flex-direction: column;
    padding: 30px;
    font-size: 16px;
    position: relative;
    text-align: center;
    animation: ${fadeIn} 0.75s;


    & svg {
        width: 5em;
        height: 5em;
        position: absolute;
        top: -2.5em;
        transform: translateY(-100vh);
        animation: ${fadeIn} 0.75s 0.75s forwards, ${grow} 1s 1.5s;
    }

    & button {
        font-size: 1.25em;
    }
    
    @media screen and (max-width: 768px) {
        font-size: 14px;
    }

    @media screen and (max-width: 425px) {
        font-size: 10px;
        width: 90%;

        & button {
            line-height: 3em;
            height: 3em;
            min-width: 8em;
        }

        & svg {
            width: 6em;
            height: 6em;
            top: -3em;
        }
    }
`;

export const ModalHeader = styled.h1`
    margin: 0px;
    margin-top: 0.5em;
    font-size: 3em;

    @media screen and (max-width: 370px) {
        font-size: 2.5em;
    }
`;

export const ModalText = styled.p`
  font-size: 1.5em;
`;