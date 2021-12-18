import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Title>
            <Link to="/">
                CINEFLEX
            </Link>
        </Title>

    );
}

const Title = styled.header`
    width: 100vw;
    height: 8vh;

    background-color: #C3CFD9;

    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 34px;
    line-height: 40px;

    a { 
        color: #E8833A;
        cursor: pointer;
        text-decoration: none;
    }

`;