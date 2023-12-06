'use client'
import { MapContainer, CircleMarker, Tooltip, TileLayer, useMap } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { useLocation } from '../components/shared/LocationProvider'
import 'leaflet/dist/leaflet.css'

const Map = ({ locations }) => {
    const loc = useLocation()
    const [location, setLocation] = useState(loc)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            const hasCoordinates = extractCoordinates(window.location.search)
            if (!hasCoordinates) {
                console.log(loc)
                if (loc) {
                    setLocation(loc)
                    setLoading(false)
            }
        }
    }, [loc])

    function extractCoordinates(str) {
        const regex = /\?latitude=(-?\d+\.\d+)&longitude=(-?\d+\.\d+)/;
        const match = str.match(regex);
      
        if (match) {
            const latitude = parseFloat(match[1]);
            const longitude = parseFloat(match[2]);
            setLocation({ latitude, longitude })
            setLoading(false)
            return true
        }
        return false
    }


    const style = {  
        height: 'calc(100% + 80px)',
        width: 'calc(100% + 80px)',
        margin: '-40px'
    }


    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <>
            {!loading && loc && (
                <MapContainer style={style} center={[location.latitude, location.longitude]} zoom={13}>
                    <ChangeView center={[location.latitude, location.longitude]}/> 
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations && locations.map((location)=>(
                        <CircleMarker key={location.id} center={[location.lat, location.long]} pathOptions={{color: 'green'}} radius={10}>
                            <Tooltip>{location.text}</Tooltip>
                        </CircleMarker>
                    ))}
                </MapContainer>
            )}
        </>
    )
}

export default Map;