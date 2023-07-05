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
            onClick={this.toggle}><img src="resources/powerbutton.png" width="75" height="75"></img></button>
        }
        else{
            button = <button className="btn btn-success m-1 btn-power"
            onClick={this.toggle}><img src="resources/powerbutton.png" width="75" height="75"></img></button>
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
        this.getTemperature();
        this.refresher = setInterval(() => this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.refresher);
    }
    getTemperature() {
        var cityName = this.props.city;        
        //get coordinates of city and weather information of coords
        $.getJSON(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&format=json`, function(data) {
            $.getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch`, function(data) {
                var p = document.getElementById("weather-comp");
                p.innerHTML = data.current_weather.temperature;
            });
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

class ExitButton extends React.Component {
    constructor(props){
        super(props);
    }
    toggle = (x) => {this.props.menuChange(x);}
    render(){
        return(
            <button className="default-btn btn btn-primary btn-lg m-1 exitButton"
                onClick={() => {this.toggle('Home')}}>Exit</button>
        );
    }
}


class Calendar extends React.Component {
    constructor(props){
        super(props);
        //inherited properties:
        // - ID of date input tag (a pair of date components must have same ID)
        // - current date
        // - range type ("start" or "end")
        // - handleChange()
    }
    componentDidMount() {
        var componentID = "#" + this.props.ID + this.props.rangeType;
        $(componentID).datepicker();
        $.datepicker.setDefaults({
            dateFormat:"D, d MM", //day name short, day number, month name full
            showAnim:"scale" //type of animation for opening calendar
        });
        $(componentID).datepicker("setDate", this.props.current);
        $(componentID).attr('readonly', true);
        $(componentID).on("change", this.change);
    }
    componentWillUnmount() {
        
    }
    change = () => {
        var componentID = "#" + this.props.ID + this.props.rangeType;
        var currentDate = $(componentID).datepicker("getDate");

        if (this.props.rangeType == "start") { //if this is the Start date component
            var endComponentID = "#"+this.props.ID+"end"; // set the minimum date of the end component to this date
            $(endComponentID).datepicker("option", "minDate", currentDate);
        } else if (this.props.rangeType == "end") { //if this is the End date component
            var endComponentID = "#"+this.props.ID+"start"; // set the maximum date of the start component to this date
            $(endComponentID).datepicker("option", "maxDate", currentDate);
        }
        
        this.props.handleChange(currentDate);
    }
    render() {
      return (
        <div>
          <input type="text" id={this.props.ID+this.props.rangeType} className="small-font" />
        </div>
      );
    }
  }