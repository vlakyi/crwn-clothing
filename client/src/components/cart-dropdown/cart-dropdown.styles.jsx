import styled from 'styled-components';


export const CartDropdownContainer = styled.div`
        position: fixed;
        width: 240px;
        height: 340px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border: 1px solid black;
        background-color: white;
        top: 90px;
        right: 40px;
        z-index: 5;
        scrollbar-width: 2px;
        font-size: 13px;
        
        button {
            margin-top: auto;
        }
`;

export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: 2px;

    &::-webkit-scrollbar {
        width: 6px;
        padding: 0 3px;
      }
    
      &::-webkit-scrollbar-track {
          background: transparent;
      }
      &::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0 ,0.2);
      }
`;

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`;