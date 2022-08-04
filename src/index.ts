import express, { Request, Response, NextFunction } from 'express';
import shellExec from 'shell-exec'

const { exec } = require("child_process");

const app = express();

app.use('/images', express.static('images'));
app.set("jsonp callback", true);

app.get('/', (request:Request, response:Response, next: NextFunction) => {
  
  response.send('welcome!');
});


app.get('/tw', async (request:Request, response:Response, next: NextFunction) => {
  let resJosn= {  }
  shellExec('/home/spacebank/twright/tw.sh').then( 
    console.log
  ).catch (
    console.log
  )
  resJosn = {
    code: 'S001',
    message:'Success'
}
response.jsonp(resJosn)
  // response.send(request.query.callback + '('+ JSON.stringify(resJosn) + ');');

});


// app.get('/:id', async (request:Request, response:Response, next: NextFunction) => {
//   const json = {
//     id: request.params.id,
//     pwd:'b'
//   }
//   response.json(json)
// });

app.listen('3000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 3000
  ################################################
`);
});