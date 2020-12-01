var img_list = ["images/tombstone.png", "images/book.png", "images/sex.png", "images/medical-record.png"]
var img_const = ["images/arrow-left.svg", "images/arrow-right.svg", "images/PhillyMap.png.png"]
var current_feature = ".mapImage"

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
                    $(current_feature)[0].style.display = 'none';
                    $(".mapImage")[0].style.display = 'block';
                    current_feature = ".mapImage";
                }
                
                else if(i == 1){
                    $(current_feature)[0].style.display = 'none';
                    $("#chartjs-4")[0].style.display = 'block';
                    current_feature = "#chartjs-4";
                    pie_feature();
                }
                else if(i == 2){
                    $(current_feature)[0].style.display = 'none';
                    $("#echarts-timeline")[0].style.display = 'block';
                    current_feature = "#echarts-timeline";
                    time_feature();
                }

                else if(i == 3){
                    $(current_feature)[0].style.display = 'none';
                    $("#echarts-agegraph")[0].style.display = 'block';
                    current_feature = "#echarts-agegraph";
                    age_feature();
                }
                /**
                 * line 1:sets the display of the currently displayed element to none (current elment ID or Class kept in current_feature)
                 * line 2:sets the display of target feature to block (manual insertion of the id or class name)
                 * line 3:sets the current feature to the target feature
                 * line 4: build the target custom graph
                 */
                else{
                    $(current_feature)[0].style.display = 'none';
                    $("#echarts-racegraph")[0].style.display = 'block';
                    current_feature = "#echarts-racegraph";
                    race_feature();
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
                <PhillyMap />
                <PieChart />
                <Timeline />
                <AgeChart />
                <RaceChart />
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
        display: 'none',
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
        display: 'none',
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
        display: 'none',
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
        display: 'none',
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
            <div id="renderPage">
                <Header />
                <div className = "content">
                    <h1>About</h1>
                    <h2>Product Vision</h2>
                    <div>This app is made for any Philadelphia citizen, general to race, sex, and age. Over the past year COVID-19 has been very persistent in Philadelphia, this app is made for any citizen who is interested in the current state of COVID related statistics. The Covid Resource app is a lifestyle product. It is made to provide information in order to better or protect the day to day lives of its users. We want to create an application that gives the client updated information on the statistics of COVID in the Philadelphia are, this data will have specifics filtering choices such as age, sex, and race. Along with the filtering choices it will have some data categories such as death rate, confirmed cases (by zip or date), info on testing sites, and other information that can be derived from the open datasets provided by Philadelphia. Unlike other COVID related applications the COVID Resource App offers pure data and information specified for the area of Philadelphia. Other apps involve contact tracing, citizen health submissions, and self monitoring. The proposed Covid Resource Application is a source for COVID related statistics in the Philadelphia area. With a diverse population this app tries to personalize the information being presented to the client by offering different information categories and filtering choices so that the data viewed is as relevant as possible.</div>
                    <h2>Target Audience</h2>
                    <div></div>
                    <h2>Javascript Libraries Used</h2>
                    <div></div>
                    <h2>Team Members</h2>
                    <div></div>
                    <h2>Github Repo Link</h2>
                    <div></div>
                </div>
                <Navbar />
            </div>
        );
    }
}
//ReactDOM.render(<AboutPage />, document.getElementById('root'))
ReactDOM.render(<CovidPage />, document.getElementById('root'));