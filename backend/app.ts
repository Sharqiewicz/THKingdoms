import http from 'http';
import express from 'express';
import config from './config';
import routes from './routes';

const port = config.server.port;
const hostname = config.server.hostname;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.listen(port, hostname, () => {
    console.log(`%c Server is listening on at http://${hostname}:${port}`, 'color: aqua; font-weight: bold;')

    routes(app);
});



