import React, {useState, useEffect, useContext, Suspense} from 'react'
import { Container, Divider, Form, FormField, Icon,  Image, Input,  Card, Loader} from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContextConsumer } from '../context/AuthContext'
import checkTokens from './hooks/tokenCheck'
import axios from 'axios'


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
  const {handleTokens} = checkTokens()
  const [haveSearched, setHaveSearched] = useState(false)
  
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
    
    handleTokens()
  }, []);

  
  

  

  const handleOnSearch =async()=>{
    setHaveSearched(true)
    if(searchInput !== ''){
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
  }

  return (
    <>
      
    
    <div  style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', height: '90vh',marginLeft: '12vw', paddingTop: '4vh'}}>
    <div style={{backgroundColor: 'black', paddingTop: '5vh', borderRadius: '20px', marginLeft: '5vw', marginRight: '2vw', height: '67vh', overflow: 'auto'}}>
    
    <Form onSubmit={handleOnSearch} style={{width: '50vw', margin: 'auto'}}>
      <FormField>
        
        <Input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search for an  Artist...'  icon={<Icon inverted circular link name='search' onClick={handleOnSearch} />} />
        
      </FormField>
      
    </Form>
    <div>
    <Divider style={{width: '60vw', margin: 'auto', padding: '3vh 0'}} horizontal>
    <Icon color='purple' size='massive' name='music' circular />
    </Divider>
    </div>
      <div>
        {!haveSearched && <div style={{width: '60vw', margin: 'auto', color: 'white', textAlign: '', fontSize: '1.5em', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh'}}><Icon name='music' size='large' circular color='blue' /><h2 style={{ fontFamily: 'Rock Salt', color: '#5D3FD3', textShadow: '1px -1px 2px white'}}>Find Your Fyre </h2><Icon circular name='fire' color='pink' size='large' /></div>
          <ul>
          <li style={{ marginTop: 20 }}>Search for an artist to see their albums</li>
          <li style={{marginTop: 10}}>Click on Albums to view Songs</li>
          <li style={{marginTop: 10}}>Add Songs to Favorites or Playlists</li>
          <li style={{marginTop: 10}}>Play Songs, Favorites and Playlists on Spotify Player</li>
          <li style={{marginTop: 10}}>Enjoy! <Icon color='purple' name='smile outline' /></li>
          </ul>
          </div>}
      </div>
    
      <div style={{display: 'flex', flexWrap: 'wrap', paddingBottom: '15vh', justifyContent: 'center'}}>
        <Suspense fallback={<Loader/>}>
      {albums.map((album, i)=>{
        return (
          <Link to={`/album/${album.id}`} key={album.id}>
          <Card key={album.title} style={{width: '10rem', margin: '10px'}} >
            <Image src={album.images[1].url}/>
          </Card>
          </Link>
        )
      })}
      </Suspense>
      </div>
      </div>
    </div>
    
    </>
  )
}



