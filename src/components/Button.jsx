import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Button extends React.Component{    
    render() {
        return (
            <button className={this.props.className} onClick={this.action}>{this.props.children}</button>
        );
    }



    getValues(string) {
        var arr = string.split(',');
        arr.map((el, index, array) => array[index] = Number.parseFloat(el));
        return arr;
    }

    add(firstInterval, secondInterval) {
        var answer = [];
        answer[0] = firstInterval[0] + secondInterval[0];
        answer[1] = firstInterval[1] + secondInterval[1];
        return answer;
    }

    subtract(firstInterval, secondInterval) {
        var answer = [];
        answer[0] = firstInterval[0] - secondInterval[1];
        answer[1] = firstInterval[1] - secondInterval[0];
        return answer;
    }

    multiplyByLambda(firstInterval, lambda) {
        var answer = [];
        if (lambda < 0) {
            answer[0] = lambda * firstInterval[1];
            answer[1] = lambda * firstInterval[0];
        } else {
            answer[0] = lambda * firstInterval[0];
            answer[1] = lambda * firstInterval[1];
        }
        return answer;
    }

    multiply(firstInterval, secondInterval) {
        var answer = [];
        answer[0] = Math.min(firstInterval[0] * secondInterval[0], firstInterval[0] * secondInterval[1], firstInterval[1] * secondInterval[0], firstInterval[1] * secondInterval[1]);
        answer[1] = Math.max(firstInterval[0] * secondInterval[0], firstInterval[0] * secondInterval[1], firstInterval[1] * secondInterval[0], firstInterval[1] * secondInterval[1]);
        return answer;
    }

    divide(firstInterval, secondInterval) {
        var answer = [];
        answer[0] = Math.min(firstInterval[0] / secondInterval[0], firstInterval[0] / secondInterval[1], firstInterval[1] / secondInterval[0], firstInterval[1] / secondInterval[1]);
        answer[1] = Math.max(firstInterval[0] / secondInterval[0], firstInterval[0] / secondInterval[1], firstInterval[1] / secondInterval[0], firstInterval[1] / secondInterval[1]);
        return answer;
    }

    middle(firstInterval) {
        var answer = (firstInterval[1] - firstInterval[0]) / 2;
        return answer;
    }

    radius(firstInterval) {
        var answer = (firstInterval[1] + firstInterval[0]) / 2;
        return answer;
    }

    absolute(firstInterval) {
        var answer = [];
        answer[0] = 0;
        answer[1] = Math.max(Math.abs(firstInterval[0]), Math.abs(firstInterval[1]));
        return answer;
    }

    width(firstInterval) {
        var answer = firstInterval[1] - firstInterval[0];
        return answer;
    }

    solveMatrix = () => {
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
    }
    calculate = (operation) => {
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
    }

    action = () => {
        var operation = this.props.children;
        if (operation === 'Solve') {
            var answer = this.solveMatrix();
        } else {
            var answer = this.calculate(operation);
        }


        sessionStorage.setItem('answer', answer);
        this.props.onAnswerFound();
    }
};

export default Button;