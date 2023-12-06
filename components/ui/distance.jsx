'use client'
import { useState, useEffect } from 'react'
import Link from "next/link";
import getDistance from 'geolib/es/getDistance';


const Map = (coordinates) => {

    const [location, setLocation] = useState({
        latitude: coordinates.coordinates[0],
        longitude: coordinates.coordinates[1],
    })

    const coord = {
        latitude: coordinates.coordinates[0],
        longitude: coordinates.coordinates[1],
    }
    useEffect(() => {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            console.log("Geolocation not supported");
          }
          
    }, [])

    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLocation({
            latitude: lat,
            longitude: long,
        })

    }
    
    function error() {
        console.log("Unable to retrieve your location");
    }

    return (
        
        <Link 
            className='my-0' 
            href={{
                pathname:'/map',
                query: coord
            }}>
            <p className='mt-2 text-small-regular text-light-3'>{getDistance(location,coord,100)/1000} km away</p>
        </Link>
        
    )
}

export default Map