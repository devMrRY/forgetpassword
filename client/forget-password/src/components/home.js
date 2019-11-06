import React from 'react'

class Home extends React.Component{
    state={text:'', pass:''}
    OnInputChange=(e)=>{
        console.log(this.state)
        this.setState({text:e.target.value})
    }
    OnPassChange=(e)=>{
        console.log(this.state)
        this.setState({pass:e.target.value})
    }
    OnFormSubmit=(data)=>{
        data.preventDefault();
        console.log(this.state)
    }
    render(){
        return(
            <div>
                <form onSubmit={this.OnFormSubmit}>
                    <input name="email" type="email" placeholder="email" onChange={this.OnInputChange} /><br/>
                    <input type="pass" type="password" placeholder="password" onChange={this.OnPassChange} /><br/>
                    <a href="#">forget password</a><br/>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }
}

export default Home