var img_list = ["/images/tombstone.png", "/images/book.png", "/images/sex.png", "/images/medical-record.png"]
var img_const = ["/images/arrow-left.svg", "/images/arrow-right.svg", "/images/PhillyMap.png.png"]
/**
 * Navigation Bar Rendering
 * aboutClick: renders the About Page
 * homeClick: renders the Home Page
 * returns two link buttons with a div wrapper
 */
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

/**
 * img: img URL defined in array above
 * ID: numerical ID of the feature, determines what content is rendered
 * onClick: defines the feature loading function that executes on clicking specific feature tile
 * returns title of the feature and the tile image of the feature
 */
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

/**
 * props.onClick_left: onclick function that scrolls through the feature grid left
 * props.onClick_right: onclick function that scrolls through the feature grid to the right
 * returns two images in a div wrapper
 */
function Arrows(props){
    return(
        <div className="arrows">
            <img id = "leftScroll" style={{float:'left'}} src={img_const[0]} onClick ={props.onClick_left}/>
            <img id = "rightScroll" style={{float:'right'}} src={img_const[1]}onClick = {props.onClick_right}/>
        </div>
    );
}

/**
 * renderTile(i): returns a Feature tile specifying image ID and onclick with param i
 * - value of i determines rendering function attached to each feature tile onclick
 * returns Arrow component with defined onClick functions using JQuery, filled featureGrid using renderTile(i), contained in div wrapper
 */
class FeatureContainer extends React.Component {
    renderTile(i){
        return(
            <FeatureTile
            img = {img_list[i%3]}
            ID = {i}
            onClick = {() => {
                if(i == 0){
                    ReactDOM.render(<PhillyMap />, document.getElementsByClassName('contentContainer')[0]);
                }
                
                else if(i == 1){
                    ReactDOM.render(<PieChart />, document.getElementsByClassName('contentContainer')[0]);
                    chartBuilder();
                }
                else if(i == 2){
                    ReactDOM.render(<Timeline />, document.getElementsByClassName('contentContainer')[0]);
                    timelineBuilder();
                }

                else if(i == 3){
                    ReactDOM.render(<AgeChart />, document.getElementsByClassName('contentContainer')[0]);
                    agechartBuilder();
                }
                else{
                    ReactDOM.render(<RaceChart />, document.getElementsByClassName('contentContainer')[0]);
                    racechartBuilder();
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
                    {this.renderTile(4)}
                    {this.renderTile(5)}
                    {this.renderTile(6)}
                </div>
            </div>
        );
    }
}

/**
 * returns div with the site name
 * CAN BE BETTER STYLED
 */
class Header extends React.Component{
    render(){
        return(
            <div className="header">COVID RESOURCE APP</div>
        );
    }
}

/*COMPONENTS FOR CUSTOM GRAPHS*/
/**
 * INTERACTIVE MAP GOES HERE
 * 
 * img: image URL, referenced in array above
 * returns image
 */
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
/**
 * returns div for holding content, default is image of philly
 */
class Content extends React.Component{
    render(){
        return(
            <div className="contentContainer">
                <img className="mapImage" src = "/images/PhillyMap.png.png" />
            </div>
        );
    }
}
/**
 * chart_style: holds the styling for the canvas element
 * returns canvas to be targeted and filled by the chart_build.js and piechart_feature.js files
 */
class PieChart extends React.Component{
    chart_style = {
        display: 'block',
        width: '250px',
        height: '125px',
    };

    render(){
        return(
            <canvas id="chartjs-4" className="chartjs" style={this.chart_style}></canvas>
        );
    }
}
/**
 * timeline_style: holds the styling for the div element
 * returns div to be targeted and filled by the timeline_build.js and timeline_feature.js files
 */
class Timeline extends React.Component{
    timeline_style = {
        width: '100%',
        height: '400px',
    };

    render(){
        return(
            <div id="echarts-timeline" style={this.timeline_style}></div>
        );
    }
}
/**
 * timeline_style: holds the styling for the div element
 * returns div to be targeted and filled by the agechart_build.js and agechart_feature.js files
 */
class AgeChart extends React.Component{
    agechart_style ={
        width:"100%",
        height:"400px",
    };

    render(){
        return(
            <div id="echarts-agegraph" style={this.agechart_style}></div>
        );
    }
}
/**
 * timeline_style: holds the styling for the div element
 * returns div to be targeted and filled by the racechart_build.js and racechart_feature.js files
 */
class RaceChart extends React.Component{
    racechart_style = {
        width: "100%",
        height: "400px",
    };
    
    render(){
        return(
            <div id="echarts-racegraph" style={this.racechart_style}></div>
        );
    }
}

/*WEB PAGE COMPONENTS - home page, about page, etc.*/
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