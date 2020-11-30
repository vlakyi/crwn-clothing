import CartActionTypes from './cart.types';

const { ADD_ITEM, REMOVE_ITEM, SET_ITEM_QUANTITY } = CartActionTypes;

export const setItemQuantity = (actionType, cartItems, cartItemToModify, quantity) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToModify.id);
    switch (actionType) {
        case ADD_ITEM:
            if (existingCartItem) {
                return cartItems.map(cartItem => {
                    if (cartItem.id === cartItemToModify.id)
                        return { ...cartItem, quantity: cartItem.quantity + 1 }
                    return cartItem;
                });
            }
            return [...cartItems, { ...cartItemToModify, quantity: 1 }];

        case REMOVE_ITEM:
            if (existingCartItem && existingCartItem.quantity > 1)
                return cartItems.map(cartItem => {
                    if (cartItem.id === cartItemToModify.id)
                        return { ...cartItem, quantity: cartItem.quantity - 1 }
                    return cartItem;
                });

            return cartItems.filter(cartItem => cartItem.id !== cartItemToModify.id)

        case SET_ITEM_QUANTITY:
            if (existingCartItem && quantity > 0)
                return cartItems.map(cartItem => {
                    if (cartItem.id === cartItemToModify.id)
                        return { ...cartItem, quantity: quantity }
                    return cartItem;
                });
            else if (existingCartItem && quantity <= 0)
                return cartItems.filter(cartItem => cartItem.id !== cartItemToModify.id)
            else
                return [...cartItems, { ...cartItemToModify, quantity: quantity }]

        default:
            return cartItems;
    }
}