import { setItemQuantity, addItemToCart, removeItemFromCart } from '../redux/cart/cart.utils';

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

describe('Cart setItemQuantity function test', () => {

    it('testing setItemQuantity function with quality > 0', () => {
        const quantity = 5;
        expect(setItemQuantity(cartItems, cartItem, quantity)).toStrictEqual(
            cartItems.map((item) => {
                if (item.id === cartItem.id)
                    return { ...item, quantity: quantity };
                return item;
            })
        );
    });

    it('testing setItemQuantity function with quality <= 0', () => {
        const quantity = 0;
        expect(setItemQuantity(cartItems, cartItem, quantity)).toStrictEqual([cartItems[1], cartItems[2]]);
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
        expect(setItemQuantity(cartItems, notExistingItem, quantity)).toStrictEqual([...cartItems, { ...notExistingItem, quantity: quantity }]);
    });

    it('testing setItemQuantity function with undefined quantity', () => {
        const notExistingItem = {
            id: 'not_existing_item',
            imageUrl: "https://i.ibb.co/mJS6vz0/not_existing_item.png",
            name: "Not Existing Item",
            price: 150,
            quantity: 2
        }

        expect(setItemQuantity(cartItems, notExistingItem)).toStrictEqual([...cartItems, notExistingItem]);
    });

});
describe('addItemToCart function', () => {
    it('testing addItemToCart function with existing cartItem', () => {
        expect(addItemToCart(cartItems, cartItem)).toStrictEqual(
            cartItems.map((item) => {
                if (item.id === cartItem.id)
                    return { ...item, quantity: item.quantity + 1 };
                return item;
            })
        );
    });

    it('testing addItemToCart function with existing cartItem', () => {
        const notExistingCartItem = {
            id: "jackets_8",
            imageUrl: "https://i.ibb.co/mJS6vz0/not-existing-jacket.png",
            name: "Not Existing Jacket",
            price: 20,
            quantity: 1
        };

        expect(addItemToCart(cartItems, notExistingCartItem)).toStrictEqual([...cartItems, notExistingCartItem]);
    });
});

describe('removeItemFromCart function', () => {
    it('testing removeItemFromCart function with existing cartItem with quntity > 1', () => {

        expect(removeItemFromCart(cartItems, cartItem)).toStrictEqual(
            cartItems.map((item) => {
                if (item.id === cartItem.id)
                    return { ...item, quantity: item.quantity - 1 };
                return item;
            })
        );
    });

    it('testing removeItemFromCart function with existing cartItem with quntity === 1', () => {
        const cartItemToRemove = {
            id: "jackets_4",
            imageUrl: "https://i.ibb.co/mJS6vz0/green-jacket.png",
            name: "Green Jacket",
            price: 100,
            quantity: 1
        };

        expect(removeItemFromCart(cartItems, cartItemToRemove)).toStrictEqual([cartItems[0], cartItems[1]]);
    });
});


