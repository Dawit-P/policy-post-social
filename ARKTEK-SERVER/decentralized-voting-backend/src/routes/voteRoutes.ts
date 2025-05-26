import { Router } from 'express';
import VoteController from '../controllers/voteController';

const router = Router();
const voteController = new VoteController();

const setVoteRoutes = (app) => {
    app.use('/api/votes', router);

    router.post('/', voteController.createVote);
    router.get('/', voteController.getVotes);
    router.delete('/:id', voteController.deleteVote);
};

export default setVoteRoutes;