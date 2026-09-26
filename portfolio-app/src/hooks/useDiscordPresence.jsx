import { useState, useEffect, useRef } from 'react';

const useDiscordPresence = (discordId) => {
  const [presence, setPresence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const wsRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const connectWebSocket = () => {
      const ws = new WebSocket('wss://api.lanyard.rest/socket');
      wsRef.current = ws;

      ws.onopen = () => {
        // Connection opened
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        const data = JSON.parse(event.data);
        const { op, d, t } = data;

        if (op === 1) {
          // Hello message, set up heartbeat and subscribe
          const heartbeatInterval = d.heartbeat_interval;
          
          if (heartbeatIntervalRef.current) {
            clearInterval(heartbeatIntervalRef.current);
          }
          
          heartbeatIntervalRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, heartbeatInterval);

          ws.send(JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: discordId
            }
          }));
        } else if (op === 0) {
          // Event message
          if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
            setPresence(d);
            setLoading(false);
            setError(false);
          }
        }
      };

      ws.onclose = () => {
        if (!isMounted) return;
        // Attempt to reconnect after 5 seconds
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }
        setTimeout(() => {
          if (isMounted) connectWebSocket();
        }, 5000);
      };

      ws.onerror = () => {
        if (!isMounted) return;
        if (!presence) {
          setError(true);
          setLoading(false);
        }
      };
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [discordId]);

  return { presence, loading, error };
};

export default useDiscordPresence;
