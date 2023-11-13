import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home'; // Create Home component
import NotFound from './core/pageNotFound'; // Create NotFound component

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
