class FridgeSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0, fridgeTemp:30, freezerTemp:0, brightness:70, dispenser:"Water"};
        <Database/>
    }
    componentDidMount() {
        var settings = Database.retrieveSettings();
        if(settings != null){
            for(var name of Object.keys(settings)) {
                if(name == "fridgeTemp"){
                    this.updateFridge(settings[name].setting);
                } else if(name == "freezerTemp"){
                    this.updateFreezer(settings[name].setting);
                } else if(name == "brightness"){
                    this.updateBrightness(settings[name].setting);
                } else if(name == "dispenser"){
                    this.updateDispenser(settings[name].setting);
                }
            }
        }
        //console.log(this.state.freezerTemp);
    }
    componentWillUnmount(){
        Database.saveSettings(this.state.fridgeTemp, this.state.freezerTemp, this.state.brightness, this.state.dispenser);
    }
    handleFreezerPopupChange = () => {this.state.popup = Util.handlePopupChange("room-overlay", "freezer-popupBox", this.state.popup);}
    // handleFreezerPopupChange = () => {
    //     var overlay = document.getElementById("room-overlay");
    //     var popupBox = document.getElementById("freezer-popupBox");
    //     if (this.state.popup === 0) {
    //         overlay.style.display = "block";
    //         popupBox.style.display = "block";
    //         this.state.popup = 1;
    //     } else if (this.state.popup === 1) {
    //         overlay.style.display = "none";
    //         popupBox.style.display = "none";
    //         this.state.popup = 0;
    //     }
    // }
    handleFridgePopupChange = () => {this.state.popup = Util.handlePopupChange("fridge-overlay", "fridge-popupBox", this.state.popup);}
    // handleFridgePopupChange = () => {
    //     var overlay = document.getElementById("fridge-overlay");
    //     var popupBox = document.getElementById("fridge-popupBox");
    //     if (this.state.popup === 0) {
    //         overlay.style.display = "block";
    //         popupBox.style.display = "block";
    //         this.state.popup = 1;
    //     } else if (this.state.popup === 1) {
    //         overlay.style.display = "none";
    //         popupBox.style.display = "none";
    //         this.state.popup = 0;
    //     }
    // }
    handleLightingPopupChange = () => {this.state.popup = Util.handlePopupChange("lighting-overlay", "lighting-popupBox", this.state.popup);}
    // handleLightingPopupChange = () => {
    //     var overlay = document.getElementById("lighting-overlay");
    //     var popupBox = document.getElementById("lighting-popupBox");
    //     if (this.state.popup === 0) {
    //         overlay.style.display = "block";
    //         popupBox.style.display = "block";
    //         this.state.popup = 1;
    //     } else if (this.state.popup === 1) {
    //         overlay.style.display = "none";
    //         popupBox.style.display = "none";
    //         this.state.popup = 0;
    //     }
    // }
    handleWaterPopupChange = () => {this.state.popup = Util.handlePopupChange("water-overlay", "water-popupBox", this.state.popup);}
    // handleWaterPopupChange = () => {
    //     var overlay = document.getElementById("water-overlay");
    //     var popupBox = document.getElementById("water-popupBox");
    //     if (this.state.popup === 0) {
    //         overlay.style.display = "block";
    //         popupBox.style.display = "block";
    //         this.state.popup = 1;
    //     } else if (this.state.popup === 1) {
    //         overlay.style.display = "none";
    //         popupBox.style.display = "none";
    //         this.state.popup = 0;
    //     }
    // }
    changeFreezerText = () => {
        var val = document.getElementById("freezerTempVal");
        var newVal = document.getElementById("freezerTempInput").value;
        val.innerHTML = newVal;
    }
    changeFridgeText = () => {
        var val = document.getElementById("fridgeTempVal");
        var newVal = document.getElementById("fridgeTempInput").value;
        val.innerHTML = newVal;
    }
    changeLightingText = () => {
        var val = document.getElementById("lightingVal");
        var newVal = document.getElementById("lightingInput").value;
        val.innerHTML = `${newVal}%`;
    }
    confirmFreezer = () => {
        var val = document.getElementById("freezer-btn");
        var newVal = document.getElementById("freezerTempInput").value;
        this.state.freezerTemp = newVal;
        val.innerHTML = `${newVal} \u00B0`;
    }
    confirmFridge = () => {
        var val = document.getElementById("fridge-btn");
        var newVal = document.getElementById("fridgeTempInput").value;
        this.state.fridgeTemp = newVal;
        val.innerHTML = `${newVal} \u00B0`;
    }
    confirmLighting = () => {
        var val = document.getElementById("lighting-btn");
        var newVal = document.getElementById("lightingInput").value;
        this.state.brightness = newVal;
        val.innerHTML = `${newVal}%`;
    }
    confirmDispenser = () => {
        var val = document.getElementById("water-btn");
        if(document.getElementById("WaterInput").checked) {
            this.state.dispenser = "Water";
            val.innerHTML = `Water`;
        } else {
            this.state.dispenser = "Ice";
            val.innerHTML = `Ice`;
        }
    }
    updateFridge = (temp) => {
        this.state.fridgeTemp = temp;
        var val = document.getElementById("fridgeTempVal");
        var btnVal = document.getElementById("fridge-btn");
        val.innerHTML = `${temp} \u00B0`;
        btnVal.innerHTML = `${temp} \u00B0`;
    }
    updateFreezer = (temp) => {
        this.state.freezerTemp = temp;
        var val = document.getElementById("freezerTempVal");
        var btnVal = document.getElementById("freezer-btn");
        val.innerHTML = `${temp} \u00B0`;
        btnVal.innerHTML = `${temp} \u00B0`;
    }
    updateBrightness = (temp) => {
        this.state.brightness = temp;
        var val = document.getElementById("lightingVal");
        var btnVal = document.getElementById("lighting-btn");
        val.innerHTML = temp;
        btnVal.innerHTML = `${temp}%`;
    }
    updateDispenser = (temp) => {
        this.state.dispenser = temp;
        //var val = document.getElementById("lightingVal");
        var btnVal = document.getElementById("water-btn");
        //val.innerHTML = temp;
        btnVal.innerHTML = temp;
    }
    render(){
        return(
            <div className="text-center">
                <div className="overlay" id="room-overlay"></div>
                <div className="row row-custom3">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleFreezerPopupChange}>Freezer Temp<br/><p id="freezer-btn">{this.state.freezerTemp}&deg;</p></button>
                        <div className="popupBox" id="freezer-popupBox">
                            <h2 className="default-text">Change Freezer Temperature</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Freezer Temperature</p>
                                <p className="default-text" id="freezerTempVal">{this.state.freezerTemp}</p>
                                <input type="range" min="0" max="100" className="slider" id="freezerTempInput" onChange={this.changeFreezerText}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handleFreezerPopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={(this.handleFreezerPopupChange, this.confirmFreezer)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleFridgePopupChange}>Fridge Temp<br/><p id="fridge-btn">{this.state.fridgeTemp}&deg;</p></button>
                        <div className="overlay" id="fridge-overlay"></div>
                            <div className="popupBox" id="fridge-popupBox">
                            <h2 className="default-text">Change Fridge Temperature</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Fridge Temperature</p>
                                <p className="default-text" id="fridgeTempVal">{this.state.fridgeTemp}</p>
                                <input type="range" min="0" max="100" className="slider" id="fridgeTempInput" onChange={this.changeFridgeText}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handleFridgePopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={(this.handleFridgePopupChange, this.confirmFridge)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                </div>
                <div className="row row-custom3">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleWaterPopupChange}>Water/Ice Maker<br/><p id="water-btn">{this.state.dispenser}</p></button>
                        <div className="overlay" id="water-overlay"></div>
                            <div className="popupBox" id="water-popupBox">
                            <h2 className="default-text">Change Water Dispenser</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Choose Dispenser Type</p>
                                <input type="radio" className="cstm-checkbox" id="WaterInput" name="Water_Ice" value="Water" onChange={this.changeWaterText}/>
                                <label for="WaterInput" className="default-text">Water</label><br/>
                                <input type="radio" className="cstm-checkbox" id="IceInput" name="Water_Ice" value="Ice" onChange={this.changeWaterText}/>
                                <label for="IceInput" className="default-text">Ice</label>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handleWaterPopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={(this.handleWaterPopupChange, this.confirmDispenser)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleLightingPopupChange}>Lighting<br/><p id="lighting-btn">{this.state.brightness}%</p></button>
                        <div className="overlay" id="lighting-overlay"></div>
                            <div className="popupBox" id="lighting-popupBox">
                            <h2 className="default-text">Change Brightness</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Fridge Brightness</p>
                                <p className="default-text" id="lightingVal">{this.state.brightness}%</p>
                                <input type="range" min="0" max="100" className="slider" id="lightingInput" onChange={this.changeLightingText}/>
                            </div>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn-small" id="closeButton" 
                                    onClick={this.handleLightingPopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn-small" id="enterButton" 
                                    onClick={(this.handleLightingPopupChange, this.confirmLighting)}>Enter</button>
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