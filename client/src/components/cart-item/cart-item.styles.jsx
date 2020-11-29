import styled from 'styled-components';

export const CartItemContainer = styled.div`
    width: 100%;
    display: flex;
    height: 80px;
    margin-bottom: 15px;
    min-width: 150px;

    img {
      width: 30%;
    }
`;

export const ItemDetails = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 20px;
`;

export const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Price = styled.span`
  font-size: 14px;
  font-weight: 500;
`;