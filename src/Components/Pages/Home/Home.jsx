import React from 'react';
import {HeaderCards, BlogCards} from './HomeComponents'
import "./Home.css"
import {SpeedDial, SpeedDialIcon} from "@mui/material";

const Home = () => {
    return (
        <div className={"home"}>
            <div className={"HeaderPage"}>
                <header>
                    <span>Latest Blogs</span>
                </header>
                <HeaderCards/>
            </div>
            <BlogCards/>
            <SpeedDial
                ariaLabel="Create Blog"
                sx={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    padding: '1px',
                }}
                icon={<SpeedDialIcon onClick={()=> window.location.href='/createblog'} />}/>
        </div>
    );
};

export default Home;
