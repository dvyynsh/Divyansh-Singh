import React, { useState, useEffect, useMemo } from 'react';
import useDiscordPresence from '../hooks/useDiscordPresence';
import Magnetic from './Magnetic';

const DISCORD_ID = "1249751903060099164";

const SpotifyPlayer = React.memo(({ spotify }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;
    const updateProgress = () => {
      if (!spotify?.timestamps) return;
      const { start, end } = spotify.timestamps;
      const now = Date.now();
      const total = end - start;
      const current = now - start;
      
      let percentage = (current / total) * 100;
      if (percentage > 100) percentage = 100;
      if (percentage < 0) percentage = 0;
      
      setProgress(percentage);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [spotify]);

  if (!spotify) return null;

  return (
    <div className="mt-2 pt-2 border-t border-white/5 relative z-10">
      <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2">
        <span className="text-green-400">🎵</span>
        <span>Listening on Spotify</span>
      </div>
      <div className="flex items-center gap-2">
        <img 
          src={spotify.album_art_url} 
          alt={`Album art for ${spotify.album}`}
          className="w-12 h-12 rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.2)] shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-xs font-medium text-white truncate" aria-label={`Song: ${spotify.song}`}>{spotify.song}</p>
          <p className="text-[10px] text-text-muted truncate" aria-label={`Artist: ${spotify.artist}`}>{spotify.artist}</p>
          {/* Smooth Progress Bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});

const ElapsedTime = React.memo(({ startTimestamp }) => {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!startTimestamp) return;
    
    const updateTime = () => {
      const now = Date.now();
      const diffInMinutes = Math.floor((now - startTimestamp) / 60000);
      
      if (diffInMinutes < 1) {
        setElapsed('Active for < 1 min');
      } else {
        setElapsed(`Active for ${diffInMinutes} min`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [startTimestamp]);

  if (!elapsed) return null;
  return <div className="text-[10px] text-text-muted/70 mt-0.5">{elapsed}</div>;
});

const DiscordPresence = () => {
  const { presence, loading, error } = useDiscordPresence(DISCORD_ID);

  if (loading) {
    return (
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl h-16 animate-pulse border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"></div>
    );
  }

  if (error || !presence) {
    return (
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/10 flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
        <span className="text-xs text-text-muted font-medium">⚫ Discord Unavailable</span>
      </div>
    );
  }

  const { discord_status, discord_user, activities, listening_to_spotify, spotify } = presence;

  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online' },
    idle: { color: 'bg-yellow-500', label: 'Idle' },
    dnd: { color: 'bg-red-500', label: 'Do Not Disturb' },
    offline: { color: 'bg-gray-500', label: 'Offline' }
  };

  const statusInfo = statusConfig[discord_status] || statusConfig.offline;

  // Find activities
  const customStatus = activities.find(a => a.type === 4);
  const playingActivity = activities.find(a => a.type === 0);
  const codingActivity = activities.find(a => a.name === 'Visual Studio Code' || a.name === 'Code');
  
  // Choose the primary activity to display elapsed time for
  const primaryActivity = codingActivity || playingActivity;

  // Render Activity Text
  const renderActivity = () => {
    if (codingActivity) {
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-text-muted truncate">
            <span>💻</span>
            <span className="truncate">Coding Visual Studio Code</span>
          </div>
        </div>
      );
    }
    
    if (playingActivity) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-text-muted truncate">
          <span>🎮</span>
          <span className="truncate">{playingActivity.name}</span>
        </div>
      );
    }

    if (customStatus && customStatus.state) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-text-muted truncate">
          <span>💬</span>
          <span className="truncate">{customStatus.state}</span>
        </div>
      );
    }

    if (!listening_to_spotify) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-text-muted truncate">
          <span className="truncate">Currently Online</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Magnetic>
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/10 hover:border-white/20 transition-all duration-300 group hover-target overflow-hidden relative opacity-0 translate-y-2 discord-fade-in shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:backdrop-blur-2xl">
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Top Row */}
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <div className="relative">
          {discord_user.avatar ? (
            <img 
              src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${discord_user.avatar}.png`} 
              alt={`${discord_user.username}'s Avatar`}
              className="w-6 h-6 rounded-full border border-white/10 shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center border border-white/10 shrink-0">
              <span className="text-xs text-white">D</span>
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-white truncate">{discord_user.username}</span>
        
        {/* Status Dot */}
        <div className="ml-auto relative flex items-center justify-center w-2.5 h-2.5 shrink-0" aria-label={`Status: ${statusInfo.label}`}>
          {discord_status !== 'offline' && (
            <div className={`absolute inset-0 rounded-full ${statusInfo.color} animate-ping opacity-75`}></div>
          )}
          <div className={`relative w-2 h-2 rounded-full ${statusInfo.color}`}></div>
        </div>
      </div>

      {/* Second Row - Activity */}
      <div className="relative z-10 flex flex-col">
        {renderActivity()}
        {primaryActivity?.timestamps?.start && (
          <ElapsedTime startTimestamp={primaryActivity.timestamps.start} />
        )}
      </div>

      {/* Spotify Section */}
      {listening_to_spotify && spotify && (
        <div key={spotify.track_id || spotify.song} className="fade-in">
          <SpotifyPlayer spotify={spotify} />
        </div>
      )}
    </div>
    </Magnetic>
  );
};

export default React.memo(DiscordPresence);
