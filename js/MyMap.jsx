import React, { Component } from 'react';
import {MapContainer, GeoJSON,} from "react-leaflet";
import Zipcodes from './../data/Boundary.json';
import "leaflet/dist/leaflet.css";
import "./Mymap.css";


class MyMap extends Component {
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
 
export default MyMap;