import { createContext, useContext, useEffect, useReducer } from "react";
import { CLEAR_CART, REMOVE_ITEM, INCREASE_AMOUNT, DECREASE_AMOUNT, LOADING, FETCH_DATA } from "./actions";
import reducer from "./reducer";
import cartItems from "../data";
import { getTotals } from "./utils";
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const GlobalContext = createContext();

const defaultState = {
    isLoading: false,
    cart: new Map()
};

const AppContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const { totalAmount, totalCost } = getTotals(state.cart);

    const clearCart = () => {
        dispatch({ type: CLEAR_CART });
    }
    const removeItem = (id) => {
        dispatch({ type: REMOVE_ITEM, payload: { id } })
    }
    const increaseAmount = (id) => {
        dispatch({ type: INCREASE_AMOUNT, payload: { id } })
    }
    const decreaseAmount = (id) => {
        dispatch({ type: DECREASE_AMOUNT, payload: { id } })
    }
    const fetchData = async () => {
        dispatch({type: LOADING})
        try {
            const response = await fetch(url);
            const cart = await response.json();
            dispatch({ type: FETCH_DATA, payload: {cart}})
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <GlobalContext.Provider value={{ ...state, clearCart, removeItem, increaseAmount, decreaseAmount, totalAmount, totalCost }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;

export const useGlobalContext = () => useContext(GlobalContext);
