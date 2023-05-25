import * as React from 'react';
import test from '../../../../assets/test.jpg'
import "./BlogCards.css"
import {Chip, Stack, Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {useEffect, useState} from "react";
import {axiosConfig} from "../../../../config";
import {Loading} from "../../../";
import {NavLink} from "react-router-dom";


const BlogCards = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosConfig.get('http://localhost:3030/articles/?take=10&skip=0').then((res) =>{
            setData(res.data);
            setLoading(false);
            console.log(data);
        })
    }, []);
    return (
        <>
        {
            loading ? <Loading/> :
                <div className={"container-content"}>
                    <h2 className="title">Website Blogs</h2><br/>
                    <div className={"cardsD"}>
                        {data.map((e)=>(
                            <Card sx={{maxWidth: 345}}>
                                <CardMedia
                                    sx={{height: 200}}
                                    className={"card-image"}
                                    image={test}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Stack direction="row" flexWrap={"wrap"} spacing={2}>
                                        {e.categories.map((c) => (
                                            <Chip sx={{marginBottom: 1}} label={c.nom} color="primary"/>
                                            ))
                                        }
                                    </Stack>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <div style={{marginTop: 10, height: 100}}>{e.titre}</div>
                                    </Typography>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: 10}}>
                                        <Avatar sx={{bgcolor: deepPurple[500]}}>{e.auteur.nom[0]}</Avatar>
                                        <div style={{marginLeft: 20}}>{e.auteur.nom}</div>
                                    </div>
                                    <Typography variant="body2" color="text.secondary">
                                        {e.contenu.substring(0,100)}...
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NavLink to={"/blog/"+e.id}><Button size="small">Learn More</Button></NavLink>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </div>
        }
        </>
    );
};

export default BlogCards;
