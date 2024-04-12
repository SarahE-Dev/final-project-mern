import React from 'react'
import { AuthContextConsumer } from '../context/AuthContext'
import { Card, CardContent, CardGroup, CardMeta, Icon, Image, Button, Popup } from 'semantic-ui-react'
import Axios from './utils/Axios'

export default function Favorites() {
  const {state, dispatch} = AuthContextConsumer()
  function playMusic(uri){
    dispatch({type: 'ADD_SONG_TO_PLAYER', payload: uri})
    dispatch({type: 'AUTOPLAY'})
  }

  function playAllMusic(songs){
    const songsToPlay = songs.map(e=>e.uri)
    dispatch({type: 'ADD_PLAYLIST_TO_PLAYER', payload: songsToPlay})
    dispatch({type: 'AUTOPLAY'})
  }

  async function removeSongFromFavorites(id){
      try {
        const remove = await Axios.post(`/api/user/delete-favorite/${state.user.id}/${id}`)
        console.log(remove);
        dispatch({type: 'REMOVE_FAVORITE_SONG', payload: remove.data.song._id})
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <div style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', height: '90vh', color: 'white', marginLeft: '15vw', padding: '3vh 3vh', overflow: 'auto', paddingBottom: '25vh'}}>
      {!state.favorites.length > 0 && <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><div style={{marginTop: '5vh'}}><Icon  name='heartbeat' size='huge' color='pink' /></div><div style={{marginTop: '5vh'}}><h2 >You don't have any favorites yet.</h2></div></div>}
      {state && state.favorites && state.favorites.length > 0 && <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '3vh'}}><Button onClick={()=>playAllMusic(state.favorites)} color='violet' inverted style={{display: 'flex', alignItems: 'center', borderRadius: '25px'}} ><Icon size='large' name='play circle' /><span style={{fontSize: 20}}>PLAY ALL</span></Button></div>}
      <CardGroup doubling centered  style={{}} textAlign='center'  >
      {state && state.favorites && state.favorites.map(e=>
        <Popup
        inverted
        key={e.title}
        trigger={
        <Card  key={e.title} color='purple' style={{backgroundColor: 'black', color: 'white', width: '7rem'}} >
          <Image style={{}}  src={e.imageURL}  />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon 
          onClick={()=>playMusic(e.uri)}
          size='large' style={{cursor: 'pointer'}} circular name='play circle outline' />
          <Icon onClick={()=>removeSongFromFavorites(e.songId)}  color='grey' style={{cursor: 'pointer', marginTop: 5}} circular name='delete' />
          </div>
        </Card>}
        content={<><p>{e.title}</p><p>{e.artist}</p></>}
        />
        )}
       </CardGroup> 
    </div>
  )
}
