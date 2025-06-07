const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Chat = require('./models/chats'); // Assuming you have a Chat model defined in models/chats.js

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get('/chats',async(req,res)=>{
  let chats=await Chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
});

app.get('/chats/new'  ,(req,res)=>{
  res.render("new.ejs");
});

app.post('/chats',(req,res)=>{
 let {from, to, message} = req.body;
 let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_At: new Date()
 })

 newChat
 .save()
 .then(res=>{
  {
    console.log('Chat saved successfully')
  }}) 
  .catch(err =>
  {
    console.error('Error saving chat:', err);
  })
 res.redirect('/chats');
});


//edit Route

app.get('/chats/:id/edits',async (req,res)=>{
  let {id}=req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});
});

//update Route

app.put('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let { message } = req.body;  // 👈 match this with `name="message"` in the form

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { message: message },
    { runValidators: true, new: true }
);
  console.log(updatedChat);
  res.redirect('/chats');
});

  //delete Route

app.delete('/chats/:id', async (req, res) =>{
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log('Chat deleted successfully:');
  res.redirect('/chats');
  });




app.get('/',(req,res)=>{
    res.send('Hello, World!');
});

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});