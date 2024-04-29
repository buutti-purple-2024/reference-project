import { useState } from "react";
import { mdiArrowUpBoldOutline } from '@mdi/js';
import { mdiArrowUpBold } from '@mdi/js';
import { mdiArrowDownBoldOutline } from '@mdi/js';
import { mdiArrowDownBold } from '@mdi/js';
import Icon from "@mdi/react";
import "./votingButtons.scss"

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
      <div className="votes">

        <button onClick={(e) => toggleUpVote(e)}
          disabled={downVoted}>
          {upVoted 
            ? <Icon path={mdiArrowUpBold} size={1.2} /> 
            : <Icon path={mdiArrowUpBoldOutline} size={1.2} />}
        </button>
        {voteSum}
        <button onClick={(e) => toggleDownVote(e)}
          disabled={upVoted}>
          {downVoted
            ? <Icon path={mdiArrowDownBold} size={1.2} />
            : <Icon path={mdiArrowDownBoldOutline} size={1.2} />}
        </button>

        {/* <div> {voteSum}</div> */}
        
      </div>
    );

}

