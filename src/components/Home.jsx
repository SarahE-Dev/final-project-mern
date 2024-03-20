import React, {useState, useEffect, useContext} from 'react'
import { Accordion, AccordionContent, AccordionTitle, Button, ButtonGroup, Container, Divider, Form, FormField, Header, Menu, MenuItem, MenuMenu, Segment, Icon, Label, Grid, GridColumn, Image, List, ListItem, Input, SidebarPusher, SidebarPushable, FormGroup, Card} from 'semantic-ui-react'
import Signup from './Signup'
import axios from 'axios'
import { PlayerContext } from '../context/PlayerContext'
import { HomeContext } from '../context/HomeContext'
import SidebarComponent from './SidebarComponent'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContextConsumer } from '../context/AuthContext'


const client_id='b3c2ec986d6b481793bad1372b1445fd'

const client_secret = '4f7c4b046c014f25adf7bb82fb8489e9'
const TOKEN_URL = 'https://accounts.spotify.com/api/token'

const redirect_uri = 'http://localhost:5173'

const SCOPES = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming', 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'user-library-read', 'user-read-private', 'user-follow-read', 'playlist-read-private', 'user-read-email', 'ugc-image-upload'];

const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${SCOPES.join('%20')}&response_type=code`;

const grantType = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`

export default function Home() {
  function handleLogin(){
    window.location.href = authorizationUrl
}
  const navigate = useNavigate()
  const {dispatch, state} = AuthContextConsumer()
  
  const [refreshToken, setRefreshToken] = useState('');
  const [play, setPlay] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [albums, setAlbums] = useState([])
  let access_t = window.localStorage.getItem('access_token')
  const grabSpotifyToken=async ()=>{
    let token = await axios.post('https://accounts.spotify.com/api/token', grantType, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    window.localStorage.setItem('search_token', token.data.access_token)
    window.localStorage.setItem('search_token_time', Date.now())
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    const fetchData = async () => {
      try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token?',
            new URLSearchParams({
              client_id: client_id,
              grant_type: 'authorization_code',
              code,
              redirect_uri:redirect_uri,
              client_secret
              
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            }
          );
          
          const { access_token, refresh_token, expires_in } = response.data;
          
          dispatch({type: 'SET_ACCESS_TOKEN', payload: access_token})
          setRefreshToken(refresh_token);
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)
          localStorage.setItem('expires_in', Date.now() + expires_in )
          
        
      } catch (error) {
        console.error('Error exchanging code for tokens:', error);
      }
    
    }
    
    if(access_t){
      dispatch({type: 'SET_ACCESS_TOKEN', payload: access_t})
    }
    if(code){
    fetchData();
    }
    let search_token = localStorage.getItem('search_token')
    if(search_token){
      dispatch({type: 'SET_SEARCH_TOKEN', payload: search_token})
    }else{
      grabSpotifyToken()
      dispatch({type: 'SET_SEARCH_TOKEN', payload: search_token})
    }
    if(access_t && code){
      navigate('/')
    }
  }, []);

  

  const handleOnSearch =async()=>{
    const searchParameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.searchToken}`
      }
    }
    try {
      const data = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      const artistID = data.data.artists.items[0].id;
      console.log(data);
      const albums = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
      setAlbums(albums.data.items)
      console.log(albums.data.items);
      setSearchInput('')
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      
    
    <div  style={{backgroundColor: 'black', height: '90vh', marginTop: 0, marginLeft: '12vw', paddingTop: '5vh', overflow: 'scroll'}}>
    
    <Container style={{}} textAlign='center' size='sm'>
    <Form  style={{width: '50vw', margin: 'auto'}}>
      <FormField>
        
        <Input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Searh for an  Artist...'  icon={<Icon inverted circular link name='search' onClick={handleOnSearch} />} />
        
      </FormField>
      
    </Form>
    <div>
    <Divider style={{width: '60vw', margin: 'auto', padding: '3vh 0'}} horizontal>
    <Icon color='purple' size='massive' name='music' circular />
    </Divider>
    </div>
    </Container>
    
      <div style={{display: 'flex', flexWrap: 'wrap', marginLeft: '13vw', paddingBottom: '15vh'}}>
      {albums.map((album, i)=>{
        return (
          <Link to={`/album/${album.id}`} key={album.id}>
          <Card key={album.title} style={{width: '10rem', margin: '10px'}} >
            <Image src={album.images[1].url}/>
          </Card>
          </Link>
        )
      })}
      </div>
    
    </div>
    
    </>
  )
}



