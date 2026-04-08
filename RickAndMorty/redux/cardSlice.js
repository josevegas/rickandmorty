import { createSlice } from "@reduxjs/toolkit";
import api from '../src/services/api';

const initialState={
    allCards:[],
    currentCards:[],
    prefFilters:[],
    favoriteCards:[],
    user:null,
    login:false,
};

export const cardsSlice=createSlice({
    name: "cards",
    initialState,
    reducers:{
        addMyFavoriteCase:(state,action)=>{
            if(!state.favoriteCards.includes(action.payload)) {
                state.favoriteCards=[...state.favoriteCards,action.payload];
            }
        },
        getLoginCase:(state,action)=>{
            state.user=action.payload.email;
            state.login=action.payload.isLogin;
        },
        getCharCase:(state,action)=>{
            if (!state.allCards.find(char => char.id === action.payload.id)) {
                state.allCards=[...state.allCards,action.payload];
                state.currentCards=state.allCards;
                state.prefFilters=state.currentCards;
            }
        },
        delCharCase: (state,action)=>{
            const id=action.payload;
            state.allCards=state.allCards.filter((card)=>Number(card.id)!==Number(id));
            state.currentCards=state.allCards;
            state.prefFilters=state.currentCards;
        },
        getFavCase: (state, action) => {
            // Solo guardamos los IDs de favoritos en favoriteCards.
            // NO sobreescribimos allCards para no romper el listado completo del Home.
            const idFav = action.payload.map(char => char.id);
            state.favoriteCards = idFav;
        },
        delFavCase: (state,action)=>{
            state.favoriteCards=state.favoriteCards.filter(card=>card!==action.payload);
        },
        filterGenderCase: (state,action)=>{
            if(action.payload==='all'){
                state.currentCards=state.allCards;
                state.prefFilters=state.currentCards;
            }else{
                state.currentCards=state.allCards.filter(card=>card.gender===action.payload);
                state.prefFilters=state.currentCards;
            }
        },
        filterStatusCase: (state,action)=>{
            if(action.payload==='all'){
                state.currentCards=state.prefFilters
            }else{
                state.currentCards=state.prefFilters.filter(card=>card.status===action.payload);
            }
        },
        orderCharCase: (state,action)=>{
            const ordered=[...state.allCards].sort((a,b)=>{
                if(action.payload==='asc') return a.name.localeCompare(b.name);
                if(action.payload==='des') return b.name.localeCompare(a.name);
                return 0;
            });
            state.currentCards=ordered;
        },
        discardFilterCase: (state)=>{
            state.currentCards=state.allCards;
            state.prefFilters=state.currentCards;
        },
        getAllCharsCase: (state, action) => {
            state.allCards = action.payload;
            state.currentCards = action.payload;
            state.prefFilters = action.payload;
        },
        closeCase: (state) => {
            // Limpieza total del estado al hacer logout:
            // evitamos que datos del usuario anterior persistan en memoria.
            state.user = null;
            state.login = false;
            state.allCards = [];
            state.currentCards = [];
            state.prefFilters = [];
            state.favoriteCards = [];
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
    filterGenderCase,
    filterStatusCase,
    orderCharCase,
    discardFilterCase,
    getAllCharsCase,
    closeCase,
}=cardsSlice.actions;

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
        const { data: isLogin } = await api.get(`user/${email}/${password}`);
        dispatch(getLoginCase({email,isLogin}));
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

export const filterGenderAction=(gender)=>(dispatch)=> dispatch(filterGenderCase(gender));
export const filterStatusAction=(status)=>(dispatch)=> dispatch(filterStatusCase(status));
export const orderCharAction=(order)=>(dispatch)=> dispatch(orderCharCase(order));
export const discardFilterAction=()=>(dispatch)=> dispatch(discardFilterCase());
// NOTA: closeAction dispatch closeCase (no a sí misma) para evitar recursión infinita
export const closeAction = () => (dispatch) => dispatch(closeCase());