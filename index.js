const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors,errorHandler, boomerrorHandler }=require('./middlewares/error.handler');

const app = express();
const port = 3000;
//const port=process.env.PORT||3000;


app.use(express.json());
const whitelist = ['http://localhost:8080','https://myapp.co'];
const options = {
origin: (origin, callback)=>{
  if(whitelist.includes(origin)||!origin){
//if (whitelist.includes(origin)){
      callback(null,true);
    } else {
      callback(new Error ('no permitido noonoooonooooooooo nooo'));
    }
  }
}
//app.use(cors());
app.use(cors(options));




app.get('/', (req, res) => {
  res.send('Hola mi server en express ch4');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomerrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
