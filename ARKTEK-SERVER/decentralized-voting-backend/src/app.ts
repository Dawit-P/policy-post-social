import express from 'express';
import bodyParser from 'body-parser';
import { setVoteRoutes } from './routes/voteRoutes';
import { connectToDatabase } from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
connectToDatabase();

// Routes
setVoteRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});