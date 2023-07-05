class SetRoomTemp extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0};
        <Database PopupChange={this.handlePopupChange}/>
    }
    componentDidMount(){
        var roominfo = Database.retrieveRoom();

       for(var rooms in roominfo) {
            var button = document.createElement("button");
            console.log(rooms);
            button.type = "button";
            button.innerHTML = `${rooms} <br> Temp: ${roominfo[rooms].temp}`;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            button.addEventListener("click", this.handlePopupChange2.bind(null, rooms));
            var container = document.getElementById("roomButtons");
            container.appendChild(button);
       }
    }
    handlePopupChange = () => {
        var overlay = document.getElementById("room-overlay");
        var popupBox = document.getElementById("room-popupBox");
        if (this.state.popup === 0) {
            overlay.style.display = "block";
            popupBox.style.display = "block";
            this.state.popup = 1;
        } else if (this.state.popup === 1) {
            overlay.style.display = "none";
            popupBox.style.display = "none";
            this.state.popup = 0;
        }
    }
    handlePopupChange2 = (roomName) => {
        var overlay = document.getElementById("rooms-overlay");
        var popupBox = document.getElementById("rooms-popupBox");
        if (this.state.popup === 0) {
            overlay.style.display = "block";
            popupBox.style.display = "block";
            this.state.popup = 1;
            var val = document.getElementById("roomName");
            var newVal = roomName;
            val.innerHTML = newVal;
        } else if (this.state.popup === 1) {
            overlay.style.display = "none";
            popupBox.style.display = "none";
            this.state.popup = 0;
        }
    }
    saveRoom = () => {
        Database.saveRoom();
    }
    updateRoom = () => {
        Database.updateRoom();
    }
    changeText = () => {
        var val = document.getElementById("tempVal");
        var newVal = document.getElementById("roomTempInput").value;
        val.innerHTML = newVal;
    }
    changeText2 = () => {
        var val = document.getElementById("tempVal2");
        var newVal = document.getElementById("roomTempInput2").value;
        val.innerHTML = newVal;
    }
    render(){
        return(
            <div className="text-center">
                <div className="overlay" id="room-overlay"></div>
                <div className="row row-custom">
                <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-1"
                        onClick={this.handlePopupChange}>Set Room</button>
                    </div>
                    <div className="col-sm"></div>
                </div>

                <div className="row row-custom">
                    <div className="col-sm">
                        <div className="popupBox" id="room-popupBox">
                            <h2 className="default-text">Set Room</h2>
                            <div>
                                <p className="default-text">Enter Room Name</p>
                                <input id="roomNameInput" text="Enter Room"></input>
                            </div>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Room Temperature</p>
                                <p className="default-text" id="tempVal">0</p>
                                <input type="range" min="0" max="100" className="slider" id="roomTempInput" onChange={this.changeText}/>
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
                                <p id="roomName" className="default-text" text="Enter Room">Room</p>
                            </div>
                            <div>
                                <p className="default-text" id="roomTempText">Set Room Temperature</p>
                                <p className="default-text" id="tempVal2">0</p>
                                <input type="range" min="0" max="100" className="slider" id="roomTempInput2" onChange={this.changeText2}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handlePopupChange2}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={(this.handlePopupChange2, this.updateRoom)}>Enter</button>
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