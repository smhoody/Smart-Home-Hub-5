class PowerButton extends React.Component{
    constructor(props){
        super(props);
    }
    toggle = () => {
        const p = this.props.power;
        if(p === 0){
            this.props.onPowerChange(1);
        }
        else{
            this.props.onPowerChange(0);
        }
    }
    render(){
        const p = this.props.power;
        let button;
        if(p === 0){
            button = <button className="btn btn-danger m-1 btn-power"
            onClick={this.toggle}><img src="powerbutton.png" width="75" height="75"></img></button>
        }
        else{
            button = <button className="btn btn-success m-1 btn-power"
            onClick={this.toggle}><img src="powerbutton.png" width="75" height="75"></img></button>
        }
        return(
            <div>{button}</div>
        );
    }
}
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount(){
        this.timerID = setInterval(() => this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({date:new Date()});
    }
    render(){
        return (
            <p className="medium-font" id="clock-comp">{this.state.date.toLocaleTimeString()}</p>
            
        );
    }
}

class Temp extends React.Component{
    constructor(props){
        super(props);
        this.state = {temp: 73};
    }
    componentDidMount(){
        this.timerID = setInterval(() => this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    render(){
        return (
            <p id="temp-comp">{this.state.temp.toString()}</p>
        );
    }
}