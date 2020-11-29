import styled from 'styled-components';

export const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 80px;
    max-width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 800px) {
        padding: 0 10px;
    }

    @media screen and (max-width: 1920px) {
        max-width: 80%;
    }

    @media screen and (max-width: 1024px) {
        max-width: 100%;
    }
`;