import React, {useState} from 'react';
import Auth from '../routes/Auth';
import Main from '../routes/Main';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

function AppRouter(){
    
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return(
        <Router>
            <Switch>
                {isLoggedIn 
                ?
                <Route exact path="/">
                    <Main />
                </Route>
                :
                <Route eaxct path="/">
                    <Auth />
                </Route>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter;