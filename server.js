require('./db/mongoose')
const express =require('express')
const home=require('./routes/home')
const forgetpass=require('./routes/forgetpass')
const changepass=require('./routes/changepass')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'hbs')

app.use(home);
app.use(forgetpass)
app.use(changepass)

app.listen(3030)