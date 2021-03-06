import styled from 'styled-components';

export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-image: url(${props => props.imageUrl});
`;

export const MenuItemContent = styled.div`
    height: 120px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    opacity: 0.7;
    position: absolute;

    @media screen and (max-width: 375px) {
        padding: 0 10px;
    }

    @media screen and (max-width: 425px) {
       width: 60%;
       height: 20%;
       max-height: 120px;
    }

    @media screen and (max-width: 800px) {
       height: 90;
    }
`;

export const MenuItemContainer = styled.div`
    min-width: 30%;
    height: ${props => props.size === 'large' ? "380px" : "240px"};
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;

    &:hover {
        cursor: pointer;

        & ${BackgroundImage} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }

        & ${MenuItemContent} {
            opacity: 0.9;
        }
    }

    &:first-child {
        margin-right: 7.5px;
    }

    &:last-child {
        margin-left: 7.5px;
    }

    @media screen and (max-width: 800px) {
        height: 200px;
    }

    @media screen and (max-width: 425px) {
        height: 30vh;
        min-height: 200px;
        max-height: 250px;
        width: 100%;
    }
`;

export const MenuItemTitle = styled.h1`
    font-weight: bold;
    margin-bottom: 6px;
    font-size: 22px;
    color: #4a4a4a;
`;

export const MenuItemSubtitle = styled.span`
  font-weight: 500;
  font-size: 16px;
`;
