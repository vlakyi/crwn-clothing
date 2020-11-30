import styled, { css } from 'styled-components';
import Delete from '@material-ui/icons/Delete';

const defaultWidth = css`
  width: 23%;
`;

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 30vw;
  min-width: 110px;
  min-height: 120px;
  max-width: 300px;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
`;

export const CheckoutInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height || 'auto'};
`;

export const CheckoutInfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;

  @media screen and (min-width: 360px) {
    font-size: 18px;
  }

  @media screen and (min-width: 400px) {
    font-size: 20px;
  }

  @media screen and (min-width: 400px) {
    font-size: 22px;
  }
`;

export const Name = styled.h4`
  margin: 0px;
  margin-bottom: 12px;
  font-weight: 600;
`;

export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  height: 100px;
  margin-left: 15px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  padding: 5px;
  border-radius: 32px;
  font-size: 16px;
  font-weight: 600;

  & :first-child,
  :last-child {
    cursor: pointer;
  }

  & svg {
    color: #9e9d9d;
  }

  @media screen and (min-width: 768px) {
    font-size: 18px;
    height: 125px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 22px;
    height: 150px;

    & svg {
      font-size: 36px;
    }
  }
`;

export const Quantity = styled.input`
  margin: 0 auto;
  width: 30px;
  font-family: inherit;
  font-weight: inherit;
  font-size: 18px;
  text-align: center;
  border: none;

  :focus {
    outline: none;
  }

  // Removing arrows inside input
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  // Firefox
  -moz-appearance: textfield;
`;

export const Price = styled.span`
  ${defaultWidth};
`;

export const RemoveButton = styled(Delete)`
  cursor: pointer;
  position: absolute;
  bottom: 15px;
  margin-left: -5px;

  & :hover {
    fill: rgb(196, 53, 53);
  }
`;
