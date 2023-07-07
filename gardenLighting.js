class GardenLighting extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0,
                      popupOverlayID_add:"garden-lights-overlay-add",
                      popupBoxID_add:"garden-lights-popupBox-add",
                      popupOverlayID_set:"garden-lights-overlay-set",
                      popupBoxID_set:"garden-lights-popupBox-set",
                      from: "",
                      to: "",
                      start_brightness:50,
                      end_brightness:50,
                      current_area:"",
                      space:`\u3000`};

    }
    //on mount, build buttons for all rooms
    componentDidMount() {
        var areas = Database.retrieveLawnAreas();

        for (var areaName of Object.keys(areas)) {
            //check if either start/end date is above 0. Lights are on if either value is >0
            var status = ((areas[areaName].lights_start_status + areas[areaName].lights_end_status) ? "On" : "Off");
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `<strong>${areaName}</strong> <br> Lights: ${status}`;
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
    saveLawnArea = () => {
        var lawnAreaName = document.getElementById("areaNameInput-lights").value;
        Database.saveLawnArea(lawnAreaName, this.state.from, this.state.to, "lights", this.state.popupOverlayID_add, this.state.popupBoxID_add);
        this.handlePopup();
    }

    /** 
     * Update local storage with data from editing a lawn area
     */
    updateLawnArea = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, 
                                                  this.state.popupBoxID_set, 
                                                  this.state.popup);
        //get values of brightness from the Edit popup box
        this.state.start_brightness = parseInt(Util.getInputValue("start-lightingInput-set"));
        this.state.end_brightness = parseInt(Util.getInputValue("end-lightingInput-set"));
        Database.updateAreaSchedule(this.state.current_area, 
                                    this.state.from, 
                                    this.state.to, 
                                    [this.state.start_brightness, this.state.end_brightness], 
                                    "lights");
    }

    changeStartDate = (date) => {
        this.setState({from:date});
    }
    changeEndDate = (date) => {
        this.setState({to:date});
    }
    changeLightingText = () => {
        var val = document.getElementById("start-lightingVal-add");
        var newVal = document.getElementById("start-lightingInput-add").value;
        val.innerHTML = `${newVal}%`;
        //this.state.startLight = newVal;
    }
    changeLightingText2 = () => {
        var val = document.getElementById("end-lightingVal-add");
        var newVal = document.getElementById("end-lightingInput-add").value;
        val.innerHTML = `${newVal}%`;
        //this.state.endLight = newVal;
    }
    changeLightingText3 = () => {
        var val = document.getElementById("start-lightingVal-set");
        var newVal = document.getElementById("start-lightingInput-set").value;
        //this.state.startLight = newVal;
        val.innerHTML = `${newVal}%`;
        //this.state.startLight = newVal;
    }
    changeLightingText4 = () => {
        var val = document.getElementById("end-lightingVal-set");
        var newVal = document.getElementById("end-lightingInput-set").value;
        val.innerHTML = `${newVal}%`;
        //this.state.endLight = newVal;
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
                        onClick={this.handlePopup}>Add Lawn Area</button>
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
                    <h2 className="default-text">Set Lighting Schedule</h2>
                    <div className="row row-custom">
                        <div className="col-sm">
                            <div>
                                <p className="default-text">Enter Lawn Area Name</p>
                                <input id="areaNameInput-lights" text="Enter Area"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row row-custom">
                        <div className="row row-custom">
                            <div className="col-sm">
                                <p className="default-text">Start Light Intensity</p>
                                <div className="col-sm default-inline">
                                    {/* LIGHT BULB - use this ID for changeLighting() */}
                                    <img className="bulb" src="resources/bulb.png" id="start-lightImg-add"></img> 
                                    {/* LIGHTING VALUE - use this ID for changeLighting() */}
                                    <p className="default-text settingValue" id="start-lightingVal-add">{this.state.start_brightness}%</p>
                                </div>
                                {/* <p className="default-text" id="lightingVal1">0</p> */}
                                <input type="range" min="0" max="100" className="slider" id="start-lightingInput-add" onChange={this.changeLightingText}/>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <p className="default-text">End Light Intensity</p>
                                <div className="col-sm default-inline">
                                    {/* LIGHT BULB - use this ID for changeLighting() */}
                                    <img className="bulb" src="resources/bulb.png" id="end-lightImg-add"></img> 
                                    {/* LIGHTING VALUE - use this ID for changeLighting() */}
                                    <p className="default-text settingValue" id="end-lightingVal-add">{this.state.end_brightness}%</p>
                                </div>
                                {/* <p className="default-text" id="lightingVal2">0</p> */}
                                <input type="range" min="0" max="100" className="slider" id="end-lightingInput-add" onChange={this.changeLightingText2}/>
                            </div>
                        </div>
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
                            <div className="col-sm">
                                <button className="default-btn-small" id="closeButton" 
                                onClick={this.handlePopup}>Close</button>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <button className="default-btn-small" id="enterButton" 
                                onClick={this.saveLawnArea}>Enter</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit lawn area popup */}
                <div className="overlay" id={this.state.popupOverlayID_set}></div>
                <div className="popupBox" id={this.state.popupBoxID_set}>
                    <h2 className="default-text">Set Lighting Schedule</h2>
                    <div className="row row-custom">
                        <div className="default-text" id="areaName"></div>
                    </div>
                    <div className="row row-custom">
                        <div className="row row-custom">
                            <div className="col-sm">
                                <p className="default-text">Start Light Intensity</p>
                                <div className="col-sm default-inline">
                                    {/* LIGHT BULB - use this ID for changeLighting() */}
                                    <img className="bulb" src="resources/bulb.png" id="end-lightImg-set"></img> 
                                    {/* LIGHTING VALUE - use this ID for changeLighting() */}
                                    <p className="default-text settingValue" id="start-lightingVal-set">{this.state.start_brightness}%</p>
                                </div>
                                {/* <p className="default-text" id="lightingVal3">{this.state.space}</p> */}
                                <input type="range" min="0" max="100" className="slider" id="start-lightingInput-set" onChange={this.changeLightingText3}/>
                            </div>
                            <div className="col-sm">
                                <p className="default-text">End Light Intensity</p>
                                <div className="col-sm default-inline">
                                    {/* LIGHT BULB - use this ID for changeLighting() */}
                                    <img className="bulb" src="resources/bulb.png" id="end-lightImg-set"></img> 
                                    {/* LIGHTING VALUE - use this ID for changeLighting() */}
                                    <p className="default-text settingValue" id="end-lightingVal-set">{this.state.end_brightness}%</p>
                                </div>
                                {/* <p className="default-text" id="lightingVal4">{this.state.space}</p> */}
                                <input type="range" min="0" max="100" className="slider" id="end-lightingInput-set" onChange={this.changeLightingText4}/>
                            </div>
                        </div>
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
                            <div className="col-sm">
                                <button className="default-btn-small" id="closeButton" 
                                onClick={this.handlePopupSet}>Close</button>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <button className="default-btn-small" id="enterButton" 
                                onClick={this.updateLawnArea}>Enter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}