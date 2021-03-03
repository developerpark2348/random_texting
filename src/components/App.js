import React, {useEffect, useState} from 'react';
import AppRouter from './Router';
import { authService } from '../fbase';

function App() {

  const[init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  })

  return (
    <>
      {init 
        ? <AppRouter isLoggedIn={isLoggedIn}/> 
        : <div style={{color: "#eee5f4", fontSize: "100px", display: "flex", justifyContent: "center"}}>로딩중입니다 ...</div>
      }
    </>
  );
}

export default App;
