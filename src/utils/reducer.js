import { CLEAR_CART, REMOVE_ITEM, INCREASE_AMOUNT, DECREASE_AMOUNT, FETCH_DATA, CALCULATE_TOTALS } from "./actions";
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const reducer = (state, action) => {
    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] }
    }
    if (action.type === REMOVE_ITEM) {
        state.cart.delete(action.payload.id);
        return { ...state };
    }
    if (action.type === INCREASE_AMOUNT) {
        for (let [key, { id, title, price, img }] of state.cart) {
            if (action.payload.id === key) {
                state.cart.set(key, { id: id, title: title, price: price, img: img, amount: action.payload.amount + 1 });
            }
        }
        return { ...state };
    }
    if (action.type === DECREASE_AMOUNT) {
        for (let [key, { id, title, price, img }] of state.cart) {
            if (action.payload.id === key && action.payload.amount > 0) {
                state.cart.set(key, { id: id, title: title, price: price, img: img, amount: action.payload.amount - 1 });
            }
        }
        return { ...state };
    }
    if (action.type === FETCH_DATA) {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(!response.ok){
                    setIsLoading(false);
                    setIsError(true);
                    return;
                }
                const cart = await response.json();
                console.log(cart);
                const cartArray = cart.map((item) => [item.id, item]);
                console.log(cartArray);
                const cartMap = new Map(cartArray);
                console.log(cartMap);
                // return cartMap
            } catch (error) {
                setIsError(true);
                console.log('Error: ' + error);
            }
        }
        return {...state, cart: fetchData()};
    }
    if (action.type === CALCULATE_TOTALS) {
        let total = 0;
        console.log(state);
        // for (let [key, { id, title, price, img, amount }] of state.cart) {
        //     total = total + (amount*price);
        // }
        return total;
    }
    throw new Error(`No matching "${action.type}" - action type`);
}

export default reducer;
