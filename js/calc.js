var Calc = React.createClass({
    getDefaultProps: function () {
        return {
            buttons: [
                { id: "addition", text: "+", className: "two-step" },
                { id: "subtraction", text: "-", className: "two-step" },
                { id: "multiplication", text: "*", className: "two-step" },
                { id: "division", text: "/", className: "two-step" },
                { id: "getResult", text: "=", className: "one-step" },
                { id: "middle", text: "Mid", className: "one-step" },
                { id: "width", text: "Wid", className: "one-step" },
                { id: "radius", text: "Rad", className: "one-step" },
                { id: "absolute", text: "Max", className: "one-step" }
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
    receiveAnswer: function (newAnswer) {
        this.state.answer = newAnswer;
        //this.setState({ answer: newAnswer });
    },
    render: function () {
        return (
            <div className="calc-area">
                <InputArea />
                <ActionChoiceAria
                    buttons={this.props.buttons}
                    onAnswerFound={this.receiveAnswer}
                />
                <span className="answer"> Answer: {this.state.answer}</span>
            </div>
        )
    }
});

var InputArea = React.createClass({
    render: function () {
        return (
            <div className="input-area">
                <InputField
                    key="first"
                    id="first"
                />
                <p>Enter an interval a,b using the format as in example: 1,3.4</p>
                <InputField
                    key="second"
                    id="second"
                />
            </div>
        )
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

        if (correct) {
            if (this.props.id === "first") {
                sessionStorage.setItem('firstInterval', values);
            } else {
                sessionStorage.setItem('secondInterval', values);
            }
        }
    },
    render: function () {
        return (
            <input type="text" onChange={this.handleTextChange} />
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
        var operation = sessionStorage.getItem('operation');
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
                        answer[0] = (firstInterval[1] + firstInterval[0]) / 2;
                        break;
                    case "Max":
                        answer[0] = Math.max(Math.abs(firstInterval[0]), Math.abs(firstInterval[1]));
                        break;
                    case "Wid":
                        answer[0] = firstInterval[1] - firstInterval[0];
                        break;
                    default:
                        answer = "Enter second interval correctly";
                        break;
                }
            }
        }else answer = "Your input is incorrect";   

        console.log(answer);
        this.props.onAnswerFound(answer);
    },
    onButtonClicked: function () {
        var chosenOperation = this.props.children;
        switch (chosenOperation) {
            case "+":
                sessionStorage.setItem('operation', chosenOperation);
                break;
            case "-":
                sessionStorage.setItem('operation', chosenOperation);
                break;
            case "*":
                sessionStorage.setItem('operation', chosenOperation);
                break;
            case "/":
                sessionStorage.setItem('operation', chosenOperation);
                break;
            case "Mid":
                sessionStorage.setItem('operation', chosenOperation)
                this.action();
                break;
            case "Rad":
                sessionStorage.setItem('operation', chosenOperation)
                this.action();
                break;
            case "Max":
                sessionStorage.setItem('operation', chosenOperation)
                this.action();
                break;
            case "Wid":
                sessionStorage.setItem('operation', chosenOperation)
                this.action();
                break;
            case "=":
                this.action();
                break;
        }
    },
    render: function () {
        return (
            <button className={this.props.className} onClick={this.onButtonClicked}>{this.props.children}</button>
        )
    }
});

ReactDOM.render(
    <Calc />,
    document.getElementById("calc")
);

