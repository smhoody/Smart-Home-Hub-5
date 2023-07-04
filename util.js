class Database extends React.Component {
    constructor(props) {
        super(props);
        var db = {};
    }

    static saveRoom = () => {
        var roomName = document.getElementById("enterButton").value;
        //var roomTemp = document.getElementById("roomTemp").value;
        db[roomName] = {RoomTemp:70};
        var JSONObject = JSON.stringify(storage);
        localStorage.setItem("localDB", JSONObject);
        console.log(db);
    }

    static retrieve = (item) => {
        var JSONObject = localStorage.getItem("localDB");
        var JSObject = JSON.parse(JSONObject);
        //var id = document.getElementById("roomID").value
        var id = item.value;
        if(JSObject[id] != null){

        }
    }
}