import React, {useState, useEffect, Suspense} from 'react'
import { Divider, Form, FormField, Icon,  Image, Input,  Card, Loader} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContextConsumer } from '../context/AuthContext'
import checkTokens from './hooks/tokenCheck'
import axios from 'axios'



export default function Home() {
  
  const {state} = AuthContextConsumer()
  const {handleTokens} = checkTokens()
  const [haveSearched, setHaveSearched] = useState(false)
  
  const [searchInput, setSearchInput] = useState('')
  const [albums, setAlbums] = useState([])
  
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
      
    
    <div  style={{background: 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)', height: '90vh',marginLeft: '12vw', paddingTop: '4vh', overflow: 'hidden'}}>
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
        {!haveSearched && <div  style={{width: '60vw', margin: 'auto', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh'}}><Icon className='homeSearch' name='music' size='large' circular color='blue' /><h2 className='homeSearch' style={{ fontFamily: 'Rock Salt', color: '#5D3FD3', textShadow: '1px -1px 2px white', textAlign: 'center'}}>Find Your Fyre </h2><Icon
          className='homeSearch'
          circular name='fire' color='pink' size='large' /></div>
          <ul>
          <li style={{ marginTop: 20 }}>Search for an artist to see their albums</li>
          <li style={{marginTop: 10}}>Click on Albums to view Songs</li>
          <li style={{marginTop: 10}}>Add Songs to Favorites or Playlists</li>
          <li style={{marginTop: 10}}>Play Songs, Favorites and Playlists on Spotify Player</li>
          <li style={{marginTop: 10}}>Enjoy! <Icon color='purple' name='smile outline' /></li>
          </ul>
          </div>}
      </div>
    
      <div style={{display: 'flex', flexWrap: 'wrap', paddingBottom: '20vh', justifyContent: 'center'}}>
        <Suspense fallback={<Loader/>}>
      {albums.map((album, i)=>{
        return (
          <Link to={`/album/${album.id}`} key={album.id}>
          <Card key={album.title} style={{width: '7rem', margin: '10px'}} >
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



