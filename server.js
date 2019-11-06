require('./db/mongoose')
const user=require('./views/models/users')
const express =require('express')
const hbs=require('hbs')
const nodemailer = require('nodemailer')
const jwt=require('jwt-simple')

const app=express()

var token;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'hbs')

app.get('/',(req,res)=>{
    res.render('index.hbs')
})

app.post('/server', (req,res)=>{
    res.send('server')
})

app.get('/forgetpassword',(req, res)=>{
    res.render('forgetpass.hbs')
})

app.post('/forgetpassword', async (req,res)=>{
    const id=req.body.email
    if(id!=undefined){
        await user.findOne({email:id}).then((value)=>{
            if(value!=null){    
                var transporter = nodemailer.createTransport({
                    host:'mail.vinove.com',
                    secure:false,
                    port:587,
                    auth: {
                      user: 'rahul.yadav1@mail.vinove.com',
                      pass: 'rahul@2019'
                    },
                    tls:{
                        rejectUnauthorized:false
                    }
                  });
                  
                  const secret='what is the color of orange'
                  let d=new Date()
                  let time=d.getTime()
                  token=jwt.encode({email:id, time}, secret)  //token generated
                  
                  user.updateOne({_id:value._id},{token:token},(err, val)=>{        //token inserted into database
                      var mailOptions = {
                        from: 'rahul.yadav1@mail.vinove.com',
                        to: id,
                        subject: 'link to reset password',
                        text: `http://localhost:3030/changepassword/${token}`
                      };
                      
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          throw error
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                  })
                  res.redirect('/forgetpassword')
            }
            else{
                res.send('user not found')
            }
        }).catch((err)=>{
            throw err
        })
    }else{
        res.send('email not entered')
    }
})

app.get('/changepassword/:token', async(req, res)=>{
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

app.post('/changepassword/:token', async (req, res)=>{
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

app.listen(3030)