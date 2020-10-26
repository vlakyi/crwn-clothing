import styled from 'styled-components';
import { Link } from 'react-router-dom'
export const PreviewCollectionComponent = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    @media screen and (max-width: 800px) {
        align-items: center;
    }
`;

export const TitleLink = styled(Link)`
    font-size: 28px;
    margin-bottom: 25px;
`;

export const Preview = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 800px) {
        justify-content: space-around;
        flex-wrap: wrap;
    }
`;