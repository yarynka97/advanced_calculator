import React from 'react';
import ReactDOM from 'react-dom';
import Calc from './components/Calc';
import Matrix from './components/Matrix';
require("./style.css");

ReactDOM.render(
    <div>
        <Calc />
        <Matrix />
    </div>,
    document.getElementById("calc")
);

module.hot.accept();