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
                      current_area:"",
                      space:`\u3000`};

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
        /*
        this.state.startLight = startLight;
        var val = document.getElementById("lightingVal3");
        var newVal = startLight;
        val.innerHTML = `${newVal}%`;

        this.state.endLight = endLight;
        var val = document.getElementById("lightingVal4");
        var newVal = endLight;
        val.innerHTML = `${newVal}%`;
        */

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
    changeLightingText = () => {
        var val = document.getElementById("lightingVal1");
        var newVal = document.getElementById("lightingInput1").value;
        val.innerHTML = `${newVal}%`;
        //this.state.startLight = newVal;
    }
    changeLightingText2 = () => {
        var val = document.getElementById("lightingVal2");
        var newVal = document.getElementById("lightingInput2").value;
        val.innerHTML = `${newVal}%`;
        //this.state.endLight = newVal;
    }
    changeLightingText3 = () => {
        var val = document.getElementById("lightingVal3");
        var newVal = document.getElementById("lightingInput3").value;
        //this.state.startLight = newVal;
        val.innerHTML = `${newVal}%`;
        //this.state.startLight = newVal;
    }
    changeLightingText4 = () => {
        var val = document.getElementById("lightingVal4");
        var newVal = document.getElementById("lightingInput4").value;
        val.innerHTML = `${newVal}%`;
        //this.state.endLight = newVal;
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
                        <div className="row row-custom">
                            <div className="col-sm">
                                <p className="default-text">Start Light Intensity</p>
                                <p className="default-text" id="lightingVal1">0</p>
                                <input type="range" min="0" max="100" className="slider" id="lightingInput1" onChange={this.changeLightingText}/>
                            </div>
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <p className="default-text">End Light Intensity</p>
                                <p className="default-text" id="lightingVal2">0</p>
                                <input type="range" min="0" max="100" className="slider" id="lightingInput2" onChange={this.changeLightingText2}/>
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
                        <div className="row row-custom">
                            <div className="col-sm">
                                <p className="default-text">Start Light Intensity</p>
                                <p className="default-text" id="lightingVal3">{this.state.space}</p>
                                <input type="range" min="0" max="100" className="slider" id="lightingInput3" onChange={this.changeLightingText3}/>
                            </div>
                            <div className="col-sm">
                                <p className="default-text">End Light Intensity</p>
                                <p className="default-text" id="lightingVal4">{this.state.space}</p>
                                <input type="range" min="0" max="100" className="slider" id="lightingInput4" onChange={this.changeLightingText4}/>
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