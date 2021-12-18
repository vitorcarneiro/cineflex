import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

export default function MovieSelection() {

    function GenerateMoviesList() {
        const [movies, setMovies] = useState(null);
    
        useEffect( () => {
            const promisse = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");
    
            promisse.then( response => {
                console.log(response.data);
                setMovies(response.data);
            });
        }, []);
    
        if(movies === null) {
            return <Loading />;
        }
    
        return (
            <MoviesList>
                {movies.map(( {id, title, posterURL} ) => 
                    <Movie>
                        <Link to={`/sessions/${id}`}>
                            <img src={posterURL} alt={title}/>
                        </Link>
                    </Movie>)}
            </MoviesList>
        );
    }

    return (
        <Container>
            <TextMovieSelection>
                Selecione o filme
            </TextMovieSelection>

            <GenerateMoviesList />
        </Container>
    );
}

const Container = styled.main`
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

const TextMovieSelection = styled.h1`
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

const MoviesList = styled.ul`
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 35px;
    
    padding: 0px;
    list-style-type: none;
`;

const Movie = styled.li`
    height: 193px;
    width: 129px;
    background-color: white;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 8px;
    
    img {
        height: 100%;
    }
`;