const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User=require("./models/user");


app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5baa2528563f16379fc8a610')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


const server=async()=>{
     await mongoose
     .connect(
       'mongodb+srv://mongoose:john123@cluster0.xcjno.mongodb.net/myMongooseDatabase?retryWrites=true&w=majority',{
         useNewUrlParser: true,
         useUnifiedTopology: true 
       }
     )
     .then(users=>{
       const user=new User({
         name:"max",
         email:"max@gmail.com",
         cart:{
           items:[]
         }
       })
      
     })
     .then(result => {
       app.listen(5000,()=>{
         console.log("running on localhost 3000")
       });
     })
     .catch(err => {
       console.log(err);
     });
   
}

server()