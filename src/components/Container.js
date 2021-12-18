import styled from 'styled-components';


export default function Container() {
    return (
        <MovieContainer />
    );
}

const MovieContainer = styled.main`
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100%;

    padding-top: 10vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: lightcoral;

    z-index: -1;
`;