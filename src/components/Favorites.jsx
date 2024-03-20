import React from 'react'
import { AuthContextConsumer } from '../context/AuthContext'
import { Card, CardContent, CardDescription, CardGroup, CardHeader, CardMeta, Icon, Image, Label } from 'semantic-ui-react'
import axios from 'axios'

export default function Favorites() {
  const {state, dispatch} = AuthContextConsumer()
  function playMusic(uri){
    dispatch({type: 'ADD_SONG_TO_PLAYER', payload: uri})
    dispatch({type: 'AUTOPLAY'})
  }

  async function removeSongFromFavorites(id){
      try {
        const remove = await axios.post(`http://localhost:3002/api/user/delete-favorite/${state.user.id}/${id}`)
        console.log(remove);
        dispatch({type: 'REMOVE_FAVORITE_SONG', payload: id})
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <div style={{backgroundColor: 'black', height: '90vh', color: 'white', marginLeft: '15vw', padding: '3vh 3vh', overflow: 'scroll', paddingBottom: '20vh'}}>
      {!state.favorites.length > 0 && <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><div style={{marginTop: '5vh'}}><Icon  name='heartbeat' size='huge' color='pink' /></div><div style={{marginTop: '5vh'}}><h2 >You don't have any favorites yet.</h2></div></div>}
      <CardGroup doubling itemsPerRow={6} style={{}} textAlign='center'  >
      {state && state.favorites && state.favorites.map(e=>
        <Card  color='purple' style={{backgroundColor: 'black', color: 'white'}} >
          <Image style={{margin: '20px'}}  src={e.imageURL}  />
          <CardContent>
            <CardMeta style={{color: 'white'}}>
              {e.title}
            </CardMeta>
            <CardMeta style={{color: 'purple'}}>
              {e.artist}
            </CardMeta>
            
          </CardContent>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon 
          onClick={()=>playMusic(e.uri)}
          size='large' style={{cursor: 'pointer'}} circular name='play circle outline' />
          <Icon onClick={()=>removeSongFromFavorites(e._id)}  color='grey' style={{cursor: 'pointer', marginTop: 5}} circular name='delete' />
          </div>
        </Card>
        )}
       </CardGroup> 
    </div>
  )
}
