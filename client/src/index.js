import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home'
import SendOtp from './components/sendotp';
import Changepassword from './components/changepass';
import { Route, BrowserRouter } from 'react-router-dom';

class App extends React.Component{
    render(){
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={Home} />
                        <Route path="/forgetpassword" exact component={SendOtp} />
                        <Route path="/changepassword/:token" exact component={Changepassword} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

