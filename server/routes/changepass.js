const express=require('express')
const router=express.Router()
const jwt=require('jwt-simple')
const user=require('../views/models/users')

router.get('/changepassword/:token', async(req, res)=>{
    const d=new Date()
    const t=d.getTime();
    const secret='what is the color of orange'
    const token=req.params.token
    const decodedtoken=jwt.decode(token, secret)
    const time=decodedtoken.time
    await user.findOne({email:decodedtoken.email}).then((val)=>{
        if(val.token===token && t-time<=300000){
            res.redirect('http://localhost:3000/changepassword/'+token)
        }
        else{
            res.send('the page you are looking for had expired')
        }
    }).catch((e)=>{
        res.send('not a valid url')
    })
})

router.post('/changepassword/:token', async (req, res)=>{
    const d=new Date()
    const t=d.getTime();
    const secret='what is the color of orange'
    const token=req.params.token
    const decodedtoken=jwt.decode(token, secret)
    const email=decodedtoken.email
    const body=JSON.parse( req.body.params.body)
    const pass=body.pass
    const time=decodedtoken.time
    await user.findOne({email:decodedtoken.email}).then(async(val)=>{
        if(val.token===token && t-time<=300000){
            await user.updateOne({email:email}, {password:pass, token:''}, (err, result)=>{
                if(err) {res.send('user cannot be updated');}
                else{
                    res.send('password updated successfully')
                }
            })
        }
        
        else{
            res.send('error loading page. This page has expired')
        }
    }).catch((e)=>{
        res.send('not a valid url')
    })
})

module.exports=router