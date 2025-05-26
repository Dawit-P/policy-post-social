import { Request, Response } from 'express';
import VoteService from '../services/voteService';

class VoteController {
    private voteService: VoteService;

    constructor() {
        this.voteService = new VoteService();
    }

    public createVote = async (req: Request, res: Response): Promise<void> => {
        try {
            const voteData = req.body;
            const newVote = await this.voteService.castVote(voteData);
            res.status(201).json(newVote);
        } catch (error) {
            res.status(500).json({ message: 'Error creating vote', error });
        }
    };

    public getVotes = async (req: Request, res: Response): Promise<void> => {
        try {
            const votes = await this.voteService.fetchVotes();
            res.status(200).json(votes);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving votes', error });
        }
    };

    public deleteVote = async (req: Request, res: Response): Promise<void> => {
        try {
            const voteId = req.params.id;
            await this.voteService.removeVote(voteId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting vote', error });
        }
    };
}

export default VoteController;