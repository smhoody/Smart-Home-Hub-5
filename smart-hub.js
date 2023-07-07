class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {page:'Home',
                      temperature: 71,
                      weather: 83,
                      power: 1,
                      city: "Baltimore",
                      popup: 0};
    }
    //states and handling needs to be done here otherwise states don't 
    //save when switching pages
    handleMenuChange = (x) => {this.setState({page:x});}
    handlePowerChange = (x) => {this.setState({power:x});}
    handleTempChange = (temp) => {this.setState({temperature:temp});}
    handlePopupChange = () => {
        this.state.popup = Util.handlePopupChange("city-overlay", "city-popupBox", this.state.popup);
    }
    handleCityChange = () => {
        this.state.popup = Util.handlePopupChange("city-overlay", "city-popupBox", this.state.popup);
        var cityName = document.getElementById("cityInput").value;
        this.setState({city:cityName});
    }

    render(){
        if(this.state.page === 'Home'){
            return(
            <HomeMenu temperature={this.state.temperature}
                      power={this.state.power} 
                      weather={this.state.weather}
                      city={this.state.city}
                      handleTempChange={this.handleTempChange}
                      handlePowerChange={this.handlePowerChange}
                      menuChange={this.handleMenuChange}/>
            );
        }
        else if(this.state.page === 'SetRoomTemp'){
            return(<div className="text-center">
                <h1 className="page-title">House Temperature</h1>
                <SetRoomTemp/>
                <ExitButton menuChange={this.handleMenuChange}/>
            </div>);
        }
        else if(this.state.page === 'SetTempSchedule'){
            return(<div className="text-center">
                <h1 className="page-title">Temperature Schedule</h1>
                <TemperatureSchedule tempChange={this.handleTempChange}/>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'ModifyFridgeSettings'){
            return(<div className="text-center">
                <h1 className="page-title">Refrigerator & Freezer</h1>
                <FridgeSettings/>
                <ExitButton menuChange={this.handleMenuChange}/>
            </div>);
        }
        else if(this.state.page === 'ScheduleDevices'){
            return(<div className="text-center">
                <h1 className="page-title">Devices</h1>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'GardenLighting'){
            return(<div className="text-center">
                <h1 className="page-title">Garden Lighting</h1>
                <GardenLighting/>
                <ExitButton menuChange={this.handleMenuChange}/>
            </div>);
        }
        else if(this.state.page === 'GardenIrrigation'){
            return(<div className="text-center">
                <h1 className="page-title">Garden Irrigation</h1>
                <GardenIrrigation/>
                <ExitButton menuChange={this.handleMenuChange}/>
            </div>);
        }
        else if(this.state.page === 'CheckWeather'){
            return(<div className="container text-center">
                <div className="overlay" id="city-overlay"></div>
                <h1 className="page-title">Weather</h1>
                <div className="row row-custom1">
                    <div className="col-sm"></div> 

                    <div className="temp-comp col-sm" id="weather-page">
                        <Weather city={this.state.city}/>
                    </div>

                    <div className="col-sm"></div>

                </div>
                <div className="row row-custom">
                    <div className="col-sm"></div>

                    <div className="col-sm">
                    <button className="default-btn btn"
                        onClick={this.handlePopupChange} id="cityBtn">Search</button>
                        <div className="popupBox" id="city-popupBox">
                            <h2 className="default-text">Search City</h2>
                            <input id="cityInput" text="Enter Room"></input>
                            <div className="row">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handlePopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={this.handleCityChange}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom">
                    <div className="col-sm"></div>

                    <div className="col-sm">
                    <button className="default-btn btn btn-primary btn-lg m-1"
                    onClick={() => {this.setState({page:'Home'})}}>Exit</button>
                    </div>

                    <div className="col-sm"></div>
                </div>
            </div>);
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);