const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//const path = require('path');

const blogRoutes = require('./routes/blogRoutes');

const app = express();
const dbURI = 'mongodb://0.0.0.0:27017/blogging_website';

mongoose.connect(dbURI,
    {useNewUrlParser: true,
    useUnifiedTopology:true})//for deprecation warnings
    .then((result) =>app.listen(5000)) //promise
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');
app.set('views','views')
// (path.join(__dirname, 'public'))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req,res)=>{
//     const blog = new Blog({
//         title:'new blog 2',
//         author:'Divya',
//         snippet:'about my new blog',
//         body: 'more about my new blog'
//     });  
//     blog.save() //asynchronous that's why we have to make promise
//         .then((result) =>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// });

// //to retrieve all the documents from collection
// app.get('/all-blogs', (req,res)=>{
//     Blog.find()
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// })

// //to retrieve single document
// app.get('/single-blog', (req,res)=>{
//     Blog.findById('645fae8205210677dfca811b')
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// })

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
