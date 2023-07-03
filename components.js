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
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onTempChange(e.target.value);
    }
    render(){
        return (
            <div>
                <p id="temp-comp">{this.props.temperature}</p>
                <p id="measurement">&deg;F</p>
            </div>
        );
    }
}

class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {temperature: 70};
    }
    componentDidMount(){
        this.refresher = setInterval(() => this.tick(),2000);
    }
    componentWillUnmount(){
        clearInterval(this.refresher);
    }
    getTemperature() {
        var coords = {latitude:0, longitude:0};

        //get coordinates of city
        $.getJSON(`https://geocoding-api.open-meteo.com/v1/search?name=${this.props.city}&format=json`, function(data) {
            coords.latitude = data.results[0].latitude;
            coords.longitude = data.results[0].longitude;
        });
        //get weather information of coords
        $.getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`, function(data) {
            var p = document.getElementById("weather-comp");
            p.innerHTML = data.current_weather.temperature;
        });
    }
    tick(){
        this.getTemperature();
    }
    render(){
        return (
            <div>
                <p id="weather-comp">{this.state.temperature}</p>
                <p id="measurement">&deg;F</p>
                <br/>
                <p id="weather-location">{this.props.city}</p>
            </div>
        );
    }
}