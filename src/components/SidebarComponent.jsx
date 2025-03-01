import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItem, Segment, Icon, Divider, Button } from 'semantic-ui-react';

export default function SidebarComponent({ isCollapsed, setIsCollapsed, isMobile }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        width: isCollapsed ? '70px' : 'clamp(200px, 15vw, 250px)',
        background: 'linear-gradient(180deg, rgb(9, 9, 121) 0%, rgb(20, 20, 40) 100%)',
        height: '91vh',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
        borderRight: '1px solid rgba(144, 6, 161, 0.3)',
        transition: 'width 0.3s ease-in-out',
        zIndex: 1000,
      }}
    >
      {!isMobile && <Button
        icon
        circular
        size="tiny"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          right: isCollapsed ? '15px' : '10px',
          top: '10px',
          zIndex: 1001,
          backgroundColor: 'rgba(144, 6, 161, 0.2)',
          color: 'rgb(0, 212, 255)',
          boxShadow: '0 0 8px rgba(0, 212, 255, 0.4)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}
      >
        <Icon name={isCollapsed ? 'angle right' : 'angle left'} />
      </Button>}

      <Menu
        as={Segment}
        style={{
          width: '100%',
          height: 'auto',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          fontSize: 'clamp(0.8rem, 1vw, 1rem)',
          background: 'transparent',
          border: 'none',
          paddingTop: '20px',
          gap: '10px',
          margin: 0,
        }}
        vertical
        inverted
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px 0 25px 0',
            borderBottom: '2px solid rgba(0, 212, 255, 0.4)',
          }}
        >
          
          
        </div>

        <MenuItem
          as={Link}
          to="/"
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: isCollapsed ? '15px 0' : 'clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 20px)',
            margin: isCollapsed ? '5px auto' : '5px 10px',
            borderRadius: '8px',
            transition: '0.3s all',
            background: isActive('/') ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
            boxShadow: isActive('/') ? '0 0 10px rgba(0, 212, 255, 0.2)' : 'none',
            minWidth: 0,
            overflow: 'hidden',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            width: isCollapsed ? '60px' : 'auto',
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: 'clamp(8px, 1vw, 10px)',
              borderRadius: '10px',
              marginRight: isCollapsed ? '0' : 'clamp(10px, 1vw, 15px)',
              boxShadow: isActive('/') ? '0 0 8px rgba(0, 212, 255, 0.3)' : 'none',
              flexShrink: 0,
            }}
          >
            <Icon
              size="large"
              name="home"
              className='sidebar-icon'
              style={{
                color: 'rgb(0, 212, 255)',
              }}
            />
          </div>
          {!isCollapsed && (
            <h3
              className="sidebarMenu"
              style={{
                margin: 0,
                fontWeight: '600',
                fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Home
            </h3>
          )}
        </MenuItem>
        <MenuItem
          as={Link}
          to="/playlists"
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: isCollapsed ? '15px 0' : 'clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 20px)',
            margin: isCollapsed ? '5px auto' : '5px 10px',
            borderRadius: '8px',
            transition: '0.3s all',
            background: isActive('/playlists') ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
            boxShadow: isActive('/playlists') ? '0 0 10px rgba(0, 212, 255, 0.2)' : 'none',
            minWidth: 0,
            overflow: 'hidden',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            width: isCollapsed ? '60px' : 'auto',
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: 'clamp(8px, 1vw, 10px)',
              borderRadius: '10px',
              marginRight: isCollapsed ? '0' : 'clamp(10px, 1vw, 15px)',
              boxShadow: isActive('/playlists') ? '0 0 8px rgba(0, 212, 255, 0.3)' : 'none',
              flexShrink: 0,
            }}
          >
            <Icon
              size="large"
              name="headphones"
              className='sidebar-icon'
              style={{
                color: 'rgb(144, 6, 161)',
              }}
            />
          </div>
          {!isCollapsed && (
            <h3
              className="sidebarMenu"
              style={{
                margin: 0,
                fontWeight: '600',
                fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Playlists
            </h3>
          )}
        </MenuItem>

        <MenuItem
          as={Link}
          to="/favorites"
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: isCollapsed ? '15px 0' : 'clamp(12px, 1.5vh, 16px) clamp(12px, 1.5vw, 20px)',
            margin: isCollapsed ? '5px auto' : '5px 10px',
            borderRadius: '8px',
            transition: '0.3s all',
            background: isActive('/favorites') ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
            boxShadow: isActive('/favorites') ? '0 0 10px rgba(0, 212, 255, 0.2)' : 'none',
            minWidth: 0,
            overflow: 'hidden',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            width: isCollapsed ? '60px' : 'auto',
          }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: 'clamp(8px, 1vw, 10px)',
              borderRadius: '10px',
              marginRight: isCollapsed ? '0' : 'clamp(10px, 1vw, 15px)',
              boxShadow: isActive('/favorites') ? '0 0 8px rgba(0, 212, 255, 0.3)' : 'none',
              flexShrink: 0,
            }}
          >
            <Icon
              size="large"
              name="heartbeat"
              className='sidebar-icon'
              style={{
                color: 'rgb(255, 102, 0)',
              }}
            />
          </div>
          {!isCollapsed && (
            <h3
              className="sidebarMenu"
              style={{
                margin: 0,
                fontWeight: '600',
                fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Favorites
            </h3>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Divider
            style={{
              margin: '20px 15px',
              borderTop: '1px solid rgba(144, 6, 161, 0.3)',
              borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
              opacity: 0.5,
            }}
          />
        )}

        {!isCollapsed && (
          <div
            style={{
              margin: 'auto 0 0 0',
              width: '100%',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 'clamp(0.6rem, 0.8vw, 0.8rem)',
              padding: '0 10px 20px 10px',
              marginBottom: 'clamp(60px, 10vw, 100px)'
            }}
          >
            <Icon name="sound" style={{ color: 'rgb(0, 212, 255)' }} />
            <span>DISCOVER · PLAY · EXPERIENCE</span>
          </div>
        )}
      </Menu>
    </div>
  );
}