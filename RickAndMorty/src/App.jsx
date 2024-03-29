import React,{ useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
axios.defaults.baseURL='https://rickandmorty-production-7404.up.railway.app/';
import Home from './Views/Home.jsx';
import NavBar from './Views/NavBar.jsx';
import About from "./Views/About.jsx";
import Detail from "./Views/Detail.jsx";
import Favorite from "./Views/Favorite.jsx";
import Form from "./Views/Form.jsx";
import { getLoginAction,getCharAction, getFavAction } from "../redux/cardSlice.js";

const App=()=>{
   const [access,setAccess]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const characters=useSelector(state=>state.cardsReducer.allCards);

    const onSearch=(id)=>{
        axios.get(`card/${id}`)
        .then((response) =>{
            const {data}=response
            if (data.name && characters.filter((char)=>char.id===data.id).length===0) {
                dispatch(getCharAction(id))
                } else if(data.name) {window.alert('Ya agregaste ése personaje')}else{
                window.alert(data.error);
            }
        })
        .catch((error)=>window.alert('Server caído'));
    };

    const login= (userData)=>{
        const { email, password } = userData;
        dispatch(getLoginAction(email,password));
        axios.get(`user/${email}/${password}`)
        .then((response)=>{
            const {data}=response;
            setAccess(data)
            if(data){
                dispatch(getFavAction(email))
            }
            data&&navigate('/home')
        })
    };

    const sign=(userData)=>{
        const {email,password}=userData;
        axios.post(`user/${email}/${password}`).then(({data})=>{
            const {access}=data;
            setAccess(data);
        })
        login(userData);
    };

    useEffect(()=>{
        !access&&navigate('/');
    },[access,navigate]);

    return(
        <div>
            {location.pathname !=="/" && <NavBar onSearch={onSearch} />}
            <Routes>
                <Route path="/" element={<Form login={login} sign={sign}/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail/:id" element={<Detail characters={characters}/>} />
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
        </div>
    )
}

export default App;