const mongoose=require('mongoose');
const Chat = require('./models/chats');

main().then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

 let Allchats=[
    {
    from: 'Alice',
    to: 'Bob',
    message: 'Hello Bob!',
    created_At: new Date()
    },
    {
    from: 'Bob',
    to: 'Alice',
    message: 'Hi Alice!',
    created_At: new Date()
    },
    {from: 'Alice',
    to: 'Bob',      
    message: 'How are you?',
    created_At: new Date()
    },
    {from: 'Bob',
    to: '   Alice',      
    message: 'I am fine, thanks! How about you?',       
    created_At: new Date()
    }
];
Chat.insertMany(Allchats)
