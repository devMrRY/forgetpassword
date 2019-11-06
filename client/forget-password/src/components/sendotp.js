import React from 'react'

class SendOtp extends React.Component{
    render(){
        return(
            <div>
                <form>
                    <input name="email" type="email" placeholder="email"/><br/>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }
}

export default SendOtp