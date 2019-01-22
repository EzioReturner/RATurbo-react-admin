import React, {Component} from 'react';
import 'style/main.scss';
import Header from './header/index';
import Navigator from './navigator';
import Content from './homepage/index';
class Main extends Component {
    render() {
        return (<div className="main">
            <Header/>
            <div className="container">
                <Navigator/>
                <Content/>
            </div>
        </div>);
    }
}

export default Main;
