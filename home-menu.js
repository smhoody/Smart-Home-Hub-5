class HomeMenu extends React.Component{
    constructor(props){
        super(props);
        //inherited:
        // - this.props.temperature
        // - this.props.weather
        // - this.props.power
        // - this.props.city
        // - this.props.handleTempChange()
        // - this.props.handlePowerChange()
        // - this.props.menuChange()}

        // navigator.geolocation.getCurrentPosition(success);
        // function success(pos) {
        //     const coord = pos.coords;
        //     this.state.location.latitude = coord.latitude;
        //     this.state.location.longitude = coord.longitude;
        // }
    }

    toggle = (x) => {this.props.menuChange(x);}
    render(){
        return(<div className="home-page text-center">
            <h1 className="page-title">Smart Home Hub</h1>
            <div className="row row-custom1">
                <div className="col-sm-1"></div>

                <div className="col-sm-3">
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('SetRoomTemp')}}>Set Room<br/> Temperature</button>
                <div className="w-100"></div>
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('SetTempSchedule')}}>Set Temperature<br/> Schedule</button>
                <div className="w-100"></div>
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('ModifyFridgeSettings')}}>Modify Fridge/<br/>Freezer Settings</button>
                </div>

                <div className="col-sm-4">
                    <Clock/>
                    <div className="w-100"></div>
                    <div className="temp-comp" id="homepage-temp">
                        <Temp temperature={this.props.temperature} onTempChange={this.handleTempChange}/>
                    </div>
                    <div className="temp-comp" id="homepage-weather">
                        <Weather city={this.props.city}/>
                    </div>
                </div>

                <div className="col-sm-3">
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('ScheduleDevices')}}>Schedule<br/> Devices</button>
                <div className="w-100"></div>
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('GardenLighting')}}>Garden<br/> Lighting</button>
                <div className="w-100"></div>
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('GardenIrrigation')}}>Garden<br/> Irrigation</button>
                </div>
                <div className="col-sm-1"></div>
            </div>
            <div className="row row-custom">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <button className="default-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('CheckWeather')}}>Check<br/> Weather</button>
            </div>
                <div className="col-sm-4">
                <PowerButton power={this.props.power} onPowerChange={this.props.handlePowerChange} />
                </div>
            </div>
        </div>);
    }
}