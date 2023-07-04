class Database extends React.Component {
    constructor(props) {
        super(props);
        // this.db = {rooms:{}};
        this.state = {popup:0};
        localStorage.setItem("rooms", {});
    }
    componentWillUnmount(){
        localStorage.clear();
    }
    PopupChange = () => {
        this.props.handlePopupChange();
    }
    static popupChange = () => {
        console.log("hi");
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
    }

    static saveRoom = () => {
        var dbObj = localStorage.getItem("rooms");
        var db = JSON.parse(dbObj);
        if (db === null) //if the database hasn't been created yet 
            db = {};

        var roomName = document.getElementById("roomNameInput").value;
        var roomTemp = document.getElementById("roomTempInput").value;
        
        // this will overwrite if the entry exists
        db[roomName] = {temp:roomTemp};
        var JSONObject = JSON.stringify(db);
        localStorage.setItem("rooms", JSONObject);

        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = roomName;
        button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
        //button.onclick = this.PopupChange();
        var container = document.getElementById("roomButtons");
        container.appendChild(button);
        
        // this will not allow the user to overwrite
        // if (db[roomName] != null) { //if room already exists
        //     alert("Bedroom name already exists");
        // } else {
        //     db[roomName] = {temp:roomTemp};
        //     var JSONObject = JSON.stringify(db);
        //     localStorage.setItem("rooms", JSONObject);
        // }
        
    }

    static retrieveRoom = () => {
        var JSONObject = localStorage.getItem("rooms");
        var JSObject = JSON.parse(JSONObject);
        return(JSObject);
        /*
        var rooms;

       for(rooms in JSObject) {
            var button = document.createElement("button");
            button.type = "button";
            button.innerHTML = rooms;
            button.className = "default-btn btn btn-primary btn-lg m-3 room-btn-custom";
            button.onClick = () => {this.popupChange();};
            var container = document.getElementById("roomButtons");
            container.appendChild(button);
       }*/
    }
    static cleardb = () => {
        localStorage.clear();
    }
}
