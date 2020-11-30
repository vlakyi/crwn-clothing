import { setItemQuantity } from '../redux/cart/cart.utils';
import CartActionTypes from '../redux/cart/cart.types';
const { ADD_ITEM, REMOVE_ITEM, SET_ITEM_QUANTITY } = CartActionTypes;

const cartItems = [
    {
        id: "jackets_2",
        imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
        name: "Blue Jean Jacket",
        price: 90,
        quantity: 10
    },
    {
        id: "jackets_3",
        imageUrl: "https://i.ibb.co/mJS6vz0/black-jean-jacket.png",
        name: "Black Jean Jacket",
        price: 190,
        quantity: 3
    },
    {
        id: "jackets_4",
        imageUrl: "https://i.ibb.co/mJS6vz0/green-jacket.png",
        name: "Green Jacket",
        price: 100,
        quantity: 1
    }
];

const cartItem = {
    id: "jackets_2",
    imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
    name: "Blue Jean Jacket",
    price: 90,
    quantity: 10
};

describe('Cart setItemQuantity function test with SET_ITEM_QUANTITY action', () => {

    it('testing setItemQuantity function with quality > 0', () => {
        const quantity = 5;
        expect(setItemQuantity(SET_ITEM_QUANTITY, cartItems, cartItem, quantity)).toStrictEqual(
            cartItems.map((item) => {
                if (item.id === cartItem.id)
                    return { ...item, quantity: quantity };
                return item;
            })
        );
    });

    it('testing setItemQuantity function with quality <= 0', () => {
        const quantity = 0;
        expect(setItemQuantity(SET_ITEM_QUANTITY, cartItems, cartItem, quantity)).toStrictEqual([cartItems[1], cartItems[2]]);
    });

    it('testing setItemQuantity function with not existing item', () => {
        const notExistingItem = {
            id: 'not_existing_item',
            imageUrl: "https://i.ibb.co/mJS6vz0/not_existing_item.png",
            name: "Not Existing Item",
            price: 150,
            quantity: 2
        }

        const quantity = 5;
        expect(setItemQuantity(SET_ITEM_QUANTITY, cartItems, notExistingItem, quantity)).toStrictEqual([...cartItems, { ...notExistingItem, quantity: quantity }]);
    });

});

describe('setItemQuantity function with ADD_ITEM action', () => {
    it('testing setItemQuantity function with existing cartItem', () => {
        expect(setItemQuantity(ADD_ITEM, cartItems, cartItem)).toStrictEqual(
            cartItems.map((item) => {
                if (item.id === cartItem.id)
                    return { ...item, quantity: item.quantity + 1 };
                return item;
            })
        );
    });

    it('testing setItemQuantity function with existing cartItem', () => {
        const notExistingCartItem = {
            id: "jackets_8",
            imageUrl: "https://i.ibb.co/mJS6vz0/not-existing-jacket.png",
            name: "Not Existing Jacket",
            price: 20,
            quantity: 1
        };

        expect(setItemQuantity(ADD_ITEM, cartItems, notExistingCartItem)).toStrictEqual([...cartItems, notExistingCartItem]);
    });
});

describe('setItemQuantity function with REMOVE_ITEM action', () => {
    it('testing setItemQuantity function with existing cartItem with quntity > 1', () => {

        expect(setItemQuantity(REMOVE_ITEM, cartItems, cartItem)).toStrictEqual(
            cartItems.map((item) => {
                if (item.id === cartItem.id)
                    return { ...item, quantity: item.quantity - 1 };
                return item;
            })
        );
    });

    it('testing setItemQuantity function with existing cartItem with quntity === 1', () => {
        const cartItemToRemove = {
            id: "jackets_4",
            imageUrl: "https://i.ibb.co/mJS6vz0/green-jacket.png",
            name: "Green Jacket",
            price: 100,
            quantity: 1
        };

        expect(setItemQuantity(REMOVE_ITEM, cartItems, cartItemToRemove)).toStrictEqual([cartItems[0], cartItems[1]]);
    });
});

it('setItemQuantity function with default action', () => {
    expect(setItemQuantity(undefined, cartItems, cartItem)).toStrictEqual(cartItems);
});