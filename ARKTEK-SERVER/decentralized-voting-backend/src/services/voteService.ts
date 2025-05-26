import { Vote } from '../models/vote';

export class VoteService {
    async castVote(voterId: string, candidateId: string): Promise<Vote> {
        const newVote = new Vote({
            voterId,
            candidateId,
            timestamp: new Date(),
        });
        await newVote.save();
        return newVote;
    }

    async fetchVotes(): Promise<Vote[]> {
        return await Vote.find();
    }

    async removeVote(voteId: string): Promise<void> {
        await Vote.findByIdAndDelete(voteId);
    }
}