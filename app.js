const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const ngo = require('./models/ngomodels')
const port = 3000;

mongoose.connect('mongodb://localhost:27017/EduNetDB');

const db = mongoose.connection;
db.on(
    "error",
    console.error.bind(console, "DB Connection Error:"));
db.once("open", () =>{
    console.log("Database Connected");
});



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));




app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(morgan('tiny'));




app.get('/', async (req,res) => {
    res.render('main');
});

app.get('/show', async (req,res) => {
    const ngos = await ngo.find({})
    res.render('home', {ngos});
});

app.get('/admin',async (req,res) =>{
    const ngos = await ngo.countDocuments({});
    const ngos_madiga = await ngo.countDocuments({ location : "Madiga"});
    res.render('admin',{ngos,ngos_madiga});
});

app.get('/show/new',async (req,res) =>{
    res.render('newngo');
});

app.post('/show',async (req,res) =>{
    const n = new ngo(req.body.ngo);
    await n.save();
    res.redirect(`/show/${n._id}`)
});


app.get('/show/:id', async (req,res) => {
    const ngoView = await ngo.findById(req.params.id);
    res.render('showngo', {ngoView});
});

app.get('/show/:id/edit', async (req,res) => {
    const ngoView = await ngo.findById(req.params.id);
    res.render('editngo', {ngoView});
});

app.put('/show/:id', async (req,res) => {
    const {id} = req.params;
    const ngoUpdate = await ngo.findByIdAndUpdate(id, {...req.body.ngo});
    res.redirect(`/show/${ngoUpdate._id}`)
});

app.use((req,res)=>{
    res.render('notFound');
})

app.listen(port,
    console.log(`Server is runnig on http://localhost:${port}`)
); 
