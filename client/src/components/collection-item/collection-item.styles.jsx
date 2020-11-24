import styled from 'styled-components';
import { ReactComponent as AddToCartIcon } from '../../assets/add-to-cart.svg';

export const CollectionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22vw;
  max-width: 300px;
  min-width: 250px;
  align-items: center;
  position: relative;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 16px;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }

  @media screen and (max-width: 800px) {
      width: 40vw;
      margin-bottom: 20px;
    }

  @media screen and (max-width: 425px) {
      width: 80vw;
      margin-bottom: 20px;
    }
`;

export const AddButton = styled(AddToCartIcon)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  circle {
    opacity: 0.7;
  }
    
  :hover {
    circle {
      fill: #36393d;
      opacity: 1;
    }

    path {
      fill: white;
    }
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 20rem;
  max-height: 300px;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  border-radius: 16px 16px 0 0;
`;

export const CollectionFooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-size: 16px;
`;

export const NameContainer = styled.span`
  margin-bottom: 1em;
  font-size: 1.125em;
  font-weight: 600;
`;

export const PriceContainer = styled.span`
  font-weight: 500;
  font-size: 1.125em;
`;