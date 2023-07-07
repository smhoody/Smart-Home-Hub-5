class GardenIrrigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0,
                      popupOverlayID_add:"garden-water-overlay-add",
                      popupBoxID_add:"garden-water-popupBox-add",
                      popupOverlayID_set:"garden-water-overlay-set",
                      popupBoxID_set:"garden-water-popupBox-set",
                      from: "",
                      to: "",
                      current_status:false,
                      current_area:"",
                      water_label_status:""};

    }
    //on mount, build buttons for all rooms
    componentDidMount() {
        var areas = Database.retrieveLawnAreas();

        for (var areaName of Object.keys(areas)) {
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `<strong>${areaName}</strong> <br> Sprinklers: ${areas[areaName].water_status}`;
            button.className = "default-btn btn btn-primary btn-lg m-3 lawn-btn-custom";
            button.id = areaName;
            button.addEventListener("click", this.handlePopupSet.bind(null, areaName, areas[areaName].water_status));
            var container = document.getElementById("garden-sched-buttons");
            container.appendChild(button);
        }
    }
    handlePopup = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_add, this.state.popupBoxID_add, this.state.popup);
    }
    handlePopupSet = (areaName, water_status) => {
        this.state.current_status = (this.state.current_area ? this.state.current_status : water_status);
        this.state.current_area = areaName;
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, this.state.popupBoxID_set, this.state.popup);
        var checkBoxElem = document.getElementById("water-status-set");
        var labelElem = document.getElementById("water-status-text-set");
        labelElem.innerHTML = "Water " + water_status;
        checkBoxElem.checked = water_status === "On";
    }
    
    saveLawnArea = () => {
        var lawnAreaName = document.getElementById("areaNameInput").value;
        Database.saveLawnArea(lawnAreaName, this.state.from, this.state.to, "water", this.state.popupOverlayID_add, this.state.popupBoxID_add);
        this.handlePopup();
    }
    updateLawnArea = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, 
                                                  this.state.popupBoxID_set, 
                                                  this.state.popup);
        var checkBoxElem = document.getElementById("water-status-set");
        this.state.current_status = checkBoxElem.checked;
        Database.updateAreaSchedule(this.state.current_area, this.state.from, this.state.to, [this.state.current_status], "water");
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
            var checkbox_label_id_add = "#water-status-text-add";
            var checkbox_label_id_set = "#water-status-text-set";
            var checkbox_id_add = "#water-status-add";
            var checkbox_id_set = "#water-status-set";
            var ON_class = "form-check-label checkbox-label-on";
            var OFF_class = "form-check-label checkbox-label-off";
            var on_msg = "Water On";
            var off_msg = "Water Off";
            
            //change label color for checkbox label on popup
            $(checkbox_id_add).on("change", function() {
                if (this.checked) {
                    $(checkbox_label_id_add).attr("class",ON_class);
                    $(checkbox_label_id_add).html(on_msg);
                }
                else {
                    $(checkbox_label_id_add).attr("class",OFF_class);
                    $(checkbox_label_id_add).html(off_msg);
                }
            });
            $(checkbox_id_set).on("change", function() {
                if (this.checked) {
                    $(checkbox_label_id_set).attr("class",ON_class);
                    $(checkbox_label_id_set).html(on_msg);
                }
                else {
                    $(checkbox_label_id_set).attr("class",OFF_class);
                    $(checkbox_label_id_set).html(off_msg);
                }
            });
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
                    <h2 className="default-text">Set Irrigation Schedule</h2>
                    <div className="row row-custom">
                        <div className="col-sm">
                            <div>
                                <p className="default-text">Enter Lawn Area Name</p>
                                <input id="areaNameInput" text="Enter Area"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row row-custom">
                        <div className="col-sm">
                            <p className="default-text calendar-label" id="waterScheduleFromText">From</p>
                            <Calendar current={this.state.from} ID="waterSchedule" 
                            rangeType="start" handleChange={this.changeStartDate}/>
                            <p className="default-text calendar-label" id="waterScheduleToText">To</p>
                            <Calendar current={this.state.to} ID="waterSchedule" 
                            rangeType="end" handleChange={this.changeEndDate}/>
                        </div>
                        <div className="col-sm">
                            
                        </div>
                        <div className="row row-custom">
                            <div className="col-sm">
                                <button className="default-btn-small d-inline" id="closeButton" 
                                onClick={this.handlePopup}>Close</button>
                                <button className="default-btn-small d-inline" id="enterButton" 
                                onClick={this.saveLawnArea}>Enter</button>
                            </div>
                            <div className="col-sm">
                                <div className="form-check form-switch form-check-inline">
                                  <input className="form-check-input default-checkbox" 
                                  type="checkbox" role="switch" id="water-status-add"/>
                                  <label className="form-check-label checkbox-label-off" 
                                  htmlFor="water-status-add" id="water-status-text-add">Water Off</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Edit lawn area popup */}
                {/* //need to add a Remove Area button to each lawn button */}
                <div className="overlay" id={this.state.popupOverlayID_set}></div>
                <div className="popupBox" id={this.state.popupBoxID_set}>
                    <h2 className="default-text">Set Irrigation Schedule</h2>
                    <div className="row row-custom">
                        <div className="default-text" id="areaName"></div>
                    </div>
                    <div className="row row-custom">
                        <div className="col-sm">
                            {/* TODO: add current schedule (if any), add scheduled temperature value*/}
                            <p className="default-text" id="waterScheduleFromTextSet">From</p>
                            <Calendar current={this.state.from} ID="waterScheduleSet" 
                            rangeType="start" handleChange={this.changeStartDate}/>
                        </div>
                        <div className="col-sm">
                            <p className="default-text" id="waterScheduleToTextSet">To</p>
                            <Calendar current={this.state.to} ID="waterScheduleSet" 
                            rangeType="end" handleChange={this.changeEndDate}/>
                        </div>
                        <div className="row row-custom">
                            <div className="col-sm ">
                                <button className="default-btn-small d-inline" id="closeButton" 
                                onClick={this.handlePopupSet}>Close</button>
                                <button className="default-btn-small d-inline" id="enterButton" 
                                onClick={this.updateLawnArea}>Enter</button>
                            </div>
                            <div className="col-sm">
                                <div className="form-check form-switch form-check-inline">
                                  <input className="form-check-input default-checkbox" 
                                  type="checkbox" role="switch" id="water-status-set"/>
                                  <label className="form-check-label checkbox-label-off" 
                                  htmlFor="water-status-set" id="water-status-text-set">Water Off</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}