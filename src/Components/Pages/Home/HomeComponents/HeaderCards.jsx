import React, {useEffect, useState} from 'react';
import "./HeaderCards.css"
import {Loading} from '../../../'
import {axiosConfig} from "../../../../config";

const HeaderCards = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosConfig.get('http://localhost:3030/articles/?take=3&skip=0').then((res) =>{
            console.log(res)
            setData(res.data);
            setLoading(false);
        })
    }, []);


    return (
        <>
            {loading ? <Loading/> :
                <div className="grid-container">
                    {data.map((e) => (
                        <div className="cardb">
                            <div className={"cardb-text"}>
                                <div className={"cardb-text-title"}>{e.titre}</div>
                                <div className={"cardb-text-date"}>{new Date(e.createdAt).toLocaleDateString("fr-FR",{
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    );
};

export default HeaderCards;
