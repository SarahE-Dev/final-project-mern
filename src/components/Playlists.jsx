import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionTitle, Icon, Button, Label, Input, FormGroup, ButtonGroup } from 'semantic-ui-react'
import { AuthContextConsumer } from '../context/AuthContext'
import axios from 'axios'
import Axios from './utils/Axios'
import checkTokens from './hooks/tokenCheck'

export default function Playlists() {
  const {state, dispatch} = AuthContextConsumer()
  const [activeIndex, setActiveIndex] = useState(0)
  const [playlistInput, setPlaylistInput] = useState('');
  const [inputtingPlaylist, setInputtingPlaylist] = useState(false)
  const handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex)
  }
  function playMusic(uri){
    dispatch({type: 'ADD_SONG_TO_PLAYER', payload: uri})
    dispatch({type: 'AUTOPLAY'})
  }

  function playPlaylist(playlist){
    const songs = playlist.map(e=>e.uri)
    dispatch({type: 'ADD_PLAYLIST_TO_PLAYER', payload: songs})
    dispatch({type: 'AUTOPLAY'})
  }

  async function removePlaylistSong(playlistId, id){
    try {
      const remove = await Axios.post(`/api/user/remove-playlist-song/${playlistId}/${id}`)
      console.log(remove);
      dispatch({type: 'REMOVE_SONG_FROM_PLAYLIST', payload: {playlistId, id}})
    } catch (error) {
      console.log(error);
    }
  }

  async function addPlaylist(){
    try {
      const newPlaylist = await Axios.post(`/api/user/add-playlist/${state.user.id}`, {
          playlistName: playlistInput
      })
      console.log(newPlaylist);
      dispatch({type: 'ADD_PLAYLIST', payload: newPlaylist.data.playlist})
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmitNewPlaylist = (e) => {
    e.preventDefault();
    addPlaylist()
    setPlaylistInput('');
    setInputtingPlaylist(false)
  }

  async function removePlaylist(id){
    try {
      const updatedUser = await Axios.post(`/api/user/remove-playlist/${state.user.id}/${id}`)
      console.log(updatedUser);
      dispatch({type: 'REMOVE_PLAYLIST', payload: id})
    } catch (error) {
      console.log(error);
    }
  }

  
  
  return (
    <div style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', width: '85vw', height: '90vh', marginLeft: '15vw', paddingTop: '2vh', paddingBottom: '20vh', overflow: 'auto'}}>
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Button inverted onClick={()=>setInputtingPlaylist(true)}>Create Playlist</Button>
        {inputtingPlaylist && <><Input value={playlistInput} onChange={(e)=>setPlaylistInput(e.target.value)} style={{margin: 10, marginBottom: 5}} />
        <ButtonGroup style={{margin: 10}}>
          <Button onClick={()=>setInputtingPlaylist(false)}  color='grey' inverted>
            <Icon style={{marginLeft: 3}} name='remove circle' />
          </Button>
          <Button onClick={handleSubmitNewPlaylist} color='blue' inverted>
          <Icon style={{marginLeft: 3}} name='save'  />
          </Button>
          
        </ButtonGroup></>}
        </div>
        
        <Accordion inverted style={{backgroundColor: 'black', width: '70vw', margin: 'auto', marginTop: '2vh'}} styled>
        {state && state.playlists && (
          state.playlists.map((e, i)=>{
            return (
              <>
              <AccordionTitle key={e.name} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} active={activeIndex === i} index={i} onClick={handleClick}>
                <div>
                <Icon name='dropdown' />
                {e.name}
                </div><div><Icon onClick={()=>playPlaylist(e.songs)} color='blue' size='large' name='play circle outline' /><Icon size='large' name='remove circle' onClick={()=>removePlaylist(e._id)} /></div></AccordionTitle>
                <AccordionContent active={activeIndex === i}>
                  {e.songs.map(s=><div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <div style={{display: 'flex'}}>
                    <div>
                  <Icon
                  onClick={()=>playMusic(s.uri)}
                  style={{cursor: 'pointer'}}
                  color='pink'
                  size='large'
                  name='play circle outline' />
                  </div>
                  <Label color='purple'>{s.title}</Label>
                  </div>
                  </div>
                  <div className='delete'>
                    <Icon
                    onClick={()=>removePlaylistSong(e._id, s._id)}
                    color='grey'
                    size='large'
                    circular
                    style={{cursor: 'pointer'}}
                    name='delete' />
                  </div>
                  </div>)}
                </AccordionContent>
                </>
            )
          })
        )
          
        }
        </Accordion>
    </div>
  )
}
