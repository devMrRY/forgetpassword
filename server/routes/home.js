const express=require('express')
const router=express.Router()

router.get('/', (req, res)=>{
    res.render('index.hbs')
})

router.post('/server', (req,res)=>{
    res.send(req.body)
})

module.exports=router