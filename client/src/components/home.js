import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom';

class Home extends React.Component{
    state={email:'', pass:'', response:''}

    componentDidMount(){
        this.callApi().then((val)=>{
            this.setState({response:val.express})
        }).catch((err)=>{
            console.log(err);
        })
    }

    callApi= async ()=>{
        const data= await fetch('/');
        const body= await data.json();
        if(data.status !==200) throw new Error(body.message);

        return body;
    }

    OnFormSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post('/server', {
            headers: {
              'Content-Type': 'application/json',
            },
            data:{
                body: JSON.stringify({ email: this.state.email, pass: this.state.pass })
            }
          });
          const body = await response.data.params.body;
          
          this.setState({ responefromserver: body });
    }
    render(){
        return(
            <div>
                <p>{this.state.response}</p>
                <form onSubmit={this.OnFormSubmit}>
                    <input type="email" placeholder="email" onChange={(e)=>{this.setState({email:e.target.value})}} /><br/>
                    <input type="password" placeholder="password" onChange={(e)=>{this.setState({pass:e.target.value})}} /><br/>
                    <a href="/forgetpassword">forget password</a><br/>
                    <button type="submit">login</button>
                </form>
                <p>{this.state.responefromserver}</p>
            </div>
        )
    }
}

export default Home