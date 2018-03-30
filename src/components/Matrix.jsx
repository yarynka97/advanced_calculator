import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputField from './InputField';
import Button from './Button';


class Matrix extends React.Component{
    constructor(props){
        super(props);
    }
    state ={
        answer: []
    }
    answerFound = () => {
        this.setState({ answer: sessionStorage.getItem('answer') });
    }
    
    render () {
        return (
            <div className="calc-area">
                <h2 className="card-header">SLAE Calculator</h2>
                <p className='explanation tip'>Solves the system of linear algebraic equations 2x2 for interval numbers</p>
                <div className="input-area card-body">
                    <p className='lead field-header'>a11: </p>
                    <p className='lead field-header'>a12: </p>
                    <InputField
                        key="a11"
                        id="a11"
                    />
                    <InputField
                        key="a12"
                        id="a12"
                    />
                    <p className='lead field-header'>a21: </p>
                    <p className='lead field-header'>a22: </p>
                    <InputField
                        key="a21"
                        id="a21"
                    />
                    <InputField
                        key="a22"
                        id="a22"
                    />
                    <p className='tip'>Enter interval numbers for matrix A</p>
                    <p className='lead field-header'>b1: </p>
                    <p className='lead field-header'>b2: </p>
                    <InputField
                        key="b1"
                        id="b1"
                    />
                    <InputField
                        key="b2"
                        id="b2"
                    />
                    <p className='tip'>Enter interval numbers for matrix B</p>
                </div>
                <Button
                    key="solveMatrix"
                    className="btn btn-success one-step"
                    onAnswerFound={this.answerFound}
                >Solve</Button>
                <div className="card-body">
                    <h3 className="card-title">Result</h3>
                    <p className="card-text answer"> {this.state.answer}</p>
                </div>
            </div>
        )
    }
};

export default Matrix;