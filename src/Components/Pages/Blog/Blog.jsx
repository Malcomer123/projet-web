import React, {useEffect, useState} from 'react';
import "./Blog.css"
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import Comments from "./Comments";
import {axiosConfig} from "../../../config";
import {useParams} from "react-router-dom";
import {Loading} from "../../";


const Blog = () => {
    const {id} = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosConfig.get('http://localhost:3030/articles/'+id).then((res) =>{
            setData(res.data);
            setLoading(false);
        })
    }, []);

    return (
        <>
        {
            loading ? <Loading/> :
                <div className={"container-content"}>
                    <div className={"blog-header"}>
                        <h1 className={"title"}>{data.titre}</h1>
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
                        </div>
                    </div>
                    <div className={"blog-text"}>
                        <p>{data.contenu}</p>
                        <div className={"blog-pic"}></div>
                    </div>
                    <hr></hr>
                    <Comments comments={data.commentaires} articleId={id}/>
                </div>
        }</>
    );
};

export default Blog;
