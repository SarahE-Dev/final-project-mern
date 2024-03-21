import React, {useEffect, useState} from 'react'
import { AuthContextConsumer } from '../context/AuthContext'
import axios from 'axios'
import { Accordion, Image, Loader } from 'semantic-ui-react'
import { TrackContext } from '../context/TrackContext'
import Track from './Track'

export default function Album() {
    const [albumTracks, setAlbumTracks] = useState([])
    const [albumImage, setAlbumImage] = useState('');
    const [albumDate, setAlbumDate] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [albumArtist, setAlbumArtist] = useState('');
    const [artistUri, setArtistUri] = useState('');
    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const {state, dispatch} = AuthContextConsumer();
    
    
    const getAlbumData = async()=>{
        try {
            const searchParameters = {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${state.searchToken}`
                }
              }
            const path = window.location.pathname.split('/')
            const id = path[path.length-1]
            const album = await axios.get(`https://api.spotify.com/v1/albums/${id}`, searchParameters)
            console.log(album);
            const actualAlbum = album.data;
            setAlbumArtist(actualAlbum.artists[0].name);
            setArtistUri(actualAlbum.artists[0].uri);
            setAlbumImage(actualAlbum.images[1].url);
            setAlbumName(actualAlbum.name);
            setAlbumTracks(actualAlbum.tracks.items);
            const albumDate = new Date(album.data.release_date)
            const actualDate = albumDate.toDateString()
            setAlbumDate(actualDate);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        let searchToken = localStorage.getItem('search_token');
        let access_token = localStorage.getItem('access_token');
        if(searchToken){
            dispatch({type: 'SET_SEARCH_TOKEN', payload: searchToken})
        }
        if(access_token){
            dispatch({
                type: 'SET_ACCESS_TOKEN', payload: access_token
            })
        }
        getAlbumData()
    }, [])
    if(loading){
        return <Loader active inline='centered' inverted
/>    }

    const playSong = (song) => {
        dispatch({type: 'ADD_SONG_TO_PLAYER', payload: song});
        dispatch({type: 'AUTOPLAY'})
    }
    
    
    
    

  return (
    <div style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', width: '85vw', marginLeft: '15vw', height: '90vh', overflow: 'auto',  color: 'white', paddingTop: '3vh', paddingLeft: '2vw'}}>
            <div style={{backgroundColor: 'black', width: '80vw', borderRadius: '25px', display: 'flex', flexDirection: 'column', paddingLeft: '3vw', justifyContent: 'center', alignItems: 'center',overflow: 'auto', marginBottom: '17vh', padding: '5vw'}}>
            <Image height={200} style={{outline: '1px solid white', borderRadius: '10px'}} src={albumImage} />
            <h2>{albumName}</h2>
            <h4>{albumArtist}</h4>
            <p>{albumDate}</p>
            <Accordion   inverted>
                {albumTracks.map((track, i)=>{
                    return (
                        <TrackContext.Provider value={{track, playSong, albumImage}} key={`${track.id}`}><Track key={`${track.id}track`}/></TrackContext.Provider>
                    )
                })}
            </Accordion>
            </div>
    </div>
  )
}
