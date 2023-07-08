class SetRoomTemp extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0, current_room:""};
        <Database PopupChange={this.handlePopupChange}/>
    }
    componentDidMount(){
        var roominfo = Database.retrieveRoom();

       for(var room in roominfo) {
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `<strong>${room}</strong> <br> Temp: ${roominfo[room].temp}`;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            button.id = room;
            button.addEventListener("click", this.handlePopupChangeBtn.bind(null, room));
            var container = document.getElementById("roomButtons");
            container.appendChild(button);
       }
    }
    handlePopupChange = () => {
        this.state.popup = Util.handlePopupChange("room-overlay", "room-popupBox", this.state.popup);
    }
    handlePopupChangeBtn = (roomName) => {
        this.state.current_room = roomName;
        this.state.popup = Util.handlePopupChange("rooms-overlay", "rooms-popupBox", this.state.popup, roomName);
    }
    handlePopupChangeHouse = () => {
        //this.state.current_room = roomName;
        this.state.popup = Util.handlePopupChange("house-overlay", "house-popupBox", this.state.popup);
    }
    saveRoom = () => {
        this.state.popup = Util.handlePopupChange("room-overlay", "room-popupBox", this.state.popup);
        Database.saveRoom("roomNameInput", "room-temp-input-add");
    }
    updateRoom = () => {
        this.state.popup = Util.handlePopupChange("rooms-overlay", "rooms-popupBox", this.state.popup, this.state.current_room);
        Database.updateRoom(this.state.current_room, "room-temp-input-set");
    }
    changeText = () => {
        Util.changeText("temp-val-add", "room-temp-input-add", "temp-color");
    }
    changeText2 = () => {
        Util.changeText("temp-val-set", "room-temp-input-set", "temp-color");
    }
    changeText3 = () => {
        Util.changeText("house-temp-val-set", "house-temp-input-set", "temp-color");
    }
    changeHouseTemperature = () => {
        var val = document.getElementById("house-temp-input-set").value;
        this.props.changeHouseTemp(val);
    }
    render(){
        return(
            <div className="text-center">
                <div className="overlay" id="room-overlay"></div>
                <div className="row row-custom">
                <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-1"
                        onClick={this.handlePopupChange}>Add Room</button>
                        <button className="default-btn btn btn-primary btn-lg m-1"
                        onClick={this.handlePopupChangeHouse}>Set House<br/>Temperature</button>
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom">
                    <div className="col-sm">
                        <div className="popupBox" id="room-popupBox">
                            <h2 className="default-text">Add Room</h2>
                            <div>
                                <p className="default-text inputTitle">Enter Room Name</p>
                                <input id="roomNameInput" text="Enter Room"></input>
                            </div>
                            <div>
                                <p className="default-text tempText" id="roomTempText">Enter Room Temperature</p>
                                <div className="tempValback col-sm-5">
                                    <p className="default-text tempValue" id="temp-val-add">50&deg;</p>
                                </div>
                                <input type="range" min="50" max="100" className="slider" id="room-temp-input-add" onChange={this.changeText}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handlePopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={(this.handlePopupChange, this.saveRoom)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom m-3">
                    <div className="col-sm"></div>
                    <div className="col-sm" id="roomButtons">
                        <div className="overlay" id="rooms-overlay"></div>
                        <div className="popupBox" id="rooms-popupBox">
                            <h2 className="default-text">Set Room Temp</h2>
                            <div>
                                <p className="default-text">Room Name</p>
                                <p id="roomName" className="default-text"></p>
                            </div>
                            <div>
                                <p className="default-text tempText" id="roomTempText">Set Room Temperature</p>
                                <div className="tempValback col-sm-5">
                                    <p className="default-text tempValue" id="temp-val-set">50&deg;</p>
                                </div>
                                <input type="range" min="50" max="100" className="slider" id="room-temp-input-set" onChange={this.changeText2}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handlePopupChangeBtn}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={this.updateRoom}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom m-3">
                    <div className="col-sm"></div>
                    <div className="col-sm" id="roomButtons">
                        <div className="overlay" id="house-overlay"></div>
                        <div className="popupBox" id="house-popupBox">
                            <h2 className="default-text">Set House Temp</h2>
                            <div>
                                <p className="default-text tempText" id="roomTempText">Set House Temperature</p>
                                <div className="tempValback col-sm-5">
                                    <p className="default-text tempValue" id="house-temp-val-set">{this.props.temperature}&deg;</p>
                                </div>
                                <input type="range" min="50" max="100" className="slider" id="house-temp-input-set" onChange={this.changeText3}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handlePopupChangeHouse}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={this.changeHouseTemperature}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </div>
        );
    }
}