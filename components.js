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
            button = <button class="btn btn-danger m-1 btn-power"
            onClick={this.toggle}><img src="powerbutton.png" width="100" height="100"></img></button>
        }
        else{
            button = <button class="btn btn-success m-1"
            onClick={this.toggle}><img src="powerbutton.png" width="100" height="100"></img></button>
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
            <p className="medium-font" >{this.state.date.toLocaleTimeString()}</p>
            
        );
    }
}