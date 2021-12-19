import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import Loading from './Loading';

export default function SeatSelection() {
    
    function GenerateSeats() {
        const [seats, setSeats] = useState(null);
        const { idSection } = useParams();
    
        useEffect(() => {
        const promisse = axios.get(
            `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSection}/seats`
        );
    
        promisse.then((response) => {
            setSeats(response.data);
            console.log(response.data);
        });
        }, []);
    
        if (seats === null) return (<Loading />);

        return (
        <>    
            <BottomBar>
                <MovieContentContainer>
                    <MoviePoster>
                        <img src={seats.movie.posterURL} alt={seats.movie.overview}/>
                    </MoviePoster>

                    <MovieInformation>
                        <MovieTitle>
                            {seats.movie.title}
                        </MovieTitle>
                        <MovieSessionInfo>
                            {`${seats.day.weekday} - ${seats.name}`}
                        </MovieSessionInfo> 
                    </MovieInformation>
                </MovieContentContainer>
            </BottomBar>
        </>
        );
    }

    return (
        <Container>
            <TextSeatsSelection>
                Selecione o(s) assento(s)
            </TextSeatsSelection>

            <GenerateSeats />
        </Container>
    );
}

const Container = styled.main`
    background-color: white;

    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: auto;

    padding-top: 100px;
    padding-bottom: 140px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const TextSeatsSelection = styled.h1`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    color: #293845;
    
    margin-bottom: 20px;
    `;

const SessionsList = styled.ul`
    width: auto;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 10px 35px;
    
    padding-left: 25px;
    list-style-type: none;
`;

const Session = styled.li`
    width: auto;
`;

const SessionDate = styled.span`
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.02em;
    text-align: left;
`;

const SessionTimes = styled.ul`
    margin-top: 5px;
    margin-bottom: 15px;
    
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const TimeOption = styled.li`
    width: 83px;
    height: 43px;
    
    background-color: #E8833A;
    border-radius: 3px;
    
    list-style-type: none;
    
    a {
        width: 100%;
        height: 100%;
        
        font-family: Roboto;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0.02em;
        text-align: center;
        color: white;
        
        text-decoration: none;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        &:hover {
            font-size: 22px;
        }
    }
`;

const BottomBar = styled.footer`
    width: 100vw;
    height: 117px;
    
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    
    border-top: 1px solid #9EADBA;
    background-color: #DFE6ED;
    padding: 0 15px;
    
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MovieContentContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const MoviePoster = styled.div`
    width: 64px;
    height: 89px;

    background-color: white;

    border-radius: 3px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 8px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const MovieInformation = styled.div`
    margin: auto 0;
`;

const MovieTitle = styled.div`
    color: #293845;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 30px;

    margin-bottom: 5px;
`;

const MovieSessionInfo = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    line-height: 30px;
    display: flex;
    align-items: center;
`;