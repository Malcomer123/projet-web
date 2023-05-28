import * as React from 'react';
import test from '../../../../assets/test.jpg'
import "./BlogCards.css"
import {Chip, Stack, Card, CardActions,TextField,Pagination, InputAdornment, CardContent, CardMedia, Button, Typography, Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {useEffect, useState} from "react";
import {axiosConfig} from "../../../../config";
import {Loading} from "../../../";
import {NavLink} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


const BlogCards = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    useEffect(() => {
        setLoading(true);
        const skip = (page*10)-10;
        console.log(skip);
        axiosConfig.get('http://localhost:3030/articles/?take=10&skip='+skip+'').then((res) =>{
            setData(res.data.articles);
            const count = parseInt(((res.data.count)/10));
            setCount(count);
            setLoading(false);
        })
    }, [page]);

    const handleChange = (e) => {
        e.preventDefault();
        const filtered = data.filter((post)=> post.titre.includes(e.target.value));
        setData(filtered);
    }

    const handlePagination = (e, value) => {
        setPage(value);
    }

    return (
        <>
        {
            loading ? <Loading/> :
                <div className={"container-content"}>
                    <div className={"blog-headerss"}>
                        <h2 className="titles">Website Blogs</h2>
                            <div><Pagination count={count} page={page} onChange={handlePagination} size={"large"} color="secondary" /></div>
                        <div>
                            <TextField
                                id="outlined-adornment-password"
                                label={"Chercher"}
                                onChange={handleChange}
                            sx={{ m: 1, width: '25ch' }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                            }}>
                            </TextField></div> <br/>

                    </div>


                    <div className={"cardsD"}>
                        {data.map((e)=>(
                            <Card key={e.id} sx={{width: 300, maxWidth: 345}}>
                                <CardMedia
                                    sx={{height: 200}}
                                    className={"card-image"}
                                    image={test}
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Stack direction="row" flexWrap={"wrap"} spacing={2}>
                                        {e.categories.map((c) => (
                                            <Chip key={c.id} sx={{marginBottom: 1}} label={c.nom} color="primary"/>
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
