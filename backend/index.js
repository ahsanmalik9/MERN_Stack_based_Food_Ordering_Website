//running backend on the server
const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")//calling db.js
mongoDB(); // calling function

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

//routes ki madad sy endpoint bnaty hain which good way instead of writing code as a whole
// app.use is the middleware (Middleware means 2 code k drmyan 1 or code run krwana)
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));//this the endpoint 
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.get('/', (req, res) => {       //app.get is one of the endpoint we created
  res.send('Hello World jee!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

