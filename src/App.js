import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import MovieSelection from './components/MovieSelection';
import DateTimeSelection from './components/DateTimeSelection';
import SeatSelection from './components/SeatSelection';

export default function App() {

    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={ <MovieSelection /> }></Route>
                    <Route path="/sessions/:idMovie" element={ <DateTimeSelection /> }></Route>
                    <Route path="/seats/:idSection" element={ <SeatSelection /> }></Route>
                </Routes>
        </BrowserRouter>
    );
}
