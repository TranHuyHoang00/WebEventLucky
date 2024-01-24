import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Introduce from './pages/introduce/index';
import Home from './pages/home';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <div className='h-screen w-screen flex items-center justify-center '>
                <div className='h-full w-[400px]'>
                    <Switch>
                        <Route exact path="/home"><Introduce /></Route>
                        <Route exact path="/home/main"><Home /></Route>
                    </Switch>
                </div>
            </div>
        );
    }

}
export default withRouter(index);
