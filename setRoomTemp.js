class SetRoomTemp extends React.Component {
    constructor(props){
        super(props);
        this.state = {popup:0};
        <Database/>
    }
    handlePopupChange = () => {
        var overlay = document.getElementById("overlay");
        var popupBox = document.getElementById("cityPopupBox");
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
    saveRoom = () => {
        //var id = document.getElementById("enterButton").ariaValueMax;
        Database.saveRoom();
    }
    render(){
        return(
            <div className="text-center">
                <div id="overlay"></div>
                <div className="row row-custom">
                    <div className="col-sm">
                        <button className="default-btn btn btn-primary btn-lg m-1"
                        onClick={this.handlePopupChange}>Set Room</button>
                    </div>

                    <div className="col-sm">
                        <div id="cityPopupBox">
                            <h2 className="default-text">Set Room</h2>
                            <input id="cityInput" text="Enter Room"></input>
                            <div className="row row-custom">
                                <div className="col-sm">
                                    <button className="default-btn" id="closeButton" 
                                    onClick={this.handlePopupChange}>Close</button>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <button className="default-btn" id="enterButton" 
                                    onClick={(this.handlePopupChange, this.saveRoom)}>Enter</button>
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