class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {page:'Home'};
    }
    handleMenuChange = (x) => {this.setState({page:x});}
    render(){
        if(this.state.page === 'Home'){
            return(
            <HomeMenu menuChange={this.handleMenuChange}/>
            );
        }
        else if(this.state.page === 'SetRoomTemp'){
            return(<div class="text-center">
                <p>Program Page</p>
                <button class="btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'SetTempchedule'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
        else if(this.state.page === 'ModifyFridgeSettings'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
        else if(this.state.page === 'ScheduleDevices'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
        else if(this.state.page === 'GardenLighting'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
        else if(this.state.page === 'GardenIrrigation'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
        else if(this.state.page === 'CheckWeather'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);