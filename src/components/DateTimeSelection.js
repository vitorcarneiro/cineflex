import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


export default function DateTimeSelection() {
    console.log('entrou1');
    
    function GenerateDateTime() {
        console.log('entrou2');
        const [movieSession, setMovieSession] = useState(null);
        const { idMovie } = useParams();
        console.log(idMovie);
    
        useEffect(() => {
        const promisse = axios.get(
            `https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`
        );
    
        promisse.then((response) => {
            console.log(response.data);
            setMovieSession(response.data);
        });
        }, []);
    
        if (movieSession === null) {
            return (
                <Loading />
            )
        }
        return (
        <>    
            <SessionsList>
                {movieSession.days.map(({weekday, date, showtimes}) => 
                    <Session>
                        <SessionDate>
                            {`${weekday} - ${date}`}
                        </SessionDate>
                        <SessionTimeOptions>
                            {showtimes.map(({name: time, id}) =>
                                <TimeOption>
                                    <Link to={`/seats/${id}`} >
                                        {time}
                                    </Link>
                                </TimeOption>
                            )}
                        </SessionTimeOptions>
                    </Session>
                )}
            </SessionsList>
            
            {/* <BottomBar movieName={selectedMovie.title} movieURL={selectedMovie.posterURL}/> */}
        </>
        );
    }

    return (
        <Container>
            <TextSessionSelection>
                Selecione o horário
            </TextSessionSelection>

            <GenerateDateTime />
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

    padding-top: 10vh;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Loading = styled.div`
    color: yellow;
`;

const TextSessionSelection = styled.h1`
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

const SessionTimeOptions = styled.ul`
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