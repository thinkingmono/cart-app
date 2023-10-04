import { createContext, useContext, useReducer, useState } from "react";
import { CLEAR_CART, REMOVE_ITEM, INCREASE_AMOUNT, DECREASE_AMOUNT, FETCH_DATA, CALCULATE_TOTALS } from "./actions";
import reducer from "./reducer";
import cartItems from "../data";

const GlobalContext = createContext();

const setDefaultState = () => {
    const productList = cartItems.map((item) => [item.id, item]);
    const cart = new Map(productList);
    return cart;
}
const defaultState = {
    cart: setDefaultState()
};

const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    }
    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } })
    }
    const increaseAmount = (id, amount) => {
        dispatch({ type: INCREASE_AMOUNT, payload: { id, amount } })
    }
    const decreaseAmount = (id, amount) => {
        dispatch({ type: DECREASE_AMOUNT, payload: { id, amount } })
    }
    const calculateTotals = () => {
        dispatch({ type: CALCULATE_TOTALS })
    }
    const fetchData = () => {
        dispatch({type: FETCH_DATA})
    }

    return (
        <GlobalContext.Provider value={{ state, clearCart, removeItem, increaseAmount, decreaseAmount }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;

export const useGlobalContext = () => useContext(GlobalContext);
