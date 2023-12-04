import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css';
import { fetchPosts } from "@/lib/actions/thread.actions";

const Map = dynamic(
  () => import('@/components/map'), 
  { ssr: false } 
)

export default async function Page()  { 

  const result = await fetchPosts(1, 30);
  //const coordinates = result.posts[0].location;
  const coordinates = [];
  for (let i = 0; i < result.posts.length; i++) {
    const temp = {
      lat:  result.posts[i].location[0],
      long: result.posts[i].location[1],
      id:   i,
      text: result.posts[i].text
    }
    coordinates.push(temp);
  }
  console.log("page" + coordinates)

  return (
    <Map locations={coordinates}/>
  )
}
