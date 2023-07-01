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
            return(<div class="text-center">
                <p>Program Page</p>
                <button class="btn btn-primary btn-lg m-1"
                onClick={() => {this.setState({page:'Home'})}}>Exit</button>
            </div>);
        }
        else if(this.state.page === 'History'){
            return(<div class="text-center">
                <p>History Page</p>
            </div>);
        }
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);