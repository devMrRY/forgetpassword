const express=require('express')
const router=express.Router()
const user=require('../views/models/users')
const nodemailer = require('nodemailer')
const jwt=require('jwt-simple')

router.use(express.json())

router.post('/forgetpassword', async (req,res)=>{
    const data=JSON.parse(req.body.params.body)
    const id=data.email
    if(id!=undefined){
        await user.findOne({email:id}).then((value)=>{
            if(value!=null){    
                var transporter = nodemailer.createTransport({
                    host:'mail.vinove.com',
                    secure:false,
                    port:587,
                    auth: {
                      user: 'rahul.yadav1@mail.vinove.com',             // sender's mail address
                      pass: 'rahul@2019'                                // sender's password
                    },
                    tls:{
                        rejectUnauthorized:false
                    }
                  });
                  
                  const secret='what is the color of orange'
                  let d=new Date()
                  let time=d.getTime()
                  token=jwt.encode({email:id, time}, secret)                        //token generated
                  
                  user.updateOne({_id:value._id},{token:token},(err, val)=>{        //token inserted into database
                      var mailOptions = {
                        from: 'rahul.yadav1@mail.vinove.com',                       // sender's mail id
                        to: id,                                                     // receiver's mail id
                        subject: 'link to reset password',
                        text: `http://localhost:3030/changepassword/${token}`
                      };
                      
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) { throw error } 
                        else {console.log('Email sent: ' + info.response); }
                      });
                  })
                  console.log('mail sending')
                  res.send('mail send successfully')
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

module.exports=router