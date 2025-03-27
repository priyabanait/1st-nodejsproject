const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    return res.send('hello');
})
app.get('/ask',(req,res)=>{
    return res.send('Hoow are you?');
})
app.listen(3000,()=>console.log('Server is up and running on port 3000! Ready to handle requests.')
)