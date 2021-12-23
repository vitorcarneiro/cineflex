import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import Loading from './Loading';

export default function SeatSelection({buyerMovieInfo}) {

    function seatNotAvailable() {
        alert("This seat is not available! Please choose another one.");
    };

    function GenerateSeats() {
        const [session, setSession] = useState(null);
        const { idSession } = useParams();

        const [seatsIdsSelected, setSeatsIdsSelected] = useState([]);
        let selectedIdsSeats = [];
        
        const [seatsName, setSeatsName] = useState([]);
        let selectedNamesSeats = [];

        const [buyerName, setBuyerName] = useState("");
        const [buyerCPF, setBuyerCPF] = useState("");

        let allowedToBook = false;
        let redirection = "";
        let success = {};

        function exportData() {
            buyerMovieInfo(success);
        }

        function isAllowedToBook() {
            return allowedToBook;
        }

        function updateSelectedSeats(seatId, seatNumber) {
            seatNumber = parseInt(seatNumber);

            if (seatsName.includes(seatNumber)) {
                const seatIndex = seatsName.indexOf(seatNumber);

                seatsName.splice(seatIndex, 1);
                seatsIdsSelected.splice(seatIndex, 1);

                selectedNamesSeats = [...seatsName];
                selectedIdsSeats = [...seatsIdsSelected];

                setSeatsName(selectedNamesSeats);
                setSeatsIdsSelected(selectedIdsSeats);
    
                return;
            }

            selectedIdsSeats = [...seatsIdsSelected];
            selectedIdsSeats.push(seatId);
            setSeatsIdsSelected(selectedIdsSeats);

            selectedNamesSeats = [...seatsName];
            selectedNamesSeats.push(seatNumber);
            setSeatsName(selectedNamesSeats);
        };

        function validateMovieBooking(userSeats, name, cpf) {
            if (name !== buyerName) {
                setBuyerName(name);
            }
            
            if (cpf !== buyerCPF) {
                setBuyerCPF(cpf);
            }
            
            if (userSeats.length >= 1 && buyerName.length >= 2 && buyerCPF.length === 11) {
                success =
                {
                    buyerSeatsAndData: { ids: seatsIdsSelected, name: buyerName, cpf: buyerCPF},
                    seatsName: seatsName,
                    movieTitle: session.movie.title,
                    date: session.day.date,
                    weekday: session.day.weekday,
                    time: session.name
                }

                redirection = "/success";
                allowedToBook = true;

            }  else {
                redirection = "";
                allowedToBook = false;
            }
        }

        useEffect(() => {
        const promisse = axios.get(
            `https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`
        );
    
        promisse.then((response) => {
            setSession(response.data);
        });
        }, [seatsIdsSelected, idSession]);

        if (!session) return (<Loading />);

        validateMovieBooking(seatsIdsSelected, buyerName, buyerCPF);

        return (
        <> 
            <SeatsPageContainer>
                <Seats>
                    {session.seats.map(({name: seatNumber, isAvailable, id: seatId}) => 
                        <Seat onClick={() => isAvailable ? updateSelectedSeats(seatId, seatNumber) : seatNotAvailable()}
                                className={`${ seatsIdsSelected.includes(seatId) ? "selected" : (isAvailable === true ? ("available") : ("unavailable"))}`} >
                            
                            {seatNumber >= 1 && seatNumber <= 9 ? (
                                "0" + seatNumber
                            ) : (
                                seatNumber
                            )}

                        </Seat>
                    )}
                </Seats>

                <InfoCircleBox>
                    <InfoCircleDescription>
                        <InfoCircle className="selected" />
                            Selecionado
                    </InfoCircleDescription>

                    <InfoCircleDescription>
                        <InfoCircle className="available" />
                            Disponível
                    </InfoCircleDescription>

                    <InfoCircleDescription>
                        <InfoCircle className="unavailable" />
                            Indisponível
                    </InfoCircleDescription>
                </InfoCircleBox>

                <BuyerInputContainer>
                    <BuyerInputBox>
                        <InputInfo>
                            Nome do comprador:
                        </InputInfo>
                        <input placeholder="Digite seu nome..."  onChange={event => validateMovieBooking(seatsIdsSelected, event.target.value, buyerCPF)} value={buyerName} ></input>
                    </BuyerInputBox>

                    <BuyerInputBox>
                        <InputInfo>
                            CPF do comprador:
                        </InputInfo>
                        <input placeholder="Digite seu CPF..."  onChange={event => validateMovieBooking(seatsIdsSelected, buyerName, event.target.value) }  value={buyerCPF}></input>
                    </BuyerInputBox>
                </BuyerInputContainer>

                <ButtonConcluded>
                    <Link onClick={event => isAllowedToBook() ? exportData() : alert('Something is wrong')} to={redirection}>
                        Reservar assento(s)    
                    </Link>
                </ButtonConcluded>
            </SeatsPageContainer>

            <BottomBar>
                <MovieContentContainer>
                    <MoviePoster>
                        <img src={session.movie.posterURL} alt={session.movie.overview}/>
                    </MoviePoster>

                    <MovieInformation>
                        <MovieTitle>
                            {session.movie.title}
                        </MovieTitle>
                        <MovieSessionInfo>
                            {`${session.day.weekday} - ${session.name}`}
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
    justify-content: flex-start;
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

const SeatsPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .selected {
        background-color: #8DD7CF;
        border: 1px solid #1AAE9E;
    }
    .available {
        background-color: #C3CFD9;
        border: 1px solid #7B8B99;
    }
    .unavailable {
        background-color: #FBE192;
        border: 1px solid #F7C52B;
    }
`;

const Seats = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    width: 360px;

    padding: 0;
    list-style-type: none;
`;

const Seat = styled.li`
    width: 26px;
    height: 26px;
    
    margin-bottom: 10px;
    
    border-radius: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    cursor: pointer;
`;


const InfoCircleBox = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 332px;
`;

const InfoCircle = styled.div`
    width: 25px;
    height: 25px;

    border-radius: 50%;
`;

const InfoCircleDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: -0.013em;

    color: #4E5A65;
`;

const BuyerInputContainer = styled.div`
    width: 327px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    gap: 10px;
`;

const BuyerInputBox = styled.div`
    display: flex;
    flex-direction: column;

    input {
        height: 51px;
        outline: none;

        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 3px;

        padding-left: 18px;
    }

    input::placeholder {
        font-family: Roboto;
        font-style: italic;
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;

        color: #AFAFAF;
    }
`;

const InputInfo = styled.span`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;

    color: #293845;
`;

const ButtonConcluded = styled.div`
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







