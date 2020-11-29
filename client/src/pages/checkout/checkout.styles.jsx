import styled from 'styled-components';
import Delete from '@material-ui/icons/Delete';

export const CheckoutPageContainer = styled.div`
    width: 70vw;
    max-width: 800px;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    button {
      margin: 12px 0;
      // Overriting stripe button styles
      &[style], span[style] {
          background: black !important;
          box-shadow: unset !important;
          height: unset !important;
          line-height: unset !important;
          font-family: unset !important;
          font-weight: 600 !important; 
          border-radius: 28px !important;
          max-width: 290px !important;
          width: 90% !important;
          text-align: center !important;
          text-shadow: unset !important;
          padding: unset !important; 
      }

      span[style] {
        padding: 12px !important;
        width: 100% !important;
      }
      & :hover {
        &[style], span[style] {
          background: #2c2c2c !important;
        }
      }
    }

    @media screen and (max-width: 800px) {
        width: 85vw;
    }
`;

export const CheckoutHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const CheckoutHeader = styled.h1`
    width: 100%;
    padding: 10px 0;
    font-size: 24px;
    font-weight: 600;
    border-bottom: 1px solid #707070;
`;
export const DeleteButton = styled(Delete)`
  position: absolute;
  right: 0;
  cursor: pointer;

  & :hover {
    fill: rgb(196, 53, 53);
  }
`;

export const CheckoutTotal = styled.div`
    margin-top: 30px;
    margin-left: auto;
    font-size: 24px;
    font-weight: 500;
`;

export const TestWarning = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 18px;
    color: red;
`;  