import React, {useEffect, useRef, useState} from 'react';
import "./Blog.css"
import {Alert, AlertTitle, Avatar, IconButton, Tooltip} from "@mui/material";
import {blue, deepPurple, pink} from "@mui/material/colors";
import Comments from "./Comments";
import {axiosConfig} from "../../../config";
import {useParams} from "react-router-dom";
import {Loading} from "../../";
import DeleteSweep from '@mui/icons-material/DeleteSweep';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import jwtDecode from "jwt-decode";
import Cookies from 'js-cookie';


const Blog = () => {
    const {id} = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [owner, setOwner] = useState(false);
    const [newContent, setNewContent] = useState();
    const [newTitle, setNewTitle] = useState();
    const [modifable, setModifable] = useState(false);
    const [ownerEmail, setOwnerEmail] = useState('');
    const [colors, setColors] = useState({});
    const contentRef = useRef(null);
    const titleRef = useRef(null);

    const blueHighlight ={
        color: blue[500],
        fontsize: 40
    };

    const grayHighlight={
        fontsize: 40
    };

    useEffect(() => {
        axiosConfig.get('http://localhost:3030/articles/'+id).then((res) =>{
            setData(res.data.article);
            const userId = jwtDecode(Cookies.get('token'));
            if(userId.userId===res.data.article.auteurId) setOwner(true);
            setOwnerEmail(res.data.emailOwner);
            setLoading(false);
        })
    }, []);

    const handleDelete = (e) => {
          e.preventDefault();
          axiosConfig.delete('http://localhost:3030/articles/'+id).then(()=>{
              window.location.href='/';
          })
    };

    const handleModify = (e) => {
        e.preventDefault();
        if(modifable===false){
            setModifable(true);
            contentRef.current.focus();
            titleRef.current.focus();
            setColors(blueHighlight);
        }else{
            console.log(newContent);
            console.log(newTitle);
            axiosConfig.patch('http://localhost:3030/articles/'+id, {
                contenu: newContent,
                titre: newTitle
            })
            setModifable(false);
            setColors(grayHighlight);

        }

    }

    return (
        <>
        {
            loading ? <Loading/> :
                <>
                    {modifable && <Alert severity="info">
                        <AlertTitle><strong>Mode 'Modification'</strong></AlertTitle>
                        Vous etes dans mode Modification. Vous pouvez modifier le titre et/ou contenu en <strong>cliquant sur le contenu</strong>. Après la modification, veuillez cliquer sur l'icone pour valider.
                    </Alert>}
                <div className={"container-content-blog"}>
                    <div className={"blog-header"}>
                        <h1 contentEditable={modifable} suppressContentEditableWarning={true} ref={titleRef} onInput={(e)=>{setNewTitle(e.target.textContent)}} className={"title"}>{data.titre}</h1>
                        <div className={"title-madeby"}>
                            <Avatar sx={{bgcolor: deepPurple[500]}}>{data.auteur.nom[0]}</Avatar>
                            <div className={"title-madeby-content"}>
                                <div className={"title-madeby-content-user"}>{data.auteur.nom}</div>
                                <div className={"title-madeby-content-date"}>Publié en {new Date(data.createdAt).toLocaleDateString("fr-FR",{
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</div>
                            </div>
                            {owner &&
                                <div>
                                    <Tooltip title="Modifier">
                                        <IconButton onClick={handleModify}>
                                            <AutoFixHigh sx={colors}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Supprimer">
                                        <IconButton onClick={handleDelete}>
                                            <DeleteSweep sx={{ color: pink[500], fontsize: 40 }}/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={"blog-text"}>

                        <p contentEditable={modifable} suppressContentEditableWarning={true} ref={contentRef} onInput={(e)=>{setNewContent(e.target.textContent)}}>{data.contenu}</p>
                        <div className={"blog-pic"}></div>
                    </div>
                </div>
                <Comments comments={data.commentaires} owner={owner} ownerEmail={ownerEmail} articleId={id}/>
                </>
        }</>
    );
};

export default Blog;
