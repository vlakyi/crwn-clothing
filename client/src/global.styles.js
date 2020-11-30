import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Montserrat';
        padding: 20px 40px;

        &::-webkit-scrollbar {
            width: 10px;
        }
    
        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0 ,0.2);
            border-radius: 10px;
        }

        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }
`;