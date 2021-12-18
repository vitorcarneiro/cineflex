//import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import MovieSelection from './components/MovieSelection';

export default function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <MovieSelection /> }></Route>
                {/* <Route path="/sessoes/:idFilme" element={ <DateTimeSelection setScreen={setScreen} /> }></Route>
                <Route path="/assentos/:idSessao" element={ <SeatSelection setScreen={setScreen} /> }></Route> */}
            </Routes>
        </BrowserRouter>

        // <>
        //     {screen === null && movieSelection}
        //     {screen !== null && (
        //     <Page>
        //         {screen === 'dateTimeSelection' && dateTimeSelection}
        //         {screen === 'seatSelection' && seatSelection}
        //         {screen === 'successScreen' && successScreen}
        //     </Page>
        //     )}
        // </>

    );
}
