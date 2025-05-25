
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

interface Party {
  id: number;
  name: string;
  logo: string;
  description: string;
  color: string;
  voteCount: number;
  percentage: number;
}

interface VoteCardProps {
  party: Party;
  isSelected: boolean;
  hasVoted: boolean;
  onSelect: (partyId: number) => void;
}

const VoteCard = ({ party, isSelected, hasVoted, onSelect }: VoteCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? `ring-2 ring-${party.color}-500 bg-${party.color}-50` : ''
      } ${hasVoted && !isSelected ? 'opacity-60' : ''}`}
      onClick={() => !hasVoted && onSelect(party.id)}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Party Logo */}
          <Avatar className="h-16 w-16">
            <AvatarImage src={party.logo} alt={party.name} />
            <AvatarFallback className={`bg-${party.color}-100 text-${party.color}-700 text-lg font-bold`}>
              {party.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Party Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{party.name}</h3>
              {isSelected && (
                <div className={`p-1 rounded-full bg-${party.color}-500`}>
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-gray-600 mb-3 leading-relaxed">{party.description}</p>
            
            {/* Vote Stats */}
            {hasVoted && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Vote share</span>
                  <span className="font-medium">{party.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${party.color}-500 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${party.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {party.voteCount.toLocaleString()} votes
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selection Indicator */}
        {!hasVoted && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <div className={`w-4 h-4 rounded-full border-2 ${
                isSelected 
                  ? `bg-${party.color}-500 border-${party.color}-500` 
                  : 'border-gray-300'
              }`}>
                {isSelected && <Check className="h-2 w-2 text-white mx-auto mt-0.5" />}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoteCard;
