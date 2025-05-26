
import { useState } from "react";
import NavBar from "@/components/NavBar";
import VoteCard from "@/components/VoteCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Vote } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VotingProps {
  onLogout: () => void;
}

const Voting = ({ onLogout }: VotingProps) => {
  const [selectedParty, setSelectedParty] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const parties = [
    {
      id: 1,
      name: "Democratic Party",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      description: "Progressive policies focusing on social justice, climate action, and economic equality. Committed to expanding healthcare access and supporting working families.",
      color: "blue",
      voteCount: 2847,
      percentage: 42.3
    },
    {
      id: 2,
      name: "Republican Party",
      logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop",
      description: "Conservative values emphasizing limited government, free market principles, and traditional family values. Strong national defense and fiscal responsibility.",
      color: "red",
      voteCount: 2156,
      percentage: 32.1
    },
    {
      id: 3,
      name: "Green Party",
      logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
      description: "Environmental sustainability, renewable energy, and social justice. Advocating for urgent climate action and sustainable economic policies.",
      color: "green",
      voteCount: 892,
      percentage: 13.2
    },
    {
      id: 4,
      name: "Libertarian Party",
      logo: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=100&h=100&fit=crop",
      description: "Maximum individual liberty, minimal government intervention, and free market capitalism. Personal responsibility and constitutional rights.",
      color: "yellow",
      voteCount: 567,
      percentage: 8.4
    },
    {
      id: 5,
      name: "Independent",
      logo: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=100&h=100&fit=crop",
      description: "Non-partisan approach focusing on practical solutions over party politics. Evidence-based policy making and bipartisan cooperation.",
      color: "purple",
      voteCount: 268,
      percentage: 4.0
    }
  ];

  const totalVotes = parties.reduce((sum, party) => sum + party.voteCount, 0);

  const handlePartySelect = (partyId: number) => {
    if (!hasVoted) {
      setSelectedParty(partyId);
    }
  };

  const handleVoteSubmit = () => {
    if (selectedParty && !hasVoted) {
      setShowConfirmDialog(true);
    }
  };

  const confirmVote = async () => {
    setIsVoting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasVoted(true);
      setShowConfirmDialog(false);
      
      toast({
        title: "Vote Submitted Successfully!",
        description: "Thank you for participating in the democratic process.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const selectedPartyData = parties.find(p => p.id === selectedParty);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-600 rounded-full">
              <Vote className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {hasVoted ? "Voting Results" : "Cast Your Vote"}
          </h1>
          <p className="text-lg text-gray-600">
            {hasVoted 
              ? "Thank you for voting! Here are the current results."
              : "Choose the political party that best represents your values"
            }
          </p>
        </div>

        {/* Voting Stats */}
        {hasVoted && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Election Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {totalVotes.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Total Votes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">87.3%</div>
                  <div className="text-sm text-gray-500">Voter Turnout</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-sm text-gray-500">Parties</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Voting Status Alert */}
        {!hasVoted && selectedParty && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              You have selected <strong>{selectedPartyData?.name}</strong>. 
              Click "Submit Vote" to confirm your choice.
            </AlertDescription>
          </Alert>
        )}

        {hasVoted && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your vote has been recorded for <strong>{selectedPartyData?.name}</strong>.
            </AlertDescription>
          </Alert>
        )}

        {/* Parties List */}
        <div className="space-y-4 mb-8">
          {parties.map((party) => (
            <VoteCard
              key={party.id}
              party={party}
              isSelected={selectedParty === party.id}
              hasVoted={hasVoted}
              onSelect={handlePartySelect}
            />
          ))}
        </div>

        {/* Vote Button */}
        {!hasVoted && (
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleVoteSubmit}
              disabled={!selectedParty}
              className="px-8 py-3 text-lg"
            >
              Submit Vote
            </Button>
            {!selectedParty && (
              <p className="text-sm text-gray-500 mt-2">
                Please select a party to continue
              </p>
            )}
          </div>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Your Vote</DialogTitle>
              <DialogDescription>
                Are you sure you want to vote for <strong>{selectedPartyData?.name}</strong>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
                disabled={isVoting}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmVote}
                disabled={isVoting}
              >
                {isVoting ? "Submitting..." : "Confirm Vote"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Voting;
