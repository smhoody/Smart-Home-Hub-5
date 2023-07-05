class Database extends React.Component {
    constructor(props) {
        super(props);
        // this.db = {rooms:{}};
        this.state = {popup:0};
        localStorage.setItem("rooms", {});
    }

    static saveRoom = () => {
        var action = "add";
        var dbObj = localStorage.getItem("rooms");
        var db = JSON.parse(dbObj);
        if (db === null) //if the database hasn't been created yet 
            db = {};

        var roomName = document.getElementById("roomNameInput").value;
        var roomTemp = document.getElementById("roomTempInput").value;
        
        // this will overwrite if the entry exists
        // db[roomName] = {temp:roomTemp};
        // var JSONObject = JSON.stringify(db);
        // localStorage.setItem("rooms", JSONObject);
        db[roomName] = {temp:roomTemp};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("rooms", JSONObject);

        // this will not allow the user to overwrite
        if (action === "add") { //if room already exists
            console.log("hi");
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = `${roomName} <br> Temp: ${db[roomName].temp}`;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            button.addEventListener("click", () => {
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
        
    }
    static updateRoom = () => {
        var dbObj = localStorage.getItem("rooms");
        var db = JSON.parse(dbObj);

        var roomName = document.getElementById("roomNameInput").value;
        var roomTemp = document.getElementById("roomTempInput").value;
        
        // this will overwrite if the entry exists
        // db[roomName] = {temp:roomTemp};
        // var JSONObject = JSON.stringify(db);
        // localStorage.setItem("rooms", JSONObject);
        db[roomName] = {temp:roomTemp};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("rooms", JSONObject);
    }

    static retrieveRoom = () => {
        var JSONObject = localStorage.getItem("rooms");
        var JSObject = JSON.parse(JSONObject);
        return(JSObject);
    }
    static cleardb = () => {
        localStorage.clear();
    }
}
