class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {page:'Home',
                      temperature: 71,
                      weather: 83,
                      power: 1};
    }
    //states and handling needs to be done here otherwise states don't 
    //save when switching pages
    handleMenuChange = (x) => {this.setState({page:x});}
    handlePowerChange = (x) => {this.setState({power:x});}
    handleTempChange = (temp) => {this.setState({temperature:temp});}
    render(){
        if(this.state.page === 'Home'){
            return(
            <HomeMenu temperature={this.state.temperature}
                      power={this.state.power} 
                      weather={this.state.weather}
                      handleTempChange={this.handleTempChange}
                      handlePowerChange={this.handlePowerChange}
                      menuChange={this.handleMenuChange}/>
            );
        }
        else if(this.state.page === 'SetRoomTemp'){
            return(<div className="text-center">
                <h1 className="page-title">House Temperature</h1>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'SetTempSchedule'){
            return(<div className="text-center">
                <h1 className="page-title">Temperature Schedule</h1>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'ModifyFridgeSettings'){
            return(<div className="text-center">
                <h1 className="page-title">Refrigerator & Freezer</h1>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
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
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'GardenIrrigation'){
            return(<div className="text-center">
                <h1 className="page-title">Garden Irrigation</h1>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'CheckWeather'){
            return(<div className="text-center">
                <h1 className="page-title">Weather</h1>
                <button className="default-btn btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);