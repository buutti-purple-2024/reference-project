import "./comments.scss"

interface CommentItem {
    post?: {
      id: number;
      desc: string;
      userId: number;
      profilePicture: string;
    };
  }


const Comments: React.FC<CommentItem> = () => {

    // Temp
    const comments = [
        {
            id: 1,
            desc: "Some comment here",
            userId: 1,
            profilePicture: "https://images.pexels.com/photos/20882950/pexels-photo-20882950/free-photo-of-young-woman-holding-a-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            desc: "Some another comment here",
            userId: 2,
            profilePicture: "https://images.pexels.com/photos/17340544/pexels-photo-17340544/free-photo-of-a-man-giving-a-hand-to-a-woman-in-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
    ];
    return (
        <div className="comments">{
            comments.map(comment=>(
                <div className="comment">
                <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.desc}</span>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
                
            ))
}</div>
    )
}

export default Comments;