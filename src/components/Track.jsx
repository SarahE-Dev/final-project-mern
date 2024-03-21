import React, {useContext, useState, useEffect} from 'react'
import { TrackContext } from '../context/TrackContext'
import { AccordionTitle, Icon, Label, AccordionContent, Button, Modal, Header, ModalContent, ModalActions, ModalHeader, ModalDescription, Popup, Form, FormInput, FormButton, FormField, FormGroup } from 'semantic-ui-react'
import { AuthContextConsumer } from '../context/AuthContext'
import axios from 'axios'

export default function Track() {
    const {track, playSong, albumImage} = useContext(TrackContext)
    const {state, dispatch} = AuthContextConsumer()
    const [show, setShow] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false)
    const [playlistSelection, setPlaylistSelection] = useState('Choose Playlist')
    const [playlistInput, setPlaylistInput] = useState('');
    const [inputtingPlaylist, setInputtingPlaylist] = useState(false)
    const [playlistIDtoAdd, setPlaylistIDtoAdd] = useState('')
    async function addToFavorites(){
      try {
          const newFavorite = await axios.post(`http://localhost:3002/api/user/add-favorite/${state.user.id}`, {
              songId: track.id,
              title: track.name,
              uri: track.uri,
              artist: track.artists[0].name,
              imageURL: albumImage
          })
          dispatch({type: 'ADD_FAVORITE_SONG', payload: newFavorite.data.song})
          console.log(newFavorite);
          
      } catch (error) {
        console.log(error);
      }
    }
    
    async function removeFavoriteSong(){
      try {
          let removeFavorite = await axios.delete(`http://localhost:3002/api/user/delete-favorite/${state.user.id}/${track.id}`);
          console.log(removeFavorite);
          dispatch({type: 'REMOVE_FAVORITE_SONG', payload: track.id})
      } catch (error) {
          console.log(error);
      }
    }
    useEffect(() => {
      if(state && state.favorites){
        let favoriteInclude = state.favorites.some(obj=>obj.songId === track.id)
        setIsFavorite(favoriteInclude)
      }
      
    }, [state])
    async function addPlaylist(){
      try {
        const newPlaylist = await axios.post(`http://localhost:3002/api/user/add-playlist/${state.user.id}`, {
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
    const handleAddSongToPlaylist = async () => {
      if(playlistIDtoAdd){
      try {
        const addSong = await axios.post(`http://localhost:3002/api/user/add-song-playlist/${playlistIDtoAdd}/${track.id}`, {
          songId: track.id,
              title: track.name,
              uri: track.uri,
              artist: track.artists[0].name,
              imageURL: albumImage 
        })
        console.log(addSong);
        dispatch({type: 'ADD_SONG_TO_PLAYLIST', payload: {playlistId: playlistIDtoAdd, song: addSong.data.song}})
        setPlaylistSelection('Choose Playlist')
        setPlaylistIDtoAdd('')
        setShow(false)
        
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        setPlaylistSelection('Choose Playlist')
        setPlaylistIDtoAdd('')
        
      }
    }
    }
  return (
    <>
    <AccordionTitle  style={{display: 'flex', alignItems: 'center'}}><div style={{width: '30vw', display: 'flex', alignItems: 'center'}}><Icon size='large' color='blue' inverted  name='play circle outline' onClick={()=>playSong(track.uri)} /><Label  content={track.name} color='violet' /></div>
    {isFavorite ? <Icon color='pink' onClick={removeFavoriteSong} style={{marginTop: 3, }} size='large' name='heart' /> : <Icon onClick={addToFavorites} style={{marginTop: 2}} size='large' color='pink' name='heart outline' />}
    <Popup position='bottom left' size='mini' content='Add to Playlist' trigger={<Icon  name='plus' onClick={()=>setShow(true)} />} />
    
    </AccordionTitle>
    <Modal
    style={{paddingTop: '10vh', height: '100vh', margin: 0, width: '100vw'}}
    closeIcon
     className='text-center' size='large' basic onClose={()=>setShow(false)} onOpen={()=>setShow(true)} open={show}>
      
      <Header>
        <div>
        <Icon name='play circle outline' />
        Select Playlist
        </div>
        <ModalDescription
        
        style={{fontSize: '1rem', marginTop: 5}}>{track.name}</ModalDescription>
        
      </Header>
      <ModalContent scrolling>
        
        <div>
        <Button onClick={()=>setInputtingPlaylist(true)}
        size='small'
        color='purple'>Create New Playlist</Button>
        </div>
        {inputtingPlaylist ? <Form>
          <FormField style={{paddingTop: '20px'}}><FormInput value={playlistInput} onChange={(e)=>setPlaylistInput(e.target.value)} style={{width: '30vw'}} /></FormField>
          <FormGroup style={{display: 'flex', justifyContent: 'center'}}>
          <FormButton
          onClick={()=>setInputtingPlaylist(false)}
          inverted 
          color='red'
          size='tiny'><Icon
          style={{marginLeft: 4}}
          name='delete' /></FormButton>
          <FormButton
          size='tiny'
          onClick={handleSubmitNewPlaylist}
          inverted color='green'><Icon name='save'/>Save</FormButton>
          </FormGroup>
          
        </Form> : ''}
        <div style={{paddingTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {state && state.playlists.length > 0 ? state.playlists.map(e=>{
          return <Button
          size='small'
          style={{width: '40vw', margin: 3}}
          color='blue' inverted onClick={()=>{setPlaylistSelection(e.name); setPlaylistIDtoAdd(e._id)}}>{e.name}</Button>
        }) : ''}
        </div>
        
        
      </ModalContent>
      <ModalDescription>
        <Label color='pink'>Playlist Selection : </Label>
        <Label color='teal'>{playlistSelection}</Label>
      </ModalDescription>
    <ModalActions>
      <Button inverted color='grey' onClick={()=>setShow(false)}><Icon name='delete' />Cancel</Button>
      <Button inverted color='violet' onClick={handleAddSongToPlaylist}><Icon name='save' />Save</Button>
    </ModalActions>
    </Modal>
    </>
  )
}
