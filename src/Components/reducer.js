export const initialState = {
  basket: [],
  user: null,
  address: {},
};

export const getBasketTotal = (basket) => basket.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
  console.log('Action', action);
  switch (action.type) {
    case 'ADD_TO_BASKET':
      const existingItem = state.basket.find((item) => item.id === action.item.id);
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + (action.item.quantity || 1),
        };
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id ? updatedItem : item
        );
    
        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        const newItem = {
          ...action.item,
          quantity: action.item.quantity || 1,
        };
        return {
          ...state,
          basket: [...state.basket, newItem],
        };
      }
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove from basket whose index is ${index}`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: { ...action.item },
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };
      case 'UPDATE_QUANTITY':
        const updatedBasket = state.basket.map((item) => {
          if (item.id === action.id) {
            return { ...item, quantity: item.quantity + action.quantity };
          }
          return item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };      
    default:
      return state;
  }
};

export default reducer;
