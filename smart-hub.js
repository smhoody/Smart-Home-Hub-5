class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {page:'Home'};
    }
    render(){
        if(this.state.page === 'Home'){
            return(
            <HomeMenu/>
            );
        }
        else if(this.state.page === 'Program'){
            return(<div className="text-center">
                <p>Program Page</p>
                <button className="btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'History'){
            return(<div className="text-center">
                <p>History Page</p>
            </div>);
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);