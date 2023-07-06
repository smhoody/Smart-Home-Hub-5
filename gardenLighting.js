class GardenLighting extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0,
                      popupOverlayID_add:"garden-water-overlay-add",
                      popupBoxID_add:"garden-water-popupBox-add",
                      popupOverlayID_set:"garden-water-overlay-set",
                      popupBoxID_set:"garden-water-popupBox-set",
                      from: new Date(),
                      to: new Date(),
                      current_status:false,
                      current_area:""};

    }
    //on mount, build buttons for all rooms
    componentDidMount() {
        var areas = Database.retrieveLawnAreas();

        for (var areaName of Object.keys(areas)) {
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `${areaName} <br> Status: ${areas[areaName].status}`;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            button.addEventListener("click", this.handlePopupSet.bind(null, areaName));
            var container = document.getElementById("garden-sched-buttons");
            container.appendChild(button);
        }
    }
    handlePopup = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_add, this.state.popupBoxID_add, this.state.popup);
    }
    handlePopupSet = (areaName) => {
        this.current_area = areaName;
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, this.state.popupBoxID_set, this.state.popup, areaName);
    }

    saveLawnArea = () => {
        var lawnAreaName = document.getElementById("areaNameInput").value;
        Database.saveLawnArea(lawnAreaName, this.state.from, this.state.to, this.state.popupOverlayID_add, this.state.popupBoxID_add);
    }
    updateLawnArea = () => {
        this.state.popup = Util.handlePopupChange(this.state.popupOverlayID_set, this.state.popupBoxID_set, this.state.popup, this.state.current_area);
        Database.updateAreaSchedule(this.state.current_area, this.state.from, this.state.to);
    }

    changeStartDate = (date) => {
        this.setState({from:date});
    }
    changeEndDate = (date) => {
        this.setState({to:date});
    }

    render(){
        return(
            <div className="text-center">
                <div className="overlay" id={this.state.popupOverlayID_add}></div>
                <div className="row row-custom">
                <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-1"
                        onClick={this.handlePopup}>Add Lawn Area</button>
                    </div>
                <div className="popupBox" id={this.state.popupBoxID_add}>
                    <h2 className="default-text">Set Lighting Schedule</h2>
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
                                onClick={this.handlePopup}>Close</button>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <button className="default-btn-small" id="enterButton" 
                                onClick={this.saveLawnArea}>Enter</button>
                            </div>
                            <div className="col-sm">
                                <input type="checkbox" className="default-checkBox" id="lawnStatus" name="Start Water"/>
                            </div>
                        </div>
                    </div>
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

                <div className="overlay" id={this.state.popupOverlayID_set}></div>
                <div className="popupBox" id={this.state.popupBoxID_set}>
                    <h2 className="default-text">Set Lighting Schedule</h2>
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