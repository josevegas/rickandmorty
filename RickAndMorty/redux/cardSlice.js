import { createSlice } from "@reduxjs/toolkit";
import api from '../src/services/api';

const initialState = {
    allCards: [],
    currentCards: [],
    filters: {
        name: '',
        gender: 'all',
        status: 'all',
    },
    order: 'all',
    favoriteCards: [],
    user: null,
    login: false,
};

/**
 * Helper to apply all active filters and ordering to the character list.
 * Effectively implements AND logic.
 */
const applyFiltersAndOrder = (state) => {
    const { allCards, filters, order } = state;
    let filtered = [...allCards];

    // 1. Text Search (Name)
    if (filters.name.trim() !== '') {
        const search = filters.name.toLowerCase();
        filtered = filtered.filter(char => 
            char.name.toLowerCase().includes(search)
        );
    }

    // 2. Gender Filter
    if (filters.gender !== 'all') {
        filtered = filtered.filter(char => char.gender === filters.gender);
    }

    // 3. Status Filter
    if (filters.status !== 'all') {
        filtered = filtered.filter(char => char.status === filters.status);
    }

    // 4. Ordering
    if (order === 'asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'des') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    state.currentCards = filtered;
};

export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addMyFavoriteCase: (state, action) => {
            if (!state.favoriteCards.includes(action.payload)) {
                state.favoriteCards = [...state.favoriteCards, action.payload];
            }
        },
        getLoginCase: (state, action) => {
            state.user = action.payload.email;
            state.login = action.payload.isLogin;
        },
        getCharCase: (state, action) => {
            if (!state.allCards.find(char => char.id === action.payload.id)) {
                state.allCards = [...state.allCards, action.payload];
                applyFiltersAndOrder(state);
            }
        },
        delCharCase: (state, action) => {
            const id = action.payload;
            state.allCards = state.allCards.filter((card) => Number(card.id) !== Number(id));
            applyFiltersAndOrder(state);
        },
        getFavCase: (state, action) => {
            const idFav = action.payload.map(char => char.id);
            state.favoriteCards = idFav;
        },
        delFavCase: (state, action) => {
            state.favoriteCards = state.favoriteCards.filter(card => card !== action.payload);
        },
        setSearchNameCase: (state, action) => {
            state.filters.name = action.payload;
            applyFiltersAndOrder(state);
        },
        filterGenderCase: (state, action) => {
            state.filters.gender = action.payload;
            applyFiltersAndOrder(state);
        },
        filterStatusCase: (state, action) => {
            state.filters.status = action.payload;
            applyFiltersAndOrder(state);
        },
        orderCharCase: (state, action) => {
            state.order = action.payload;
            applyFiltersAndOrder(state);
        },
        discardFilterCase: (state) => {
            state.filters = { name: '', gender: 'all', status: 'all' };
            state.order = 'all';
            state.currentCards = state.allCards;
        },
        getAllCharsCase: (state, action) => {
            state.allCards = action.payload;
            applyFiltersAndOrder(state);
        },
        closeCase: (state) => {
            state.user = null;
            state.login = false;
            state.allCards = [];
            state.currentCards = [];
            state.favoriteCards = [];
            state.filters = { name: '', gender: 'all', status: 'all' };
            state.order = 'all';
        }
    }
});

export const {
    addMyFavoriteCase,
    getLoginCase,
    getCharCase,
    delCharCase,
    getFavCase,
    delFavCase,
    setSearchNameCase,
    filterGenderCase,
    filterStatusCase,
    orderCharCase,
    discardFilterCase,
    getAllCharsCase,
    closeCase,
} = cardsSlice.actions;

export default cardsSlice.reducer;

/**
 * Fetches all characters from the backend API.
 * Used to initialize the character list upon landing on the home page.
 */
export const getAllCharsAction = () => async (dispatch) => {
    try {
        const { data: characters } = await api.get('card/');
        dispatch(getAllCharsCase(characters));
    } catch (error) {
        console.error('Error in getAllCharsAction:', error);
    }
}

export const getLoginAction=(email,password)=>async (dispatch)=>{

    try {
        const { data } = await api.post('/user/login', { email, password });
        const isLogin = data.access;
        dispatch(getLoginCase({email, isLogin}));
        return isLogin;
    } catch (error) {
        console.error('Error in getLoginAction:', error);
        return false;
    }
}

export const getCharAction=(id)=> async (dispatch)=>{
    try {
        const { data: char } = await api.get(`card/${id}`);
        dispatch(getCharCase(char));
    } catch (error) {
        console.error('Error in getCharAction:', error);
    }
}

export const delCharAction=(id)=> (dispatch)=>{
    dispatch(delCharCase(id))
}

export const addMyFavoriteAction=(email,id)=>async (dispatch)=>{
    try {
        await api.post(`card/${email}/${id}`);
        dispatch(addMyFavoriteCase(id))
    } catch (error) {
        console.error('Error in addMyFavoriteAction:', error);
    }
}

export const getFavAction=(email)=>async (dispatch)=>{
    try {
        const { data: favChar } = await api.get(`user/${email}`);
        dispatch(getFavCase(favChar));
    } catch (error) {
        console.error('Error in getFavAction:', error);
    }
}

export const delFavAction=(email,id)=> async (dispatch)=>{
    try {
        await api.delete(`card/${email}/${id}`);
        dispatch(delFavCase(id));
    } catch (error) {
        console.error('Error in delFavAction:', error);
    }
}

export const setSearchNameAction=(name)=>(dispatch)=> dispatch(setSearchNameCase(name));
export const filterGenderAction=(gender)=>(dispatch)=> dispatch(filterGenderCase(gender));
export const filterStatusAction=(status)=>(dispatch)=> dispatch(filterStatusCase(status));
export const orderCharAction=(order)=>(dispatch)=> dispatch(orderCharCase(order));
export const discardFilterAction=()=>(dispatch)=> dispatch(discardFilterCase());
// NOTA: closeAction dispatch closeCase (no a sí misma) para evitar recursión infinita
export const closeAction = () => (dispatch) => dispatch(closeCase());