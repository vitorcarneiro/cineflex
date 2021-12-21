import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import Loading from './Loading';

export default function Success({buyerMovieData}) {

    console.log(buyerMovieData);


    const [successPage, setSuccessPage] = useState(null);

    useEffect(() => {
    const promisse = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, buyerMovieData.buyerSeatsAndData);

    promisse.then(() => {
        setSuccessPage(buyerMovieData);
    });
    }, []);

    if (!successPage) return (<Loading />);

    console.log(buyerMovieData);

    return (
        <Container>
            <SuccessText>
             Pedido feito com sucesso!
            </SuccessText>

            <MovieInfo>
                <InfoTitle>
                    Filme e sessão
                </InfoTitle>

                <DataMovie>
                    {buyerMovieData.movieTitle} <br />
                    {buyerMovieData.date} {buyerMovieData.time}
                </DataMovie>
            </MovieInfo>

            <SeatsInfo>
                <InfoTitle>
                    Ingressos
                </InfoTitle>

                <DataSeats>
                    {buyerMovieData.buyerSeatsAndData.ids.map((seat) =>
                        <span>
                            Assento {seat} <br />
                        </span>
                    )}
                </DataSeats>
            </SeatsInfo>

            <BuyerInfo>
                <InfoTitle>
                    Comprador
                </InfoTitle>

                <DataBuyer>
                    Nome: {buyerMovieData.buyerSeatsAndData.name} <br />
                    CPF: {buyerMovieData.buyerSeatsAndData.cpf}
                </DataBuyer>
            </BuyerInfo>

            <ButtonHome>
                    <Link to="/">
                        Voltar para Home
                    </Link>
            </ButtonHome>


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

const SuccessText = styled.h1`
    padding: 0 100px;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #247A6B;
`;

const MovieInfo = styled.div`
    width: 100%;
    height: auto;

    padding-left: 30px;
`;


const InfoTitle = styled.h2`
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.04em;
    text-align: left;
    
    color: #293845;
    `;

const DataMovie = styled.span`
    font-family: Roboto;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0.04em;
    text-align: left;
`;

const SeatsInfo = MovieInfo;
const DataSeats = DataMovie;

const BuyerInfo = MovieInfo;
const DataBuyer = DataMovie;

const ButtonHome = styled.div`
    width: 225px;
    height: 42px;
    
    margin-top: 30px;
    
    display: flex;
    align-items: center;
    
    background-color: #E8833A;
    border-radius: 3px;
    justify-content: center;

    a {
        text-decoration: none;

        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;
        color: #FFFFFF;
    }

    &:hover {
        cursor: pointer;
    }
`;