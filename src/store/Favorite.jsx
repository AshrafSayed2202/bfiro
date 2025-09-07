import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Favorite Context
const FavoriteContext = createContext();

// Favorite Reducer
const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            const existingFavorite = state.items.find(item => item.id === action.payload.id);
            if (existingFavorite) return state; // Prevent duplicates
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id),
            };
        case 'LOAD_FAVORITES':
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

// Favorite Provider
export const FavoriteProvider = ({ children }) => {
    const [favorites, dispatch] = useReducer(favoriteReducer, { items: [] });

    // Fetch favorites from backend on mount
    // useEffect(() => {
    //     const fetchFavorites = async () => {
    //         try {
    //             const response = await fetch('/api/favorites');
    //             if (!response.ok) throw new Error('Failed to fetch favorites');
    //             const data = await response.json();
    //             let favoriteItems = [];
    //             if (Array.isArray(data)) {
    //                 favoriteItems = data;
    //             } else {
    //                 favoriteItems = data?.items || [];
    //             }
    //             dispatch({ type: 'LOAD_FAVORITES', payload: favoriteItems });
    //         } catch (error) {
    //             console.error('Error fetching favorites:', error);
    //             toast.error('Failed to load favorites', {
    //                 position: 'bottom-center',
    //                 autoClose: 1500,
    //             });
    //         }
    //     };
    //     fetchFavorites();
    // }, []);

    const addFavorite = (item) => {
        dispatch({ type: 'ADD_FAVORITE', payload: item });
    };

    const removeFavorite = (id) => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: { id } });
        toast.info(`${favorites.items.find(item => item.id === id)?.title || 'Item'} removed from favorites`, {
            position: 'bottom-center',
            autoClose: 1500,
        });
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

// Custom Hook to use Favorite Context
export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error('useFavorite must be used within a FavoriteProvider');
    }
    return context;
};