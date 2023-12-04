'use client'
import { MapContainer, CircleMarker, Tooltip, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = (locations) => {
    const style = {
        
        height:'calc(100% + 80px)',
        width:'calc(100% + 80px)',
        margin:'-40px'
    }  
    console.log("map " + locations)
    return (
        <MapContainer style={style} center={[53.545474, 9.989857]} zoom={13}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.locations?.map((location)=>(
            <CircleMarker key={location.id} center={[location.lat,location.long]} pathOptions={{color: 'green'}} radius={10}>
                <Tooltip>{location.text}</Tooltip>
            </CircleMarker >
        ))}
        </MapContainer>
    )
}

export default Map