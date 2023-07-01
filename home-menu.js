class HomeMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {power:0};
    }
    handlePowerChange = (x) => {this.setState({power:x});}
    render(){
        return(<div class="text-center">
            <h1>Smart Home Hub</h1>
            <div class="row row-custom1">
                <div class="col-sm-1"></div>

                <div class="col-sm-3">
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Set Room<br></br> Temperature</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Set Temperature<br></br> Schedule</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Modify Fridge/<br></br>Freezer Settings</button>
                </div>

                <div class="col-sm-4">
                </div>

                <div class="col-sm-3">
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Schedule<br></br> Devices</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Garden<br></br> Lighting</button>
                <div class="w-100"></div>
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Garden<br></br> Irrigation</button>
                </div>
                <div class="col-sm-1"></div>
            </div>
            <div class="row row-custom">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <button class="btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Check<br></br> Weather</button>
            </div>
                <div class="col-sm-4">
                <PowerButton power={this.state.power} onPowerChange={this.handlePowerChange} />
                </div>
            </div>
        </div>);
    }
}