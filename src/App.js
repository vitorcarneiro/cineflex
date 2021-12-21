import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from './components/Header';
import MovieSelection from './components/MovieSelection';
import DateTimeSelection from './components/DateTimeSelection';
import SeatSelection from './components/SeatSelection';
import Success from './components/Success';

export default function App() {

    const [buyerData, setBuyerData] = useState();

    function buyerMovieInfo(data) {
        setBuyerData(data);
    }

    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={ <MovieSelection /> }></Route>
                    <Route path="/sessions/:idMovie" element={ <DateTimeSelection /> }></Route>
                    <Route path="/seats/:idSession" element={ <SeatSelection buyerMovieInfo={buyerMovieInfo} /> }></Route>
                    <Route path="/success" element={ <Success buyerMovieData={buyerData} /> }></Route>
                </Routes>
        </BrowserRouter>
    );
}
