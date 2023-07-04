class Database extends React.Component {
    constructor(props) {
        super(props);
        // this.db = {rooms:{}};
        localStorage.setItem("rooms", {});
    }
    componentDidMount(){
        localStorage.clear();
    }
    componentWillUnmount(){
        localStorage.clear();
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
        /*
        var id = item.value;
        if(JSObject[id] != null){
        }
        */
       return(JSObject);
    }
    static cleardb = () => {
        localStorage.clear();
    }
}