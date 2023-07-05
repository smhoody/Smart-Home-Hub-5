class FridgeSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0, fridgeTemp:30, freezerTemp:0, brightness:70};
        <Database PopupChange={this.handlePopupChange}/>
    }
    handleFreezerPopupChange = () => {
        var overlay = document.getElementById("room-overlay");
        var popupBox = document.getElementById("freezer-popupBox");
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
    handleFridgePopupChange = () => {
        var overlay = document.getElementById("fridge-overlay");
        var popupBox = document.getElementById("fridge-popupBox");
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
    handleLightingPopupChange = () => {
        var overlay = document.getElementById("lighting-overlay");
        var popupBox = document.getElementById("lighting-popupBox");
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
    handleWaterPopupChange = () => {
        var overlay = document.getElementById("water-overlay");
        var popupBox = document.getElementById("water-popupBox");
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
    render(){
        return(
            <div className="text-center">
                <div className="overlay" id="room-overlay"></div>
                <div className="row row-custom3">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleFreezerPopupChange}>Freezer Temp</button>
                        <div className="popupBox" id="freezer-popupBox">
                            <h2 className="default-text">Change Freezer Temperature</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Freezer Temperature</p>
                                <p className="default-text" id="freezerTempVal">0</p>
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
                                    onClick={(this.handleFreezerPopupChange)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleFridgePopupChange}>Fridge Temp</button>
                        <div className="overlay" id="fridge-overlay"></div>
                            <div className="popupBox" id="fridge-popupBox">
                            <h2 className="default-text">Change Fridge Temperature</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Fridge Temperature</p>
                                <p className="default-text" id="fridgeTempVal">this.state.fridgeTemp</p>
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
                                    onClick={(this.handleFridgePopupChange)}>Enter</button>
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
                            onClick={this.handleWaterPopupChange}>Water/Ice Maker</button>
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
                                    onClick={(this.handleWaterPopupChange)}>Enter</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-3 btn-custom"
                            onClick={this.handleLightingPopupChange}>Lighting</button>
                        <div className="overlay" id="lighting-overlay"></div>
                            <div className="popupBox" id="lighting-popupBox">
                            <h2 className="default-text">Change Brightness</h2>
                            <div>
                                <p className="default-text" id="roomTempText">Enter Fridge Brightness</p>
                                <p className="default-text" id="lightingVal">70%</p>
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
                                    onClick={(this.handleLightingPopupChange)}>Enter</button>
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