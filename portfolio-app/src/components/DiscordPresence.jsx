import React, { useEffect, useState } from 'react';
import { Gamepad2, Headphones, MessageSquare, Circle } from 'lucide-react';

// Put your Discord User ID here to use Lanyard API
// Example: "156114103033790464"
const DISCORD_ID = "YOUR_DISCORD_ID_HERE";

const DiscordPresence = () => {
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DISCORD_ID === "YOUR_DISCORD_ID_HERE") {
      // Mock data if ID is not provided
      setPresence({
        discord_status: "online",
        discord_user: {
          username: "Divyansh Singh",
          avatar: "placeholder",
        },
        activities: [
          { type: 0, name: "VS Code", state: "Coding Portfolio", details: "Working on React" }
        ],
        listening_to_spotify: false
      });
      setLoading(false);
      return;
    }

    const ws = new WebSocket('wss://api.lanyard.rest/socket');

    ws.onmessage = (event) => {
      const { op, d, t } = JSON.parse(event.data);

      if (op === 1) {
        // Hello event, send initialize
        ws.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: DISCORD_ID }
        }));
      }

      if (op === 0 && (t === "INIT_STATE" || t === "PRESENCE_UPDATE")) {
        setPresence(d);
        setLoading(false);
      }
    };

    // Heartbeat
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ op: 3 }));
      }
    }, 30000);

    return () => {
      clearInterval(heartbeat);
      ws.close();
    };
  }, []);

  if (loading) {
    return <div className="w-full h-32 glass rounded-2xl animate-pulse"></div>;
  }

  if (!presence) return null;

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  const getStatusColor = () => statusColors[presence.discord_status] || statusColors.offline;

  const mainActivity = presence.activities?.find(a => a.type === 0);
  const isPlaying = !!mainActivity;
  const isSpotify = presence.listening_to_spotify;

  return (
    <div className="glass-card p-6 w-full relative overflow-hidden group hover:border-accent/30 transition-all hover-target">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          {presence.discord_user.avatar !== "placeholder" ? (
            <img 
              src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${presence.discord_user.avatar}.png`} 
              alt="Discord Avatar" 
              className="w-16 h-16 rounded-full border border-white/10"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center border border-white/10 text-xl font-display text-white">D</div>
          )}
          
          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#111] ${getStatusColor()}`}>
            <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: 'inherit' }}></div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white">{presence.discord_user.username}</h4>
            <span className="text-[10px] uppercase tracking-widest text-text-muted px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
              {presence.discord_status}
            </span>
          </div>

          <div className="text-sm text-text-muted flex flex-col gap-1">
            {isSpotify ? (
              <div className="flex items-center gap-2 text-green-400">
                <Headphones size={14} />
                <span className="truncate max-w-[200px]">Listening to Spotify</span>
              </div>
            ) : isPlaying ? (
              <div className="flex items-center gap-2 text-accent">
                <Gamepad2 size={14} />
                <span className="truncate max-w-[200px]">Playing {mainActivity.name}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <MessageSquare size={14} />
                <span>Chilling online</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscordPresence;
