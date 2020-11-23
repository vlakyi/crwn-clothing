import styled from 'styled-components';

export const CheckoutPageContainer = styled.div`
    width: 55%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-top: 100px;

    button {
      margin-left: auto;
      margin-top: 50px;
    }

    @media screen and (max-width: 800px) {
        width: 85vw;
        margin: 0 auto;
    }
`;

export const CheckoutHeader = styled.header`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
`;

export const CheckoutHeaderBlock = styled.div`
    text-transform: capitalize;
`;

export const CheckoutTotal = styled.div`
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
`;

export const TestWarning = styled.div`
    text-align: center;
    margin-top: 40px;
    font-size: 24px;
    color: red;
`;  