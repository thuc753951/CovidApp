import {MapContainer, GeoJSON,} from "react-leaflet";
import Zipcodes from './data/Boundary.json';
import "leaflet/dist/leaflet.css";
import "./Mymap.css";

var img_list = ["images/location.png", "images/medical-record.png", "images/clock.png", "images/book.png", "images/medical-file.png"]
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
            title: this.props.title,
            onClick: this.props.onClick,
        };
    }

    render(){
        return(
            <div className = "featureTile">
                <div className ="featureTitle">{this.props.title}</div>
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
    renderTile(i, ftitle){
        return(
            <FeatureTile
            img = {img_list[i]}
            ID = {i}
            title = {ftitle}
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
                    {this.renderTile(0, "Map")}
                    {this.renderTile(1, "Hospitalization")}
                    {this.renderTile(2, "Timeline")}
                    {this.renderTile(3, "Cases by Age")}
                    {this.renderTile(4, "Cases by Race")}
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
   
    state = { }

    statestyle = {
        fillColor: "lightblue",
        fillOpacity: 0.5,
    }

    onEachState = (county, layer) =>{ 
        const countyNum = county.properties.OBJECTID; 
        layer.bindPopup(countyNum + " hello");  /*pop up layer that shows a message everytime you click in a location on the map */

        layer.on({
            click: (event)=>{
                event.target.setStyle( /*event handler for everytime we click it turns the spots yellow */
                    {
                        color: "yellow",
                        fillColor: "yellow",
                        fillOpacity: 0.5,
                    }
                )
            },
            mouseover: (event) =>{ /*event handler for everytime we mouse over something it turns the spots white */
                event.target.setStyle({
                    color: "white", 
                    fillColor: "lightblue",
                });
            }
        })
    }
    render() { 
        return (
        <div id="bounds">
            <h1 style={{textAlign: "center"}}>My Map</h1>
            <MapContainer className="map"
                center= {[40.018669892320197,-75.215331051386997 ]}  /*centers the camera to philadelphia */
                zoom={11.5} /*sets the zoom of the initial view  */
                scrollWheelZoom={true}>
                <GeoJSON style={this.statestyle} data={Zipcodes.features} onEachFeature={this.onEachState}></GeoJSON> 
            </MapContainer>
        </div> 
        
    )};
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
                <div className = "aboutContent">
                    <h1>About</h1>
                    <h2>Product Vision</h2>
                    <div>This app is made for any Philadelphia citizen, general to race, sex, and age. Over the past year COVID-19 has been very persistent in Philadelphia, this app is made for any citizen who is interested in the current state of COVID related statistics. The Covid Resource app is a lifestyle product. It is made to provide information in order to better or protect the day to day lives of its users. We want to create an application that gives the client updated information on the statistics of COVID in the Philadelphia are, this data will have specifics filtering choices such as age, sex, and race. Along with the filtering choices it will have some data categories such as death rate, confirmed cases (by zip or date), info on testing sites, and other information that can be derived from the open datasets provided by Philadelphia. Unlike other COVID related applications the COVID Resource App offers pure data and information specified for the area of Philadelphia. Other apps involve contact tracing, citizen health submissions, and self monitoring. The proposed Covid Resource Application is a source for COVID related statistics in the Philadelphia area. With a diverse population this app tries to personalize the information being presented to the client by offering different information categories and filtering choices so that the data viewed is as relevant as possible.</div>
                    <h2>Target Audience</h2>
                    <div>
                        <h3>Parent</h3>
                        Mr and Mrs. Hopkins - age 41 and 42, are parents in Old City, the birthplace of America’s independence and a popular tourist place.  Their two kids, ages 15 and 17, attend Central High School.  Mr Hopkins works remotely as a software engineer while Mrs. Hopkins is a manager of a cafe.  Central High School is known for being one of the best public high schools in Philadelphia for having a 99% reading and math proficiency rate of the students.  Although Mr. and Mrs. Hopkins value their kids, Adam and Bruce, to continue their education, they are also more concerned about their health as well as their own and their neighbors.  
                        <br></br>
                        With this COVID Resource App, they would be able to keep track of the COVID cases in Old City to determine whether it’s safe for their children to either go outside or go to in-person school as they compare it to other district cases and their policy for students attending in person.  The app provides statistics on age which would be pivotal to knowing how many younger people are infected which would provide info to their concerns of whether to continue their schooling in person or make it virtual.  The trend of younger cases of infection would provide incredibly useful info unlike any other application to all parents that are concerned about the safety of their children.

                        <h3>Student</h3>
                        John Doe, Sophomore at Temple university age 20. He is a new transfer student who just started his semester at Temple University when the Corona outbreak occurred. Now being unable to go back to his home across the country, he is forced to stay on campus. But John doesn't want his time at Temple to be only spent in his room, he wants to safely explore the city without having to worry about getting infected by going to a part of town with a highly infected population. With this he finds out about the “Covid 19 tracker app” (our program) where he is able to use it to the fullest extent.
                        <br></br>
	                    With it, John Doe is able to find out how different areas are more infected, the rate of which their infection count is growing, and what parts of Philadelphia is more safe to explore. The app itself provides crucial information such as: total number of infected, rate the infection is growing/shrinking based on a frame (ex a week or month), and what parts of Philly to avoid completely. this way he is able to explore the city with little chance of catching Covid himself.

                        <h3>Visitor</h3>
                        Janet Bader, visiting her sister in West Philadelphia. Janet is a 32 year old retail worker from Maryland wanting to visit her sister and get a change of scenery. She was raised in a traditional suburban household in Delaware County just outside of the city, and moved after being offered a co-op position. She has not seen her sister in person for some time since the pandemic and quarantine began. Janet has 3 roommates who all work in the restaurant business and two cats. She graduated with a Bachelor of Arts from Rutgers University, and has been pursuing a career as an oil painter.
                        <br></br>
                        Janet’s work requires her to get tested every week for COVID making her wary of travel and exposure. She believes that it is best to take extra safety measures before taking a trip to her sister. She downloads and uses the COVID-19 resource app so that she can make plans, go out with her sister, taking into account the rate of infections in specific areas so that she can minimize the risk of contraction.


                        <h3>Government Official</h3>
                        Connor Williams, the Governor for Pennsylvania. Let just assume since he is working as a government official, he cares for the people and their wealth-fare. He has a Doctorate in Law and Policy from Northeastern University. He works long Hours with Many people from his office to try to mitigate the death from Covid-19. He has mobile technology and uses his Android, pixel 5, phone often for his work. He is trying to find ways to spread live information about Covid fast to the people living in his state.
                        <br></br>
                        He is interested in our app because our app can give people quick information on areas of Pennsylvania that Covid - 19 has hit the hardest, coming down to the neighborhoods and streets. An Covid tracking app could easily help him give out information quickly about regions being 
                    </div>
                    <h2>Javascript Libraries Used</h2>
                    <div>
                        <h3>charts.js</h3>
                        
                        <h3>echarts.js</h3>
                        
                        <h3>jquery.js</h3>
                    </div>
                    <div>
                        <h2>Team Members</h2>
                        Thuc N. Luong
                        <br></br>
                        Joel Jang
                        <br></br>
                        Steven McFarland
                        <br></br>
                        Peter Ramirez
                        <br></br>
                    </div>
                    <div>
                        <h2>Github Repo Link</h2>
                        <a href="https://github.com/thuc753951/CovidApp/">Github : COVID App</a>
                    </div>
                </div>
                <Navbar />
            </div>
        );
    }
}
//ReactDOM.render(<AboutPage />, document.getElementById('root'))
ReactDOM.render(<CovidPage />, document.getElementById('root'));