import styled from 'styled-components';
import { ReactComponent as Icon } from '../../assets/shopping-bag.svg';

export const CartIconContainer = styled.div`
    width: 36px;
    height: 36px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ShoppingIcon = styled(Icon)`
    width: 32px;
    height: 32px;
`;

export const ItemCount = styled.span`
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    bottom: 5px;
`;