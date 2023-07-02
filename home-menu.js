class HomeMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {power:0};
    }
    handlePowerChange = (x) => {this.setState({power:x});}
    toggle = (x) => {
        this.props.menuChange(x);
    }
    render(){
        return(<div class="text-center">
            <h1>Smart Home Hub</h1>
            <div class="row row-custom1">
                <div class="col-sm-1"></div>

                <div class="col-sm-3">
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('SetRoomTemp')}}>Set Room<br></br> Temperature</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('SetTempSchedule')}}>Set Temperature<br></br> Schedule</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('ModifyFridgeSettings')}}>Modify Fridge/<br></br>Freezer Settings</button>
                </div>

                <div class="col-sm-4">
                    <Clock/>
                    <div class="w-100"></div>
                    <h2 class="temp1">Room Temp</h2>
                    <h2 class="temp2">71&#176;</h2>
                    <div class="w-100"></div>
                    <h3 class="temp3">Outside Temp</h3>
                    <h3 class="temp2">87&#176;</h3>
                </div>

                <div class="col-sm-3">
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('ScheduleDevices')}}>Schedule<br></br> Devices</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('GardenLighting')}}>Garden<br></br> Lighting</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('GardenIrrigation')}}>Garden<br></br> Irrigation</button>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <div class="row row-custom">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.toggle('CheckWeather')}}>Check<br></br> Weather</button>
            </div>
                <div class="col-sm-4">
                <PowerButton power={this.state.power} onPowerChange={this.handlePowerChange} />
                </div>
            </div>
        </div>);
    }
}