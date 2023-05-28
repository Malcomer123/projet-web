import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import * as React from "react";
import {InputLabel, Select, MenuItem, Switch, alpha} from "@mui/material";
import {pink} from "@mui/material/colors";
import {useState, useEffect} from "react";
import {axiosConfig} from '../../../config';
import {Loading} from '../../'


const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
            backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
    },
}));

const defaultTheme = createTheme();

export default function CreateBLOG() {
    const [titre, setTitre] = useState("");
    const [categorie, setCategorie] = useState("");
    const [contenu, setContenu] = useState("");
    const [published, setPublished] = useState(true);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosConfig.get('http://localhost:3030/categories').then((res)=>{
            console.log(res.data)
            setCategories(res.data);
            setLoading(false);
        })
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      const data ={
          titre: titre,
          contenu: contenu,
          categorieId: categorie,
          published: published
      }
        console.log(data);
      axiosConfig.post('http://localhost:3030/articles/', data).then((res)=>{
          console.log(res.data);
          window.location.href='/';
      });
    }

    return (
        <>
        {loading ? <Loading/> :
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <>
                                <h2 className="title" style={{fontSize: 35, marginLeft: 10, fontWeight: 'bold', fontFamily: 'Nunito'}}>Create Blog</h2><br/>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address1"
                                            name="address1"
                                            label="Titre"
                                            fullWidth
                                            value={titre}
                                            onChange={(e)=> setTitre((e.target.value))}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            fullWidth
                                            value={categorie}
                                            onChange={(e)=>setCategorie(e.target.value)}
                                            label="Age"
                                        >
                                            {/* eslint-disable-next-line array-callback-return */}
                                            {categories.map((e)=>(
                                                <MenuItem key={e.id} value={e.id}>{e.nom}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="state"
                                            name="state"
                                            label="Content"
                                            fullWidth
                                            value={contenu}
                                            onChange={(e)=> setContenu((e.target.value))}
                                            rows={8}
                                            multiline
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel control={<PinkSwitch value={published} onChange={(e)=>setPublished(e.target.checked)} defaultChecked />} label="Publication" />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                        onClick={handleSubmit}
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </>
                    </Paper>
                </Container>
            </ThemeProvider>
        }</>
    );
}

