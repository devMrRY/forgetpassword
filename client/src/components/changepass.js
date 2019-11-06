import React from 'react'
import axios from 'axios'

class Changepass extends React.Component{
    state={pass1:'', pass2:'', responefromserver:''}

    formsubmit= async (e)=>{
        e.preventDefault();
        const url= await window.location.pathname
        console.log(url)
        const res=await axios.post(`/changepassword${url}`, {
            headers:{

            },
            params:{
                body:JSON.stringify({ pass:this.state.pass1})
            }
        })
        const body = await res.data;
          
        this.setState({ responefromserver: body });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.formsubmit}>
                    <input type="hidden"/>
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