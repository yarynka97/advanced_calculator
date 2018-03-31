import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import InputArea from './InputArea';
import ActionChoiceArea from './ActionChoiceArea';


class Calc extends React.Component{
    static defaultProps = {
            buttons: [
                { id: "middle", text: "Mid", className: "btn btn-success one-step" },
                { id: "width", text: "Wid", className: "btn btn-success one-step" },
                { id: "radius", text: "Rad", className: "btn btn-success one-step" },
                { id: "absolute", text: "Abs", className: "btn btn-success one-step" },
                { id: "addition", text: "+", className: "btn btn-info two-steps" },
                { id: "subtraction", text: "-", className: "btn btn-info two-steps" },
                { id: "multiplication", text: "*", className: "btn btn-info two-steps" },
                { id: "division", text: "/", className: "btn btn-info two-steps" }
            ]
        }
    state = {
        answer: []
    }

    render () {
        return (
            <div className="card border-success mb-3 calc-area">
                <h2 className="card-header">Interval Calculator</h2>
                <p className='explanation tip'>Do simple algebraic calculations for interval numbers</p>
                <InputArea className="card-body" />
                <ActionChoiceArea
                    className="card-body"
                    buttons={this.props.buttons}
                    onAnswerFound={this.receiveAnswer}
                />
                <div className="card-body">
                    <h3 className="card-title">Result</h3>
                    <p className="card-text answer"> {this.state.answer}</p>
                </div>
            </div>
        )
    }


    receiveAnswer = () => this.setState({ answer: sessionStorage.getItem('answer') });
};

export default Calc;