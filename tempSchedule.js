class TemperatureSchedule extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0,
                      from: "",
                      to: "",
                      current_room:"", 
                      currTemp:0};
        <Database PopupChange={this.handlePopupChange}/>

    }
    //on mount, build buttons for all rooms
    componentDidMount() {
        var rooms = Database.retrieveRoom();

        for (var name of Object.keys(rooms)) {
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `<strong>${name}</strong> <br> Temp: ${rooms[name].temp}`;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            button.id = name;
            button.addEventListener("click", this.handlePopup.bind(null, name, rooms[name].temp));
            var container = document.getElementById("temp-sched-buttons");
            container.appendChild(button);
        }
    }
    handlePopup = (roomName, roomTemp) => {
        if (this.state.current_room != roomName && this.state.popup === 0) {
            this.state.currTemp = Database.getDB("rooms")[roomName]["temp"];
        } 
        this.state.current_room = roomName;
        this.state.popup = Util.handlePopupChange("temp-sched-overlay", "temp-sched-popupBox", this.state.popup, roomName);
        Util.changeText("curr-temp", "", "temp-color", this.state.currTemp);
    }

    updateRoom = () => {
        this.state.popup = Util.handlePopupChange("temp-sched-overlay", "temp-sched-popupBox", this.state.popup, this.state.current_room);
        this.state.currTemp = Database.updateRoomSchedule(this.state.current_room, 
                                                          this.state.from, 
                                                          this.state.to, 
                                                          "room-temp-input-add");
    }

    changeStartDate = (date) => {
        this.setState({from:date});
    }
    changeEndDate = (date) => {
        this.setState({to:date});
    }

    changeText = () => {
        Util.changeText("temp-val-add", "room-temp-input-add", "temp-color");
    }

    render(){
        return(
            <div className="text-center">
                <div className="row row-custom">
                <div className="col-sm"></div>
                    <div className="col-sm">

                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom">
                    <div className="col-sm">
                    
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom m-3">
                    <div className="col-sm"></div>
                    <div className="col-sm" id="temp-sched-buttons"></div>
                    <div className="col-sm"></div>
                </div>

                <div className="overlay" id="temp-sched-overlay"></div>
                <div className="popupBox" id="temp-sched-popupBox">
                    <h2 className="default-text">Set Temperature Schedule</h2>
                    <div className="row row-custom">
                        <div className="default-text" id="roomName"></div>
                    </div>
                    <div className="row row-custom">
                        <div className="row row-custom">
                            <div className="col-sm">
                                <div>
                                    <p className="default-text tempText" id="roomTempText">Current Room Temperature</p>
                                    <div className="tempValback col-sm-5">
                                        <p className="default-text tempValue" id="curr-temp">{this.state.currTemp}&deg;</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <div>
                                    <p className="default-text tempText" id="roomTempText">Enter New Temperature</p>
                                    <div className="tempValback col-sm-5">
                                        <p className="default-text tempValue" id="temp-val-add">50&deg;</p>
                                    </div>
                                    <input type="range" min="50" max="100" className="slider" id="room-temp-input-add" onChange={this.changeText}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <p className="default-text" id="tempScheduleFromText">From</p>
                            <Calendar current={this.state.from} ID="tempSchedule" 
                            rangeType="start" handleChange={this.changeStartDate}/>
                        </div>
                        <div className="col-sm">
                            <p className="default-text" id="tempScheduleToText">To</p>
                            <Calendar current={this.state.to} ID="tempSchedule" 
                            rangeType="end" handleChange={this.changeEndDate}/>
                        </div>
                        <div className="row row-custom">
                            <div className="col-sm">
                                <button className="default-btn-small d-inline btn-left-align" id="closeButton" 
                                onClick={this.handlePopup}>Close</button>
                                <button className="default-btn-small d-inline btn-left-align" id="enterButton" 
                                onClick={this.updateRoom}>Enter</button>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}