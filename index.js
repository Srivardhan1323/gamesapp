if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const User=require('./models/user');
const Game=require('./models/game');
const Admin=require('./models/admin');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const session=require('express-session');


//'mongodb://127.0.0.1:27017/game-base'
const DB_URL=process.env.DB_URL
mongoose.connect(DB_URL ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("MONGO CONNECTED!!!");
})
.catch((error)=>{
    console.log("MONGO FAILED ;(");
    console.log(error);
})



app.set('view engine','ejs');
app.set('views','views');



app.use(express.static('public'));
app.use(express.urlencoded({extented:true}));
app.use(session({secret:" "}));



app.get('/signup',(req,res)=>{
    if(req.session.user_id) 
    {
        return res.redirect('/home');
    }
    res.render('signup');
})
app.post('/signup',async(req,res)=>{
    const { password,username }=req.body;
    const hash =await bcrypt.hash(password,12);
    const user=new User({
        username,
        password: hash
    })
    
    const existingUser = await User.findOne({ username });

    if (existingUser) 
    {
      return res.send('<script>alert("Username Already Exists"); window.location="/signup";</script>');
      return res.render('signup');
    }

    await user.save();
    req.session.user_id= user._id;
    req.session.username=user.username;

    res.redirect('/home');
})



app.get('/signin',(req,res)=>{
    if(req.session.user_id) 
    {
        return res.redirect('/home');
    }

    res.render('signin');
})
app.post('/signin',async(req,res)=>{
    const {username,password}=req.body;
    const user=  await User.findOne({ username });
    if(user==null)
    {
        return res.send('<script>alert("Incorrect Username Or Password"); window.location="/signin";</script>');
        return res.render('signin');
    }
    const validpassword= await bcrypt.compare(password,user.password);
    if(validpassword)
    {
            req.session.user_id= user._id;
            req.session.username=user.username;
            res.redirect('/home');
    }
    else{
         return res.send('<script>alert("Incorrect Username Or Password"); window.location="/signin";</script>')
         res.render('signin');
    }
})



app.post('/logout',(req,res)=>{
    req.session.user_id=null;
    res.redirect('/signin');
})


//DIFFERENT CATEOGIRIES

app.get('/',(req,res)=>{
    res.redirect('/signin');
})

app.get('/home',async (req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    const game=await Game.find({});
    const username=req.session.username;
    const admin=await Admin.findOne({adminname:username});
    res.render('home',{ game,admin});
})
app.post('/home',async(req,res)=>{
    const game=await Game.find({});
    const username=req.session.username;
    const admin=await Admin.findOne({adminname:username});
    res.render('home',{ game,admin});
})


app.get('/cars',async (req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    const game=await Game.find({});
    res.render('cars',{ game});
})
app.post('/cars',async(req,res)=>{
    const game=await Game.find({});
    res.render('cars',{ game });
})


app.get('/arcade',async (req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    const game=await Game.find({});
    res.render('arcade',{ game});
})
app.post('/arcade',async(req,res)=>{
    const game=await Game.find({});
    res.render('arcade',{ game });
})


app.get('/jump&run',async (req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    const game=await Game.find({});
    res.render('jump&run',{ game});
})
app.post('/jump&run',async(req,res)=>{
    const game=await Game.find({});
    res.render('jump&run',{ game });
})



app.get('/cards',async (req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    const game=await Game.find({});
    res.render('cards',{ game});
})
app.post('/cards',async(req,res)=>{
    const game=await Game.find({});
    res.render('cards',{ game });
})


app.get('/racing',async (req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    const game=await Game.find({})
    res.render('racing',{ game});
})
app.post('/racing',async(req,res)=>{
    const game=await Game.find({});
    res.render('racing',{ game });
})

app.get('/addnew',(req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    res.render('addnew');
})
app.post('/addnew',async (req,res)=>{
    const newgame=new Game(req.body);

    await newgame.save();
    res.render('addnew');
})


app.get('/addadmin',(req,res)=>{
    if(!req.session.user_id) 
    {
        return res.redirect('/signin');
    }
    res.render('addadmin');
})

app.post('/addadmin',async(req,res)=>{
    
    const newadmin=new Admin(req.body);
    await newadmin.save();
    res.render('addadmin');
})

app.get('/', (req,res)=>{
    res.redirect('/signin');
})

app.listen(3000,() =>{
    console.log('PORT:3000 SERVING YOUR APP!!!');
})




