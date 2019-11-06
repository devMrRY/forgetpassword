import React from 'react'
import axios from 'axios'

class SendOtp extends React.Component{
    state={email:'', responefromserver:''}

    Formsubmit= async (e)=>{
        e.preventDefault();
        const response= await axios.post('/forgetpassword',{
            header:{
                'Content-Type': 'application/json',
            },
            params:{
                body: JSON.stringify({ email: this.state.email})
            }
        })
        const body = await response.data;
          
        this.setState({ responefromserver: body });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.Formsubmit}>
                    <input name="email" type="email" placeholder="email" onChange={(e)=>{this.setState({email:e.target.value})}} /><br/>
                    <button type="submit">login</button>
                </form>
                <p>{this.state.responefromserver}</p>
            </div>
        )
    }
}

export default SendOtp