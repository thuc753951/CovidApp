var img_list = ["/images/tombstone.png", "/images/book.png", "/images/sex.png", "/images/medical-record.png"]
var img_const = ["/images/arrow-left.svg", "/images/arrow-right.svg", "/images/PhillyMap.png.png"]

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aboutClick : () => {ReactDOM.render(<AboutPage />, document.getElementById('root'))},
            homeClick : () => {ReactDOM.render(<CovidPage />, document.getElementById('root'))},
        };
    }
    render(){
        //NEED TO MAKE ONCLICK FUNCTION TO CHANGE THE PAGE CONTENT
        return(
            <div className="navbar">
                <a onClick = {this.state.homeClick}>Home</a>
                <a onClick = {this.state.aboutClick}>About</a>
            </div>
        );
    }
}

class FeatureTile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            img: this.props.img,
            ID: this.props.ID,
            onClick: this.props.onClick,
        };
    }

    render(){
        return(
            <div className = "featureTile">
                <div className ="featureTitle">Feature {this.props.ID}</div>
                <img src={this.state.img} onClick = {() => this.state.onClick()}></img>
            </div>
        );
    }
}

function Arrows(props){
    return(
        <div className="arrows">
            <img id = "leftScroll" style={{float:'left'}} src={img_const[0]} onClick ={props.onClick_left}/>
            <img id = "rightScroll" style={{float:'right'}} src={img_const[1]}onClick = {props.onClick_right}/>
        </div>
    );
}

class FeatureContainer extends React.Component {
    renderTile(i){
        return(
            <FeatureTile
            img = {img_list[i]}
            ID = {i}
            onClick = {() => {
                if(i == 0){
                    ReactDOM.render(<PhillyMap />, document.getElementsByClassName('contentContainer')[0]);
                }

                else{
                    ReactDOM.render(<Filler />, document.getElementsByClassName('contentContainer')[0]);
                }
            }}
            />
        );
    }
    render(){
        return(
            <div className="featureContainer">
                <Arrows 
                onClick_left = {() =>{
                    $(document.querySelector("div.featureGrid")).animate({
                        scrollLeft: "-=200px"
                    }, "slow");
                }
            }

                onClick_right = {() =>{
                    $(document.querySelector("div.featureGrid")).animate({
                        scrollLeft: "+=200px"
                    }, "slow");
                }
            }/>
                <div className = "featureGrid">
                    {this.renderTile(0)}
                    {this.renderTile(1)}
                    {this.renderTile(2)}
                    {this.renderTile(3)}
                    {this.renderTile(3)}
                    {this.renderTile(3)}
                    {this.renderTile(3)}
                </div>
            </div>
        );
    }
}

class Header extends React.Component{
    render(){
        return(
            <div className="header">COVID RESOURCE APP</div>
        );
    }
}

class PhillyMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            img : img_const[2],
        };
    }
    render(){
        return(
            <img className="mapImage" src = {this.state.img} />
        );
    }
}

class Content extends React.Component{
    render(){
        return(
            <div className="contentContainer">
                <img className="mapImage" src = "/images/PhillyMap.png.png" />
            </div>
        );
    }
}

class Filler extends React.Component{
    render(){
        return(
            <h1>THIS IS A FEATURE FILLER</h1>
        );
    }
}

class CovidPage extends React.Component{
    render(){
        return(
            <div id="renderPage">
                <Header />
                <div className = "content">
                    <Content />
                    <FeatureContainer />
                </div>
                <Navbar />
            </div>
        );
    }
}

class AboutPage extends React.Component{
    render(){
        return(
            <div>
                <h1>Temporary About</h1>
                <Navbar />
            </div>
        );
    }
}
//ReactDOM.render(<AboutPage />, document.getElementById('root'))
ReactDOM.render(<CovidPage />, document.getElementById('root'));