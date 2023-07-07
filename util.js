class Database extends React.Component {
    constructor(props) {
        super(props);
        this.state = {popup:0};
    }


    /** Returns local storage for given key
     * @param {String} key local storage key
     * @returns `Object` local storage object for given key
     */
    static getDB(key) {
        var db = null;
        var dbObj = localStorage.getItem(key);
        db = JSON.parse(dbObj);

        //if db isn't null, return db, else return empty object 
        return (db ? db : {}); 
    }

    /**Saves database object to local storage key
     * @param {Object} db database object (e.g. rooms{}, lawnAreas{})
     * @param {String} key key for local storage (e.g. "rooms", "lawnAreas")
     * @returns `Bool` status of the saving to local storage
     */
    static saveDB(db, key) {
        var JSONObject = JSON.stringify(db);
        if (JSONObject != null) {
            localStorage.setItem(key, JSONObject);
            return true;
        } else {return false;}
    }

    /** Save room info to local storage
     * @param {String} roomNameID html ID of the input field for room name 
     * @param {String} tempValueID html ID of the input slider for room temperature
     */
    static saveRoom(roomNameID, tempValueID) {
        //get values from HTML input fields 
        var roomName = Util.getInputValue(roomNameID);
        var roomTemp = Util.getInputValue(tempValueID);

        //Important: RETURN from function if ID of either room name or value is not found
        if (roomName === "" || roomTemp === "") {return;} 

        var db = this.getDB("rooms");

        db[roomName] = {temp:roomTemp,
                        schedule_start:"",
                        schedule_end:""};

        //save to local storage
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("rooms", JSONObject);

        // Warning: the buttons added depend on the overlay and popup IDs for the page!!
        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = `<strong>${roomName}</strong> <br> Temp: ${roomTemp}`;
        button.id = roomName;
        button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
        button.addEventListener("click", () => {
            //Warning: change these values if IDs of divs in page change
            var overlay = document.getElementById("rooms-overlay");
            var popupBox = document.getElementById("rooms-popupBox");
            if (this.state.popup === 0) {
                overlay.style.display = "block";
                popupBox.style.display = "block";
                this.state.popup = 1;
            } else if (this.state.popup === 1) {
                overlay.style.display = "none";
                popupBox.style.display = "none";
                this.state.popup = 0;
            }
        });
        var container = document.getElementById("roomButtons");
        container.appendChild(button);
        
    }


    static updateRoom(roomName, roomTempInput) {
        var db = this.getDB("rooms");

        var roomTemp = Util.getInputValue(roomTempInput); //get temp from input tag

        //if input field value was found and proper room name, save to database
        if (roomName && roomTemp) {
            db[roomName].temp = roomTemp;
        }

        var roomButtonElement = document.getElementById(roomName);
        roomButtonElement.innerHTML = `<strong>${roomName}</strong> <br> Temp: ${roomTemp}`;

        this.saveDB(db,"rooms");
    }


    //update the room temperature schedule
    //params: 
    // - roomName: String (name/key of room)
    // - from: Date (start date of schedule)
    // - to: Date (end date of schedule) 
    static updateRoomSchedule(roomName, from, to) {
        var db = this.getDB("rooms");

        //update schedules
        db[roomName].schedule_start = from;
        db[roomName].schedule_end = to;
        var JSONObject = JSON.stringify(db);        
        localStorage.setItem("rooms", JSONObject);
    }

    static retrieveRoom = () => {
        var JSONObject = localStorage.getItem("rooms");
        var JSObject = JSON.parse(JSONObject);
        return(JSObject);
    }
    

    /** Save lawn area data to local storage
     * @param {String} areaName name of lawn area
     * @param {Date} from start date of schedule
     * @param {Date} to end date of schedule
     * @param {String} type type of status/schedule (e.g. "water" or "lights")
     * @param {String} overlayID html ID of the overlay for the page
     * @param {String} popupID html ID of the popup for the page
     */
    static saveLawnArea(areaName, from, to, type, overlayID, popupID) {
        var db = this.getDB("lawnAreas");
        var buttonText = "";

        //default lawn values
        var w_status = "Off";
        var w_start = "";
        var w_end = "";
        var l_start_status = 0;
        var l_end_status = 0;
        var l_start = "";
        var l_end = "";

        switch (type) { //check which type of lawn data is being received
            
            //data is from Garden Irrigation page
            case "water": w_status = Util.getCheckboxStatus("water-status");
                          w_start = from;
                          w_end = to;
                          buttonText = `<strong>${areaName}</strong> 
                                        <br> Sprinklers: ${w_status}`;
                          break;

            //data is from Garden Lighting page
            case "lights": l_start_status = parseInt(Util.getInputValue("start-lightingInput-add"));
                           l_end_status = parseInt(Util.getInputValue("end-lightingInput-add"));
                           l_start = from;
                           l_end = to;
                           //check if either start/end date is above 0. Lights are on if either value is >0
                           var status = ((l_start_status + l_end_status) ? "On" : "Off");
                           buttonText = `<strong>${areaName}</strong> 
                                         <br> Lights: ${status}`;
                           break;
            default: break;
        }

        //save lawn data
        db[areaName] = {       water_status: w_status,
                                water_start: w_start,
                                  water_end: w_end,
                        lights_start_status: l_start_status,
                          lights_end_status: l_end_status,
                               lights_start: l_start,
                                 lights_end: l_end};

        this.saveDB(db, "lawnAreas");

        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = buttonText;
        button.id = areaName;
        button.className = "default-btn btn btn-primary btn-lg m-3 lawn-btn-custom";
        button.addEventListener("click", () => {
            var overlay = document.getElementById(overlayID);
            var popupBox = document.getElementById(popupID);
            if (this.state.popup === 0) {
                overlay.style.display = "block";
                popupBox.style.display = "block";
                this.state.popup = 1;
            } else if (this.state.popup === 1) {
                overlay.style.display = "none";
                popupBox.style.display = "none";
                this.state.popup = 0;
            }
        });
        var container = document.getElementById("garden-sched-buttons");
        container.appendChild(button);
    }


   /** Update garden schedule
    * @param {String} areaName name/key of lawn area
    * @param {Date} from start date of schedule
    * @param {Date} to end date of schedule 
    * @param {Array<Int>} values array of statuses (e.g. [0,1] 0=Off,1 for On)
    * @param {String} type type of schedule ("water" or "lights")
    */
    static updateAreaSchedule(areaName, from, to, values, type) {
        var db = this.getDB("lawnAreas");
        var buttonText = "";        
        
        //update schedule for water or lighting
        switch (type) {
            case "water":  
                //for water type, values is only 1 element [0] or [1] 
                //convert status bool to string
                var status = (values[0] ? "On" : "Off");
                db[areaName].water_status = status;
                db[areaName].water_start = from;
                db[areaName].water_end = to; 
                buttonText = `<strong>${areaName}</strong> <br> Sprinklers: ${status}`;
                break;

            case "lights": 
                //for lighting type, values is 2 elements [{0-100}, {0-100}]
                db[areaName].lights_start_status = values[0];
                db[areaName].lights_end_status = values[1];
                db[areaName].lights_start = from;
                db[areaName].lights_end = to;
                //check if either start/end date is above 0. Lights are on if either value is >0
                var status = ((values[0] + values[1]) ? "On" : "Off");
                buttonText = `<strong>${areaName}</strong> <br> Lights: ${status}`;
                break;

            default: break;
        }

        var areaButtonElement = document.getElementById(areaName);
        areaButtonElement.innerHTML = buttonText;
        this.saveDB(db, "lawnAreas");
    }
    
    /**Return lawn area data
     * @returns `Object` (e.g.: {*lawn name*: {water_status:"", water_start:""...}})
     * Object = { } if no lawn area data has been created
     */
    static retrieveLawnAreas() {
        return(this.getDB("lawnAreas"));
    }

    static saveSettings(fridgeTemp, freezerTemp, brightness, dispenser) {
        var dbObj = localStorage.getItem("fridgeSettings");
        var db = JSON.parse(dbObj);
        console.log("frid: " +db);
        if (db === null) //if the database hasn't been created yet 
            db = {};

        //db["settings"] = {FridgeTemp:fridgeTemp, FreezerTemp:freezerTemp, Brightness:brightness, Dispenser:dispenser};
        db["fridgeTemp"] = {setting:fridgeTemp};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("fridgeSettings", JSONObject);

        db["freezerTemp"] = {setting:freezerTemp};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("fridgeSettings", JSONObject);

        db["brightness"] = {setting:brightness};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("fridgeSettings", JSONObject);

        db["dispenser"] = {setting:dispenser};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("fridgeSettings", JSONObject);
    }
    static retrieveSettings() {
        var JSONObject = localStorage.getItem("fridgeSettings");
        var JSObject = JSON.parse(JSONObject);
        return(JSObject);
    }


    /** Save Device data to local storage
     * @param {String} areaName name of lawn area
     * @param {Date} from start date of schedule
     * @param {Date} to end date of schedule
     * @param {String} overlayID html ID of the overlay for the page
     * @param {String} popupID html ID of the popup for the page
     */
    static saveDevices(device, from, to, overlayID, popupID) {
        var db = this.getDB("devices");
        //var buttonText = "";

        //default lawn values
        var w_status = "Off";
        //var w_start = "";
        //var w_end = "";
        var w_start = from;
        var w_end = to;

        //save device data
        db[device] = {       water_status: w_status,
                                water_start: w_start,
                                  water_end: w_end};

        this.saveDB(db, "devices");

        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = `<strong>${device}</strong>`;
        button.id = device;
        button.className = "default-btn btn btn-primary btn-lg m-3 lawn-btn-custom";
        button.addEventListener("click", () => {
            var overlay = document.getElementById(overlayID);
            var popupBox = document.getElementById(popupID);
            if (this.state.popup === 0) {
                overlay.style.display = "block";
                popupBox.style.display = "block";
                this.state.popup = 1;
            } else if (this.state.popup === 1) {
                overlay.style.display = "none";
                popupBox.style.display = "none";
                this.state.popup = 0;
            }
        });
        var container = document.getElementById("garden-sched-buttons");
        container.appendChild(button);
    }


   /** Update device schedule
    * @param {String} areaName name/key of lawn area
    * @param {Date} from start date of schedule
    * @param {Date} to end date of schedule 
    * @param {Array<Int>} values array of statuses (e.g. [0,1] 0=Off,1 for On)
    */
    static updateDevices(device, from, to, values, status) {
        var db = this.getDB("devices");
        var buttonText = "";        
        
        //update schedule for water or lighting
        var status = (values[0] ? "On" : "Off");
        db[areaName].water_status = status;
        db[device].water_start = from;
        db[device].water_end = to; 
        buttonText = `<strong>${device}</strong>`;

        var areaButtonElement = document.getElementById(device);
        areaButtonElement.innerHTML = buttonText;
        this.saveDB(db, "devices");
    }
    
    /**Return Device data
     * @returns `Object` (e.g.: {*lawn name*: {water_status:"", water_start:""...}})
     * Object = { } if no lawn area data has been created
     */
    static retrieveDevices() {
        return(this.getDB("devices"));
    }

    static cleardb = () => {
        localStorage.clear();
    }
}


class Util {
    constructor(){}

    /** Displays or hides a popup window
     * @param {String} overlayID id of overlay div in the rendered page
     * @param {String} popupID id of popup div
     * @param {Int} stateValue the state of the popup, 0=hidden, 1=display
     * @param {String} type (optional) type of page the button is for (e.g. "room", "lawn")
     * @returns `Int` state value of the popup (0=hidden, 1=display)
     */
    static handlePopupChange(overlayID, popupID, stateValue, roomName=null) {
        var overlay = document.getElementById(overlayID);
        var popupBox = document.getElementById(popupID);

        if (stateValue === 0) {
            //if state is currently off, turn on (show popup)
            overlay.style.display = "block";
            popupBox.style.display = "block";
            stateValue = 1;
            if (roomName){ //if room name was passed
                var val = document.getElementById("roomName");
                var newVal = roomName;
                val.style.fontSize = "1.3em";
                val.innerHTML = "Room: " + newVal;
            }
        } else if (stateValue === 1) {
            //if state is on, turn off (hide popup)
            overlay.style.display = "none";
            popupBox.style.display = "none";
            stateValue = 0;
        }
        return stateValue;
    }


   /** Changes a tag's inner HTML
    * @param {String} textID html ID of the p tag that is to be changed
    * @param {String} valueID html ID of the input tag that is to be read 
    * @param {String} type type of input value (e.g. "temp-color", "temp", "brightness")
    * @returns `String` value of input tag passed to this function
    */
    static changeText(textID, valueID, type="") {
        var val = document.getElementById(textID);
        if (val == null) {return;} //if text not found, nothing can happen

        var newValElement = document.getElementById(valueID);
        var newVal = "";
        if (newValElement != null) {newVal = newValElement.value;}
        //if no input was found, value will be empty
        var output = newVal;
        switch (type) { 
            //if temperature color, change color to represent slider value (high=red, low=blue)
            case "temp-color": val.style.color = `rgb(${output*2.55}, 0, ${255-output*2.55})`; 
                               output += "&deg;"; //add degree symbol             
                               break;
            case "temp-fridge": val.style.color = `rgb(${output*2.55}, 180, ${255-output*2.55})`; 
                                output += "&deg;"; //add degree symbol             
                                break;
            //temp value but no color change
            case "temp": output += "&deg;"; break; //add degree symbol     
            //if brightness, add percent symbol
            case "brightness": output += "%"; break;
            default: break;
        }
        val.innerHTML = output;
        //output = formatted value (e.g. if brightness: 53%)
        //newVal = raw value (e.g. 53)
        return newVal;
    }


    /**Helper to convert a checkbox input return value to "On" or "Off"
     * @param {String} statusID html id of the checkbox
     * @returns `String` "Off" or "On" according to the status of the checkbox
    */
    static getCheckboxStatus(statusID) {
        var lawnStatusObject = document.getElementById(statusID);
        var lawnStatus = "Off";
        if (lawnStatusObject != null) {
            return (lawnStatusObject.checked ? "On" : "Off");
        }
        return lawnStatus;
    }


    /** Change lighting value inner HTML and light bulb image opacity 
     * @param {String} textID ID of lighting <p> tag to be changed
     * @param {String} valueID ID of <input> field 
     * @param {String} bulbID ID light bulg <img> tag (optional)
     * @returns `String` value of input field
     */
    static changeLighting(textID, valueID, bulbID="") {
        var val = document.getElementById(textID);
        var newValElement = document.getElementById(valueID);
        var newVal = 0;
        if (newValElement != null) {newVal = newValElement.value;}

        var bulb = document.getElementById(bulbID);
        //adjust light bulb opacity according to slider (with slight bias)
        if (bulb != null) {bulb.style.opacity=`${parseInt(newVal)*0.9}%`;}
        val.innerHTML = `${newVal}%`;
        return newVal;
    }


    /** Helper function to get an input value (with verification) 
     * Function will send warning to console if input tag is not found
     * @param {String} fieldID 
     * @returns `String` value of input field (empty string if not found)
     */
    static getInputValue(fieldID) {
        var inputElement = document.getElementById(fieldID);
        
        if (inputElement == null) {
            console.warn("Error finding element with ID: " + fieldID);
            return "";
        }
        return inputElement.value;
    }

    /** Helper function to get inner HTML from p value (with verification) 
     * Function will send warning to console if p tag is not found
     * @param {String} pID 
     * @returns `String` value of the p tag (empty string if not found)
     */
    static getInnerHTML(pID) {
        var element = document.getElementById(pID);
        
        if (element == null) {
            console.warn("Error finding element with ID: " + pID);
            return "";
        }
        return element.innerHTML;
    }
}