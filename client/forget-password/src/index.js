import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home'
import SendOtp from './components/sendotp';

class App extends React.Component{
    render(){
        return (
            <div>
                <Home/>
                {/* </Home> */}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

