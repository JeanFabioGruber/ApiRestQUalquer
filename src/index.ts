import express from 'express';
import {AppDataSource} from "./data-source"
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(routes)


AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!');
}).catch((err) => {
    console.error('Error during Data Source initialization:', err);
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
