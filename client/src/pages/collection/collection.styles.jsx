import styled from 'styled-components';

export const CollectionPageContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;

  & > div {
    margin-bottom: 30px;
  }

  @media screen and (min-width: 1800px) {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }

  @media screen and (max-width:1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width:800px) {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

export const CollectionHeader = styled.h2`
    font-size: 38px;
    margin: 0 auto 30px;
`;