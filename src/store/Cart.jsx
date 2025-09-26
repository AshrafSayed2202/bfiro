import { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ).filter(item => item.quantity > 0),
            };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'LOAD_CART':
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

// Cart Provider
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    // Sanitize item to ensure only serializable properties are included
    const sanitizeItem = (item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        discount: item.discount || 0,
        img: item.img,
        quantity: item.quantity || 1,
        // Add other serializable properties as needed
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Validate and sanitize loaded items
                const sanitizedItems = Array.isArray(parsedCart.items)
                    ? parsedCart.items.map(sanitizeItem)
                    : [];
                dispatch({ type: 'LOAD_CART', payload: sanitizedItems });
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            // Create a sanitized version of the cart for storage
            const sanitizedCart = {
                items: cart.items.map(sanitizeItem),
            };
            localStorage.setItem('cart', JSON.stringify(sanitizedCart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: sanitizeItem(item) });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const cartTotal = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook to use Cart Context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};