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
                    this.state.fridgeTemp = settings[name].setting;
                } else if(name == "freezerTemp"){
                    this.updateFreezer(settings[name].setting);
                    this.state.freezerTemp = settings[name].setting;
                } else if(name == "brightness"){
                    this.updateBrightness(settings[name].setting);
                    this.state.brightness= settings[name].setting;
                } else if(name == "dispenser"){
                    this.updateDispenser(settings[name].setting);
                    this.state.dispenser = settings[name].setting;
                }
            }
        }
    }
    componentWillUnmount(){
        Database.saveSettings(this.state.fridgeTemp, this.state.freezerTemp, this.state.brightness, this.state.dispenser);
    }
    handleFreezerPopupChange = () => {this.state.popup = Util.handlePopupChange("room-overlay", "freezer-popupBox", this.state.popup);}
    handleFridgePopupChange = () => {this.state.popup = Util.handlePopupChange("fridge-overlay", "fridge-popupBox", this.state.popup);}
    handleLightingPopupChange = () => {this.state.popup = Util.handlePopupChange("lighting-overlay", "lighting-popupBox", this.state.popup);}
    handleWaterPopupChange = () => {this.state.popup = Util.handlePopupChange("water-overlay", "water-popupBox", this.state.popup);}

    changeFreezerText = () => {
        //change value displayed on Freezer popup (include color) 
        Util.changeText("freezerTempVal", "freezerTempInput", "temp-fridge");
    }
    changeFridgeText = () => {
        //change value displayed on Fridge popup (include color) 
        Util.changeText("fridgeTempVal", "fridgeTempInput", "temp-fridge");
    }
    changeLightingText = () => {
        //update lighting value on popup window and light bulb opacity
        Util.changeLighting("fridge-lightingVal", "fridge-lightingInput", "fridge-lightImg");
    }
    confirmFreezer = () => {
        this.handleFreezerPopupChange(); //close popup
        //update value displayed on Freezer button on page (no color) 
        this.state.freezerTemp = Util.changeText("freezer-btn", "freezerTempInput", "temp");
    }
    confirmFridge = () => {
        this.handleFridgePopupChange(); //close popup
        //update value displayed on Fridge button on page (no color) 
        this.state.fridgeTemp = Util.changeText("fridge-btn", "fridgeTempInput", "temp");
    }
    confirmLighting = () => {
        this.handleLightingPopupChange(); //close popup
        //change value displayed on the Lighting button 
        this.state.brightness = Util.changeText("fridge-lighting-btn", "fridge-lightingInput", "brightness")
    }
    confirmDispenser = () => {
        this.handleWaterPopupChange(); //close popup
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
        var val = document.getElementById("fridge-lightingVal");
        var btnVal = document.getElementById("fridge-lighting-btn");
        val.innerHTML = `${temp}%`;
        btnVal.innerHTML = `${temp}%`;
    }
    updateDispenser = (temp) => {
        this.state.dispenser = temp;
        var btnVal = document.getElementById("water-btn");
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
                                <input type="range" min="-4" max="4"className="slider" id="freezerTempInput" onChange={this.changeFreezerText}/>
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
                                <p className="default-text tempValue" id="fridgeTempVal">{this.state.fridgeTemp}</p>
                                <input type="range" min="32" max="40" className="slider" id="fridgeTempInput" onChange={this.changeFridgeText}/>
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
                                <label htmlFor="WaterInput" className="default-text">Water</label><br/>
                                <input type="radio" className="cstm-checkbox" id="IceInput" name="Water_Ice" value="Ice" onChange={this.changeWaterText}/>
                                <label htmlFor="IceInput" className="default-text">Ice</label>
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
                            onClick={this.handleLightingPopupChange}>Lighting<br/><p id="fridge-lighting-btn">{this.state.brightness}%</p></button>
                        <div className="overlay" id="lighting-overlay"></div>
                            <div className="popupBox" id="lighting-popupBox">
                            <h2 className="default-text">Change Brightness</h2>
                            <div className="col-sm default-inline">
                                {/* LIGHT BULB - use ID for changeLighting() */}
                                <img className="bulb" src="resources/bulb.png" id="fridge-lightImg"></img> 
                                {/* LIGHTING VALUE - use ID for changeLighting() */}
                                <p className="default-text settingValue" id="fridge-lightingVal">{this.state.brightness}%</p>
                            </div>
                                <input type="range" min="0" max="100" className="slider" id="fridge-lightingInput" onChange={this.changeLightingText}/>
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