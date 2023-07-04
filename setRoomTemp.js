class SetRoomTemp extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0};
        <Database PopupChange={this.handlePopupChange}/>
    }
    componentDidMount(){
        Database.retrieveRoom();
    }
    handlePopupChange = () => {
        console.log("hi");
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
    saveRoom = () => {
        Database.saveRoom();
    }
    addButton = () => {
        var roomList = Database.retrieveRoom();
        var room;
        for(room in roomList) {
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = room;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            var container = document.getElementById("roomButtons");
            container.appendChild(button);
        }
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
                                <input id="roomTempInput" text="Enter Temp"></input>
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
                            <h2 className="default-text">Set Room</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Room Temperature</p>
                                <input id="roomsTempInput" text="Enter Temp"></input>
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
            </div>
        );
    }
}