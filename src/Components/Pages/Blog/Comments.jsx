import React, {useRef, useState} from 'react';
import {Alert, Avatar, IconButton, Tooltip} from "@mui/material";
import {blue, deepPurple, pink} from "@mui/material/colors";
import {Input, Button} from "@mui/joy";
import {axiosConfig} from "../../../config";
import AutoFixHigh from "@mui/icons-material/AutoFixHigh";
import DeleteSweep from "@mui/icons-material/DeleteSweep";



const Comments = ({owner, comments, ownerEmail, articleId}) => {
    const [comment, setComment] = useState(comments);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(false);
    const [newContent, setNewContent] = useState("");
    const [modifable, setModifable] = useState(false);
    const [colors, setColors] = useState({});
    const commentRef = useRef(null);

    const blueHighlight ={
        color: blue[500],
        fontsize: 40
    };

    const grayHighlight={
        fontsize: 40
    };

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

    const handleDelete = (e) => {
        console.log(e.id);
        axiosConfig.delete('http://localhost:3030/commentaire/'+e.id).then((res)=>{
            console.log(res.data);
            setComment(comment.filter((c) => c.id !== e.id))
        })
    };

    const handleModify = (e) => {
        if(modifable===false){
            setModifable(true);
            setColors(blueHighlight);
        }else{
            console.log(newContent);
            axiosConfig.patch('http://localhost:3030/commentaire/'+e.id, {
                contenu: newContent,
            })
            setModifable(false);
            setColors(grayHighlight);
        }

    }
    return (
            <div>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column col-md-8">
                <hr/>
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>Comments({comment.length})</h5>
                    </div>
                    <hr/>
                    <form onSubmit={handleSubmit}></form>
                        <div style={{display: "flex", flexDirection: "row", width: '100%', justifyContent: 'space-between'}}>
                            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 3 }}>N</Avatar>
                            <Input onChange={(e)=>setNewComment(e.target.value)} placeholder="Commentaire" value={newComment} fullWidth={true} endDecorator={<Button onClick={handleSubmit} variant="plain">Commenter</Button>} variant="outlined" color="info" /></div>
                    {error && <><br/><Alert severity="error">Commentaire est vide!</Alert></>}
                    <hr/>
                            {comment.map((e)=>(<div key={e.id} className="commented-section mt-2">
                                <div className="d-flex flex-row align-items-center justify-content-between commented-user">
                                    <h5 className="mr-2">{e.email}</h5><span className="dot mb-1">
                                    {e.email !== ownerEmail ?
                                                owner &&
                                                <Tooltip title="Supprimer">
                                                    <IconButton onClick={() => handleDelete(e)}>
                                                        <DeleteSweep sx={{color: pink[500], fontsize: 40}}/>
                                                    </IconButton>
                                                </Tooltip>

                                             : (
                                                <>
                                                    <Tooltip title="Modifier">
                                                        <IconButton onClick={()=>handleModify(e)}>
                                                            <AutoFixHigh sx={colors}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Supprimer">
                                                        <IconButton onClick={() => handleDelete(e)}>
                                                            <DeleteSweep sx={{ color: pink[500], fontsize: 40 }}/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            )}
                                </span></div>
                                <div className="comment-text-sm"><span contentEditable={modifable} ref={commentRef} onInput={(e)=>{setNewContent(e.target.textContent)}} suppressContentEditableWarning={true}>{e.contenu}</span></div>
                                <hr/>
                            </div>))
                            }
                </div>
            </div>
        </div>
    );
};

export default Comments;
