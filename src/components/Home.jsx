import React, { useState, useEffect, Suspense } from 'react';
import { Divider, Form, FormField, Icon, Image, Input, Card, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AuthContext';
import checkTokens from './hooks/tokenCheck';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Home() {
  const { state } = useAppContext();
  const { handleTokens } = checkTokens();
  const [haveSearched, setHaveSearched] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleTokens();
    
  }, []);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query && state.searchToken && !haveSearched) {
      setSearchInput(decodeURIComponent(query));
      performSearch(decodeURIComponent(query));
    }
  }, [state.searchToken])
  
  const performSearch = async (query) => {
    if (!query) return;

    setHaveSearched(true);
    
    const searchParameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.searchToken}`,
      },
    };

    try {
      const data = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=1`,
        searchParameters
      );

      if (data.data.artists.items.length === 0) {
        console.log('No artists found');
        setAlbums([]);
        return;
      }

      const artistID = data.data.artists.items[0].id;
      const albums = await axios.get(
        `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
        searchParameters
      );

      setAlbums(albums.data.items);
      setSearchInput('')
    } catch (error) {
      console.error('Search error:', error);
      if (error.response?.status === 401) {
        await handleTokens();
      }
    }
  };

  const handleOnSearch = (e) => {
    if (e) e.preventDefault();
    
    if (searchInput.trim()) {
      navigate(`/?q=${encodeURIComponent(searchInput)}`);
      performSearch(searchInput);
    }
  };


  return (
    <div
      style={{
        height: '90vh',
        paddingTop: '4vh',
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '5vh 2vw',
          borderRadius: '20px',
          margin: '0 2vw',
          height: '67vh',
          overflowY: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(144, 6, 161, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '5vw',
          width: '95%'
        }}
      >
        <Form
          onSubmit={handleOnSearch}
          style={{ width: 'clamp(300px, 50vw, 600px)', margin: '0 auto 3vh' }}
        >
          <FormField>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.9)', 
                border: '1px solid rgba(0, 212, 255, 0.7)',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
                padding: '5px 10px',
                height: '40px',
              }}
            >
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for an Artist..."
                transparent
                style={{
                  flex: 1,
                  color: 'rgb(0, 212, 255)', 
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                  letterSpacing: '1px',
                  border: 'none',
                  background: 'transparent',
                  padding: '0 5px', 
                  height: '100%',
                  lineHeight: 'normal',
                }}
              />
              <Icon
                inverted
                circular
                link
                name="search"
                onClick={handleOnSearch}
                style={{
                  color: 'rgb(144, 6, 161)',
                  textShadow: '0 0 5px rgba(144, 6, 161, 0.7)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '8px',
                  marginLeft: '10px',
                  fontSize: '1.2rem',
                }}
              />
            </div>
          </FormField>
        </Form>

        <Divider
          style={{
            width: '60vw',
            margin: '0 auto 3vh',
            opacity: 0.5,
          }}
          horizontal
        >
          <Icon
            color="purple"
            size="huge"
            name="music"
            circular
            style={{
              color: 'rgb(144, 6, 161)',
              textShadow: '0 0 10px rgba(144, 6, 161, 0.7)',
            }}
          />
        </Divider>

        {!haveSearched && (
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2rem',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(45deg, rgba(144, 6, 161, 0.2), rgba(0, 212, 255, 0.2))',
                    padding: '2rem',
                    borderRadius: '15px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <h1
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: '800',
                      marginBottom: '1rem',
                      background: 'linear-gradient(45deg, rgb(144, 6, 161), rgb(0, 212, 255))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    FIND YOUR FYRE
                  </h1>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      maxWidth: '600px',
                      margin: '0 auto',
                    }}
                  >
                    Explore millions of tracks, create your perfect playlist, and find your next favorite artist.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1.3rem',
                    width: '100%',
                  }}
                >
                  {[
                    { icon: 'search', title: 'Search', desc: 'Find your favorite artists' },
                    { icon: 'music', title: 'Discover', desc: 'Explore new music' },
                    { icon: 'plus', title: 'Create', desc: 'Build your collections' },
                    { icon: 'spotify', title: 'Stream', desc: 'Listen on Spotify' },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        padding: '1.5rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(144, 6, 161, 0.3)',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer',
                        ':hover': {
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      <Icon
                        name={feature.icon}
                        size="large"
                        style={{
                          color: 'rgb(0, 212, 255)',
                          marginBottom: '1rem',
                        }}
                      />
                      <h3
                        style={{
                          fontSize: 'clamp(1rem, 1.2vw, 1.3rem)',
                          marginBottom: '0.5rem',
                          color: 'rgb(0, 212, 255)',
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '25px',
              padding: '20px',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <Suspense fallback={<Loader active />}>
              {albums.map((album) => (
                <Link 
                  to={`/album/${album.id}`} 
                  key={album.id}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '12px',
                      padding: '15px',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(0, 212, 255, 0.1)',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      ':hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 212, 255, 0.5)',
                      }
                    }}
                    className="album-card" 
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        paddingBottom: '100%', 
                        marginBottom: '12px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={album.images[0]?.url}
                        alt={`Album cover of ${album.name}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1px solid rgba(144, 6, 161, 0.2)',
                        }}
                      />
                    </div>
                    <div style={{ padding: '0 5px' }}>
                      <h3
                        style={{
                          color: '#fff',
                          fontSize: '1rem',
                          marginBottom: '8px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          fontWeight: '600',
                        }}
                      >
                        {album.name}
                      </h3>
                      <p
                        style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.9rem',
                          margin: '0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {album.artists.map(artist => artist.name).join(', ')}
                      </p>
                      <p
                        style={{
                          color: 'rgba(0, 212, 255, 0.8)',
                          fontSize: '0.8rem',
                          margin: '5px 0 0',
                        }}
                      >
                        {new Date(album.release_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </Suspense>
          </div>
      </div>
    </div>
  );
}