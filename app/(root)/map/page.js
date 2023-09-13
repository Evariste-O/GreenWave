'use client'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker , Tooltip} from 'react-leaflet'



function Page() {

  const environmentalGroupActivities = [
    "Community Clean-Up Day",
    "Tree Planting Event",
    "Community Garden",
    "Bike Ride",
    "Beach Cleanup",
    "Outdoor Yoga or Fitness Classes",
    "Recycling Workshop",
    "Educational Nature Hike",
    "Environmental Film Screening",
    "Clothing Swap",
    "Community Composting",
    "Eco-Friendly Picnic",
    "River or Lake Cleanup",
    "Eco-Art Workshop",
    "Solar Energy Workshop",
    "Wildlife Habitat Restoration",
    "Environmental Speaker Series",
    "Group Gardening",
    "Electric Vehicle Showcase",
    "Zero-Waste Challenge"
  ];

  function getRandomActivity() {
    const randomIndex = Math.floor(Math.random() * environmentalGroupActivities.length);
    return environmentalGroupActivities[randomIndex];
  }

  function generateRandomLocationObjects(numObjects) {
    const objects = [];
  
    for (let i = 0; i < numObjects; i++) {
      const id = i + 1;
      const latitude = getRandomFloat(53.4612, 53.651557);
      const longitude = getRandomFloat(9.876065, 10.209309);
      const tooltip = getRandomActivity();
  
      objects.push({ id, latitude, longitude, tooltip });
    }
  
    return objects;
  }
  
  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  const style = {
    height:'100%',
    width:'100%',
  }

  const locations = generateRandomLocationObjects(30)


    return (
      <MapContainer style={style} center={[53.545474, 9.989857]} zoom={14} scrollWheelZoom={true}>        
        <TileLayer
        attribution= '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         {locations?.map((location)=>(
                <CircleMarker  key={location.id} center={[location.latitude,location.longitude]} pathOptions={{color: 'green'}} radius={10}>
                    <Tooltip>{location.tooltip}</Tooltip>
                </CircleMarker >
        ))}
    </MapContainer>
    )
}

export default Page;