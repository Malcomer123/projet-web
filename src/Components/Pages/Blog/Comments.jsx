import React, {useState} from 'react';
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {Input, Button} from "@mui/joy";
import {axiosConfig} from "../../../config";



const Comments = ({comments, articleId}) => {
    const [comment, setComment] = useState(comments);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newComment === "") setError(true);
        else {
            axiosConfig.post('http://localhost:3030/commentaire/', {
                email: '',
                contenu: newComment,
                articleId: parseInt(articleId)
            }).then((res) => {
                console.log(res.data);
                setComment([res.data, ...comment]);
                setNewComment("");
            })
        }
    }

    return (
            <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="d-flex flex-column col-md-8">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>Unread comments({comment.length})</h5>
                    </div>
                    <hr/>
                    <form onSubmit={handleSubmit}></form>
                        <div style={{display: "flex", flexDirection: "row", width: '100%', justifyContent: 'space-between'}}>
                            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 3 }}>N</Avatar>
                            <Input onChange={(e)=>setNewComment(e.target.value)} placeholder="Commentaire" value={newComment} fullWidth={true} endDecorator={<Button onClick={handleSubmit} variant="plain">Commenter</Button>} variant="outlined" color="info" /></div>
                            <hr/>
                            {comment.map((e)=>(<div key={e.id} className="commented-section mt-2">
                                <div className="d-flex flex-row align-items-center commented-user">
                                    <h5 className="mr-2">{e.email}</h5><span className="dot mb-1"></span></div>
                                <div className="comment-text-sm"><span>{e.contenu}</span></div>
                                <hr/>
                            </div>))
                            }
                </div>
            </div>
        </div>
    );
};

export default Comments;
