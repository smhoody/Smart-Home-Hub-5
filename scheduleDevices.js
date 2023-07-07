class ScheduleDevices extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0,
                      popupOverlayID_add:"garden-lights-overlay-add",
                      popupBoxID_add:"garden-lights-popupBox-add",
                      popupOverlayID_set:"garden-lights-overlay-set",
                      popupBoxID_set:"garden-lights-popupBox-set",
                      from: "",
                      to: "",
                      current_area:"",
                      space:`\u3000`};

    }
    //on mount, build buttons for all rooms
    componentDidMount() {
        var areas = Database.retrieveDevices();

        for (var areaName of Object.keys(areas)) {
            //check if either start/end date is above 0. Lights are on if either value is >0
            //var status = ((areas[areaName].lights_start_status + areas[areaName].lights_end_status) ? "On" : "Off");
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `<strong>${areaName}</strong>`;
            button.className = "default-btn btn btn-primary btn-lg m-3 lawn-btn-custom";
            button.id = areaName;
            button.addEventListener("click", this.handlePopupSet.bind(null, areaName));
            var container = document.getElementById("garden-sched-buttons");
            container.appendChild(button);
        }
    }
    handlePopup = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_add, this.state.popupBoxID_add, this.state.popup);
    }
    handlePopupSet = (areaName) => {
        this.state.current_area = areaName;
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, this.state.popupBoxID_set, this.state.popup);
    }

    /**
     * Save a new lawn area to local storage from "Add Lawn Area" button
     */
    saveDevices = () => {
        var lawnAreaName = document.getElementById("areaNameInput-lights").value;
        Database.saveDevices(lawnAreaName, this.state.from, this.state.to, this.state.popupOverlayID_add, this.state.popupBoxID_add);
        this.handlePopup();
    }

    /** 
     * Update local storage with data from editing a lawn area
     */
    updateDevices = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, 
                                                  this.state.popupBoxID_set, 
                                                  this.state.popup);
        //get values of brightness from the Edit popup box
        //this.state.start_brightness = parseInt(Util.getInputValue("start-lightingInput-set"));
        //this.state.end_brightness = parseInt(Util.getInputValue("end-lightingInput-set"));
        Database.updateDevices(this.state.current_area, 
                                    this.state.from, 
                                    this.state.to);
    }

    changeStartDate = (date) => {
        this.setState({from:date});
    }
    changeEndDate = (date) => {
        this.setState({to:date});
    }

    render(){
        $(document).ready(function(){
            document.addEventListener("keyup", checkPopup);
            function checkPopup(event) { //maybe can close popup with escape key
                if (event.key == "Escape") {
                    console.log("action");
                }
            }
        });
        return(
            <div className="text-center">
                <div className="row row-custom">
                <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-1"
                        onClick={this.handlePopup}>Add Device</button>
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
                    <div className="col-sm" id="garden-sched-buttons"></div>
                    <div className="col-sm"></div>
                </div>


                {/*-------POPUP BOXES BELOW-------*/}

                {/* Add Lawn Area popup */}
                <div className="overlay" id={this.state.popupOverlayID_add}></div>
                <div className="popupBox" id={this.state.popupBoxID_add}>
                    <h2 className="default-text">Set Device Schedule</h2>
                    <div className="row row-custom">
                        <div className="col-sm">
                            <div>
                                <p className="default-text">Enter Device Name</p>
                                <input id="areaNameInput-lights" text="Enter Area"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row row-custom">
                        <div className="col-sm">
                            <p className="default-text" id="lightsScheduleFromText">From</p>
                            <Calendar current={this.state.from} ID="lightsSchedule" 
                            rangeType="start" handleChange={this.changeStartDate}/>
                        </div>
                        <div className="col-sm">
                            <p className="default-text" id="lightsScheduleToText">To</p>
                            <Calendar current={this.state.to} ID="lightsSchedule" 
                            rangeType="end" handleChange={this.changeEndDate}/>
                        </div>
                        <div className="row row-custom">
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <button className="default-btn-small d-inline" id="closeButton" 
                                onClick={this.handlePopup}>Close</button>
                                <button className="default-btn-small d-inline" id="enterButton" 
                                onClick={this.saveDevices}>Enter</button>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Edit lawn area popup */}
                <div className="overlay" id={this.state.popupOverlayID_set}></div>
                <div className="popupBox" id={this.state.popupBoxID_set}>
                    <h2 className="default-text">Set Device Schedule</h2>
                    <div className="row row-custom">
                        <div className="default-text" id="areaName"></div>
                    </div>
                    <div className="row row-custom">
                        <div className="col-sm">
                            {/* TODO: add current schedule (if any), add scheduled temperature value*/}
                            <p className="default-text" id="waterScheduleFromText">From</p>
                            <Calendar current={this.state.from} ID="waterSchedule" 
                            rangeType="start" handleChange={this.changeStartDate}/>
                        </div>
                        <div className="col-sm">
                            <p className="default-text" id="waterScheduleToText">To</p>
                            <Calendar current={this.state.to} ID="waterSchedule" 
                            rangeType="end" handleChange={this.changeEndDate}/>
                        </div>
                        <div className="row row-custom">
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <button className="default-btn-small d-inline" id="closeButton" 
                                onClick={this.handlePopupSet}>Close</button>
                                <button className="default-btn-small d-inline" id="enterButton" 
                                onClick={this.updateDevices}>Enter</button>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}