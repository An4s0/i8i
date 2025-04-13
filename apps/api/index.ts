import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes';
import config from './config.json';
import connect from './db';
const app = express();

app.use(express.json());

app.use('/', routes);

app.listen(config.port, async () => {
    console.log(`Server is running on port ${config.port}`);
    await connect();
});