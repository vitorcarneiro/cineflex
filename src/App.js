import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import MovieSelection from './components/MovieSelection';
import DateTimeSelection from './components/DateTimeSelection';
import SeatSelection from './components/SeatSelection';
import Success from './components/Success';

export default function App() {

    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={ <MovieSelection /> }></Route>
                    <Route path="/sessions/:idMovie" element={ <DateTimeSelection /> }></Route>
                    <Route path="/seats/:idSession" element={ <SeatSelection /> }></Route>
                    <Route path="/:success" element={ <Success /> }></Route>
                </Routes>
        </BrowserRouter>
    );
}
