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
        return(<div className="text-center">
            <h1 className="page-title">Smart Home Hub</h1>
            <div className="row row-custom1">
                <div className="col-sm-1"></div>

                <div className="col-sm-3">
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Set Room<br/> Temperature</button>
                <div className="w-100"></div>
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Set Temperature<br/> Schedule</button>
                <div className="w-100"></div>
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Modify Fridge/<br/>Freezer Settings</button>
                </div>

                <div className="col-sm-4">
                    <Clock/>
                    <div className="w-100"></div>
                    <div className="home-temp" id="homepage-temp">
                        <Temp/>
                        <p id="measurement">&deg;F</p>
                    </div>
                    <div className="home-temp" id="homepage-weather">
                        <Temp/>
                        <p id="measurement">&deg;F</p>
                    </div>
                </div>

                <div className="col-sm-3">
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Schedule<br/> Devices</button>
                <div className="w-100"></div>
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Garden<br/> Lighting</button>
                <div className="w-100"></div>
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Garden<br/> Irrigation</button>
                </div>
                <div className="col-sm-1"></div>
            </div>
            <div className="row row-custom">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                <button className="home-btn btn btn-primary btn-custom m-4"
                onClick={() => {this.setState({page:'Program'})}}>Check<br/> Weather</button>
            </div>
                <div className="col-sm-4">
                <PowerButton power={this.state.power} onPowerChange={this.handlePowerChange} />
                </div>
            </div>
        </div>);
    }
}