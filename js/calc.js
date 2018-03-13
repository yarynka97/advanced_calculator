var Calc = React.createClass({
    getDefaultProps: function () {
        return {
            buttons: [
                { id: "addition", text: "+" },
                { id: "subtraction", text: "-" },
                { id: "multiplication", text: "*" },
                { id: "division", text: "/" },
                { id: "getResult", text: "=" },
                { id: "middle", text: "Mid" },
                { id: "width", text: "Wid" },
                { id: "radius", text: "Rad" },
                { id: "absolute", text: "Max" }
            ]
        }
    },
    getInitialState: function () {
        return {
            secondInputDisabled: true,
            correct: false,
            action: '',
            values:[]
        };
    },
    handleCorrectCheck: function (correct) {
        this.state.correct = correct;
        console.log(this.state.correct);
    },
    setValues: function (values) {
        this.state.values = values;
        console.log(this.state.values);
    },
    render: function () {
        return (
            <div className="calc-area">
                <InputArea
                    disabledField={this.state.secondInputDisabled}
                    onCorrectCheck={this.handleCorrectCheck}
                    onValuesEntrance={this.setValues}
                    action={this.state.action}
                />
            </div>
        );
    }
});

var InputArea = React.createClass({
    
    render: function () {
        return (
            <div className="input-area">
                <InputField
                    key="first"
                    onCorrectCheck={this.props.onCorrectCheck}
                    onValuesEntrance={this.props.onValuesEntrance}
                    disabled={false}
                />
                <p>Enter blah blah</p>
                <InputField
                    key="second"
                    disabled={this.props.disabledField}
                    onCorrectCheck={this.props.onCorrectCheck}
                    onValuesEntrance={this.props.onValuesEntrance}
                />
                <span>{this.props.action}</span>
            </div>
        );
    }
});

var InputField = React.createClass({
    handleTextChange: function (event) {
        var inputText = event.target.value;
        var values = inputText.split(',');
        var correct = false;
        if (values.length === 2) {
            if (!isNaN(Number.parseFloat(values[0])) && !isNaN(Number.parseFloat(values[1]))) {
                correct = true;
            }        
        }

        this.props.onCorrectCheck(correct);
        if (correct) this.props.onValuesEntrance(values);
    },
    render: function () {
        return (
            <input type="text" onChange={this.handleTextChange} disabled={this.props.disabled} />
        )
    }
});


var ActionChoiceAria = React.createClass({
    render: function () {
        return (
            <p>ButtonArea</p>
        );
    }
});

var Button = React.createClass({
    render: function () {
        return (
            <p>Button</p>
        );
    }
});

ReactDOM.render(
    <Calc />,
    document.getElementById("calc")
);