import React from 'react';
import ReactDOM from 'react-dom';
import CalcContainer from './components/CalcContainer'
require("./style.css");

ReactDOM.render(
    <CalcContainer />,
    document.getElementById("calc")
);

module.hot.accept();