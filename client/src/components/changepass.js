import React from 'react'
import axios from 'axios'

class Changepass extends React.Component{
    state={pass1:'', pass2:'', responefromserver:''}

    formsubmit= async (e)=>{
        e.preventDefault();
        if(this.state.pass1===this.state.pass2 && this.state.pass1!==''){
            const url= await window.location.pathname
            const token=url.substring(16,url.length)
         
            const res=await axios.post(`/changepassword/${token}`, {
                headers:{
                    'Content-Type': 'application/json',
                },
                params:{
                    body:JSON.stringify({ pass:this.state.pass1})
                }
            })
            const body = await res.data;
              
            this.setState({ responefromserver: body });
        }
        else{
            this.setState({responefromserver: 'password does not match'})
        }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.formsubmit}>
                    <input type="password" onChange={(e)=>{this.setState({pass1:e.target.value})}}/><br/>
                    <input type="password" onChange={(e)=>{this.setState({pass2:e.target.value})}}/><br/>
                    <button type="submit">update</button>
                </form>
                <p>{this.state.responefromserver}</p>
            </div>
        )
    }
}

export default Changepass