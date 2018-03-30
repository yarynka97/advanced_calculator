import React, {Component} from 'react';
import ReactDOM from 'react-dom'

class InputField extends React.Component {
    render () {
        return (
            <input type="text" className="form-control  is-valid" onChange={this.handleTextChange} />
        );
    }


    handleTextChange = (event) => {
        var inputText = event.target.value;
        var name = this.props.id;
        if (inputText) {
            var values = inputText.split(',');
            var correct = false;
            if (values.length === 2) {
                if (!isNaN(Number.parseFloat(values[0])) && !isNaN(Number.parseFloat(values[1]))) {
                    correct = true;
                    if (Number.parseFloat(values[0]) > Number.parseFloat(values[1])) {
                        var c = values[0];
                        values[0] = values[1];
                        values[1] = c;
                    }
                }
            }

            if (correct) {
                sessionStorage.setItem(name, values);
            }
        } else {
            sessionStorage.removeItem(name);
        }
    }
}

export default InputField;