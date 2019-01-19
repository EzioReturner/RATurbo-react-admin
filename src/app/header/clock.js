import React, {Component} from 'react';
import 'style/clock.scss';
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({date: new Date()});
    }
    render() {
        const {date} = this.state;
        return (<div className="clock">{date.toLocaleTimeString()},
            <span style={{
                    marginLeft: '20px'
                }}>欢迎你 zhev</span>
        </div>)
    }
}

export default Clock;
