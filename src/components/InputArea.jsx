import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputField from './InputField';


class InputArea extends React.Component{
    render() {
        return (
            <div className="input-area">
                <p className='lead field-header'>First interval</p>
                <p className='lead field-header'>Second interval</p>
                <InputField
                    key="first"
                    id="firstInterval"
                />
                <InputField
                    key="second"
                    id="secondInterval"
                />
                <p className='tip'>Enter an interval a,b using the format as in example: 1,3.4</p>
            </div>
        );
    }
}

export default InputArea;