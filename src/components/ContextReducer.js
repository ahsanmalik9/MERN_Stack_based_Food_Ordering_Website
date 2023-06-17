import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext(); //global state
const CartDispatchContext = createContext(); // Use reducer k andr dispath funtion hota hai
const reducer = (state, action) => {
    //yaha logic bnaye gy ADD TO CART ki
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)//splice efficiency decrease krta hai
            return newArr;

        case "DROP":
            let empArray = []
            return empArray

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
        default:
            console.log("Error in reducer");
    }


}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []) // Dispatch me multiple action types hoty hain for eg asa button rkhna ho jis sy cart ka data delete krna ho


    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>


        </CartDispatchContext.Provider>

    )
}

export const useCart = () => useContext(CartStateContext);

export const useDispatchCart = () => useContext(CartDispatchContext);

