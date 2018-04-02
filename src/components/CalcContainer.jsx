import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Calc from './Calc';
import Matrix from './Matrix';

class CalcContainer extends React.Component {
    static defaultProps = {
        chosenTabClassName: "nav-link active",
        defaultTabClassName: "nav-link"
    }
    state = {
        tabChosen:{
            calc: true,
            slae: false
        }
    }
    componentWillMount(){
        sessionStorage.clear();
    }
    chooseTab = (event)=>{
        const chosenElem = event.target.id;
        if (chosenElem === "calc") {
            this.setState({
                tabChosen: {
                    calc: true,
                    slae: false
                }
            })
        } else {
            this.setState({
                tabChosen: {
                    calc: false,
                    slae: true
                }
            })
        };
    }
    render() {
        return (
            <Router>
                <div className="main-container">
                    <ul className="nav nav-tabs" onClick={this.chooseTab}>
                        <li className="nav-item">
                            <Link id="calc" className={this.state.tabChosen.calc ? this.props.chosenTabClassName : this.props.defaultTabClassName} to="/calc">Calculator</Link>
                        </li>
                        <li className="nav-item">
                            <Link id="slae" to="/slae" className={this.state.tabChosen.slae ? this.props.chosenTabClassName : this.props.defaultTabClassName}>Solve SLAE</Link>
                        </li>
                    </ul>

                    <Route exact path='/' component={Calc} />
                    <Route path="/calc" component={Calc} />
                    <Route path="/slae" component={Matrix} />
                </div>
            </Router>
        );
    }
}

export default CalcContainer;