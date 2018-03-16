var Calc = React.createClass({
    getDefaultProps: function () {
        return {
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
    },
    getInitialState: function () {
        return {
            answer:[]
        }
    },
    componentWillMount: function () {
        sessionStorage.clear();
    },
    receiveAnswer: function () {
        this.setState({ answer: sessionStorage.getItem('answer') });
    },
    render: function () {
        return (
            <div className="card border-success mb-3 calc-area">
                <h2 className="card-header">Interval Calculator</h2>
                <InputArea className="card-body" />
                <ActionChoiceAria
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
});

var InputArea = React.createClass({
    render: function () {
        return (
            <div className="input-area">
                <p className='lead field-header'>First interval</p>
                <p className='lead field-header'>Second interval</p>
                <InputField
                    key="first"
                    id="first"
                />
                <InputField
                    key="second"
                    id="second"
                />
                <p className='tip'>Enter an interval a,b using the format as in example: 1,3.4</p>
            </div>
        )
    }
});

var InputField = React.createClass({
    handleTextChange: function (event) {
        var inputText = event.target.value;
        if (inputText === '') {
            if (this.props.id === "first") {
                sessionStorage.removeItem('firstInterval');
            } else {
                sessionStorage.removeItem('secondInterval');
            }
        } else {
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
                if (this.props.id === "first") {
                    sessionStorage.setItem('firstInterval', values);
                } else {
                    sessionStorage.setItem('secondInterval', values);
                }
            }
        }    
    },
    render: function () {
        return (
            <input type="text" className="form-control  is-valid" onChange={this.handleTextChange} />
        )
    }
});

var ActionChoiceAria = React.createClass({
    render: function () {
        var buttons = this.props.buttons;
        var onAnswerFound = this.props.onAnswerFound;
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
        )
    }
});

var Button = React.createClass({
    getValues: function (string) {
        var arr = string.split(',');
        arr.map((el, index, array) => array[index] = Number.parseFloat(el));
        return arr;
    },
    action: function () {
        var operation = this.props.children;;
        var first = sessionStorage.getItem('firstInterval');
        var second = sessionStorage.getItem('secondInterval');
        var answer = [];
        if (first) {
            var firstInterval = this.getValues(first);
            if (second) {
                var secondInterval = this.getValues(second);

                switch (operation) {
                    case "+":
                        answer[0] = firstInterval[0] + secondInterval[0];
                        answer[1] = firstInterval[1] + secondInterval[1];
                        break;
                    case "-":
                        answer[0] = firstInterval[0] - secondInterval[1];
                        answer[1] = firstInterval[1] - secondInterval[0];
                        break;
                    case "*":
                        answer[0] = Math.min(firstInterval[0] * secondInterval[0], firstInterval[0] * secondInterval[1], firstInterval[1] * secondInterval[0], firstInterval[1] * secondInterval[0]);
                        answer[1] = Math.max(firstInterval[0] * secondInterval[0], firstInterval[0] * secondInterval[1], firstInterval[1] * secondInterval[0], firstInterval[1] * secondInterval[0]);
                        break;
                    case "/":
                        if (secondInterval[0] * secondInterval[1] > 0) {
                            answer[0] = Math.min(firstInterval[0] / secondInterval[0], firstInterval[0] / secondInterval[1], firstInterval[1] / secondInterval[0], firstInterval[1] / secondInterval[0]);
                            answer[1] = Math.max(firstInterval[0] / secondInterval[0], firstInterval[0] / secondInterval[1], firstInterval[1] / secondInterval[0], firstInterval[1] / secondInterval[0]);
                        } else answer[0] = 'Cannot divide this itervals, because second one contains 0';
                        break;
                    default:
                        answer = 'This operation is only for first inerval. Delete second, please';
                        break;
                }
            } else {
                switch (operation) {
                    case "Mid":
                        answer = (firstInterval[1] - firstInterval[0]) / 2;
                        break;
                    case "Rad":
                        answer = (firstInterval[1] + firstInterval[0]) / 2;
                        break;
                    case "Abs":
                        answer[0] = 0;
                        answer[1] = Math.max(Math.abs(firstInterval[0]), Math.abs(firstInterval[1]));
                        break;
                    case "Wid":
                        answer = firstInterval[1] - firstInterval[0];
                        break;
                    default:
                        answer = "Enter second interval correctly";
                        break;
                }
            }
        }else answer = "Your input is incorrect";   

        sessionStorage.setItem('answer', answer);
        this.props.onAnswerFound();
    },
    render: function () {
        return (
            <button className={this.props.className} onClick={this.action}>{this.props.children}</button>
        )
    }
});

ReactDOM.render(
    <Calc />,
    document.getElementById("calc")
);

