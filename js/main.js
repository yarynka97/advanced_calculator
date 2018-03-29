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
                <p className='explanation tip'>Do simple algebraic calculations for interval numbers</p>
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
                    id="firstInterval"
                />
                <InputField
                    key="second"
                    id="secondInterval"
                />
                <p className='tip'>Enter an interval a,b using the format as in example: 1,3.4</p>
            </div>
        )
    }
});

var InputField = React.createClass({
    handleTextChange: function (event) {
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
    add: function (firstInterval, secondInterval) {
        var answer = [];
        answer[0] = firstInterval[0] + secondInterval[0];
        answer[1] = firstInterval[1] + secondInterval[1];
        return answer;
    },
    subtract: function (firstInterval, secondInterval) {
        var answer = [];
        answer[0] = firstInterval[0] - secondInterval[1];
        answer[1] = firstInterval[1] - secondInterval[0];
        return answer;
    },
    multiplyByLambda: function (firstInterval,lambda) {
        var answer = [];
        if (lambda < 0) {
            answer[0] = lambda * firstInterval[1];
            answer[1] = lambda * firstInterval[0];
        } else {
            answer[0] = lambda * firstInterval[0];
            answer[1] = lambda * firstInterval[1];
        }
        return answer;
    },
    multiply: function (firstInterval, secondInterval) {
        var answer = [];
        answer[0] = Math.min(firstInterval[0] * secondInterval[0], firstInterval[0] * secondInterval[1], firstInterval[1] * secondInterval[0], firstInterval[1] * secondInterval[1]);
        answer[1] = Math.max(firstInterval[0] * secondInterval[0], firstInterval[0] * secondInterval[1], firstInterval[1] * secondInterval[0], firstInterval[1] * secondInterval[1]);
        return answer;
    },
    divide: function (firstInterval, secondInterval) {
        var answer = [];
        answer[0] = Math.min(firstInterval[0] / secondInterval[0], firstInterval[0] / secondInterval[1], firstInterval[1] / secondInterval[0], firstInterval[1] / secondInterval[1]);
        answer[1] = Math.max(firstInterval[0] / secondInterval[0], firstInterval[0] / secondInterval[1], firstInterval[1] / secondInterval[0], firstInterval[1] / secondInterval[1]);
        return answer;
    },
    middle: function (firstInterval) {
        var answer = (firstInterval[1] - firstInterval[0]) / 2;
        return answer;
    },
    radius: function (firstInterval) {
        var answer = (firstInterval[1] + firstInterval[0]) / 2;
        return answer;
    },
    absolute: function (firstInterval) {
        var answer = [];
        answer[0] = 0;
        answer[1] = Math.max(Math.abs(firstInterval[0]), Math.abs(firstInterval[1]));
        return answer;
    },
    width: function (firstInterval) {
        var answer = firstInterval[1] - firstInterval[0];
        return answer;
    },
    solveMatrix: function () {
        var answer;
        var correct = true;
        var A = [
            this.getValues(sessionStorage.getItem('a11')),
            this.getValues(sessionStorage.getItem('a12')),
            this.getValues(sessionStorage.getItem('a21')),
            this.getValues(sessionStorage.getItem('a22'))
        ];
        var B = [
            this.getValues(sessionStorage.getItem('b1')),
            this.getValues(sessionStorage.getItem('b2'))
        ];
        A.forEach(el => { if (!el) correct = false });
        B.forEach(el => { if (!el) correct = false });

        if (correct) {
            var det = this.subtract(this.multiply(A[0], A[3]), this.multiply(A[1], A[2]));
            if (det[0] * det[1] > 0) {
                var A1 = [
                    this.divide(A[3], det),
                    this.divide(this.multiplyByLambda(A[1], -1), det),
                    this.divide(this.multiplyByLambda(A[2], -1), det),
                    this.divide(A[0], det)
                ];

                console.log(A1);
                var X = [
                    this.add(this.multiply(A1[0], B[0]), this.multiply(A1[1], B[1])),
                    this.add(this.multiply(A1[2], B[0]), this.multiply(A1[3], B[1]))
                ];
                answer = X;
            } else {
                answer = "Change parameters, determinant has 0";
            }
        } else {
            answer = "Enter all parameters";
        };

        return answer;
    },
    calculate: function (operation) {
        var first = sessionStorage.getItem('firstInterval');
        var second = sessionStorage.getItem('secondInterval');
        var answer = [];
        if (first) {
            var firstInterval = this.getValues(first);
            if (second) {
                var secondInterval = this.getValues(second);

                switch (operation) {
                    case "+":
                        answer = this.add(firstInterval, secondInterval);
                        break;
                    case "-":
                        answer = this.subtract(firstInterval, secondInterval);
                        break;
                    case "*":
                        answer = this.multiply(firstInterval, secondInterval);
                        break;
                    case "/":
                        if (secondInterval[0] * secondInterval[1] > 0) {
                            answer = this.divide(firstInterval, secondInterval);
                        } else answer[0] = 'Cannot divide this itervals, because second one contains 0';
                        break;
                    default:
                        answer = 'This operation is only for first inerval. Delete second, please';
                        break;
                }
            } else {
                switch (operation) {
                    case "Mid":
                        answer = this.middle(firstInterval);
                        break;
                    case "Rad":
                        answer = this.radius(firstInterval);
                        break;
                    case "Abs":
                        answer = this.absolute(firstInterval);
                        break;
                    case "Wid":
                        answer = this.width(firstInterval);
                        break;
                    default:
                        answer = "Enter second interval correctly";
                        break;
                }
            }
        } else answer = "Your input is incorrect";

        return answer;
    },
    action: function () {
        var operation = this.props.children;
        if (operation ==='Solve') {
            var answer = this.solveMatrix();
        } else {
            var answer = this.calculate(operation);
        }
           

        sessionStorage.setItem('answer', answer);
        this.props.onAnswerFound();
    },
    render: function () {
        return (
            <button className={this.props.className} onClick={this.action}>{this.props.children}</button>
        )
    }
});

var Matrix = React.createClass({
    getInitialState: function () {
        return {
            answer:[]
        }
    },
    answerFound: function() {
        this.setState({ answer: sessionStorage.getItem('answer') });
    },
    render: function () {
        return (
            <div className="calc-area">
                <h2 className="card-header">Matrix Calculator</h2>
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
});


ReactDOM.render(
    <div>
        <Calc />
        <Matrix />
    </div>,
    document.getElementById("calc")
);

