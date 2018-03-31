import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

class ActionChoiceArea extends React.Component{
    render() {
        const { buttons, onAnswerFound } = this.props;

        return (
            <div className="action-area">
                {
                    buttons.map(function (button) {
                        return (
                            <Button
                                key={button.id}
                                className={button.className}
                                onAnswerFound={onAnswerFound.bind(null, button)}
                            >{button.text}</Button>
                        );
                    })
                }
            </div>
        );
    }
};

export default ActionChoiceArea;