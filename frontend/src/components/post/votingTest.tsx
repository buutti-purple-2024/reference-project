import { useState } from "react";

export default function VotingButtons() {
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    
    const [voteSum, setVoteSum] = useState(23)
    

    function toggleUpVote(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        setUpVoted(!upVoted);
        upVoted ? setVoteSum(voteSum - 1) : setVoteSum(voteSum + 1);
        console.log("up voted:" + upVoted);
    }

    function toggleDownVote(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        setDownVoted(!downVoted);
        downVoted ? setVoteSum(voteSum + 1) : setVoteSum(voteSum - 1);
        console.log("down voted:" + downVoted);
    }
  
    return (
      <div>
        <button onClick={(e) => toggleUpVote(e)}>
        {upVoted ? "upvoted<3" : "--up vote--"}
        </button>
        
        <button onClick={(e) => toggleDownVote(e)}>
        {downVoted ? "downvoted:<" : "-down vote-"}
        </button>

        <div>votes: {voteSum}</div>
      </div>
    );

}