import express, { Request, Response, NextFunction } from 'express';
import shellExec from 'shell-exec'
import morganMiddleware from './common/morganMiddleware'; 

const app = express();

// app.use(cors());

app.use(morganMiddleware)
app.use('/images', express.static('images'));

// app.set('jsonp callback name', 'jsoncallback')

app.get('/', (request:Request, response:Response, next: NextFunction) => {
  response.send('Home!');
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
  // response.send('callback' + '('+ JSON.stringify(resJosn) + ');');

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