const express=require('express')
const router=express.Router()
const jwt=require('jwt-simple')
const user=require('../views/models/users')

router.get('/changepassword/:token', async(req, res)=>{
    const secret='what is the color of orange'
    const token=req.params.token
    const decodedtoken=jwt.decode(token, secret)
    await user.findOne({email:decodedtoken.email}).then((val)=>{
        if(val.token===token){
            res.render('changepasss',{token})
        }
        else{
            res.send('the page you are looking for had expired')
        }
    }).catch((e)=>{
        res.send('not a valid url')
    })
})

router.post('/changepassword/:token', async (req, res)=>{
    const secret='what is the color of orange'
    const token=req.params.token
    const decodedtoken=jwt.decode(token, secret)
    const email=decodedtoken.email
    await user.findOne({email:decodedtoken.email}).then(async(val)=>{
        if(val.token===token){
            await user.updateOne({email:email}, {password:req.body.pass1,token:''}, (err, result)=>{
                if(err) {res.send('user cannot be updated');}
                else{
                    res.send('password updated successfully')
                }
            })
        }
        else{
            res.send('error loading page')
        }
    }).catch((e)=>{
        res.send('not a valid url')
    })
})

module.exports=router