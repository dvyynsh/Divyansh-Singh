import React from 'react';
import useGitHub from '../hooks/useGitHub';
import Magnetic from './Magnetic';
import { Star, GitFork, Eye, Book, Calendar, Users, UserPlus } from 'lucide-react';

const CountUp = React.memo(({ end, suffix = '' }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime;
    const duration = 1500; // 1.5s
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOut * end));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end]);

  return <span>{count}{suffix}</span>;
});

const GitHubActivity = () => {
  const { data, loading, error } = useGitHub('dvyynsh');

  if (loading) {
    return (
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl h-48 animate-pulse border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"></div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/10 flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
        <span className="text-xs text-text-muted font-medium">⚫ GitHub Data Unavailable</span>
      </div>
    );
  }

  const { user, latestRepo, latestCommit, languages } = data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Magnetic>
      <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group hover-target overflow-hidden relative opacity-0 translate-y-2 discord-fade-in shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] hover:backdrop-blur-2xl text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        <a href={`https://github.com/${user.login}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
          <span className="text-sm font-medium">{user.login}</span>
          <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </a>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-3 mb-4 relative z-10 border-b border-white/10 pb-4">
        <img src={user.avatar_url} alt={`${user.name}'s Avatar`} className="w-10 h-10 rounded-full border border-white/10 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate">{user.name || user.login}</h3>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-text-muted">
            <span className="flex items-center gap-1" title="Followers"><Users size={12} /> <CountUp end={user.followers} /></span>
            <span className="flex items-center gap-1" title="Following"><UserPlus size={12} /> <CountUp end={user.following} /></span>
            <span className="flex items-center gap-1" title="Public Repositories"><Book size={12} /> <CountUp end={user.public_repos} /></span>
          </div>
        </div>
      </div>

      {/* Current/Latest Repository */}
      {latestRepo && (
        <div className="mb-4 relative z-10">
          <h4 className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Latest Active Repo</h4>
          <a href={`https://github.com/${user.login}/${latestRepo.name}`} target="_blank" rel="noreferrer" className="block p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-accent truncate">{latestRepo.name}</span>
              {latestRepo.language && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-white/80">{latestRepo.language}</span>
              )}
            </div>
            {latestRepo.description && (
              <p className="text-[10px] text-text-muted line-clamp-1 mb-2">{latestRepo.description}</p>
            )}
            
            <div className="flex items-center gap-3 text-[10px] text-text-muted">
              {latestRepo.stars > 0 && <span className="flex items-center gap-1"><Star size={10} /> {latestRepo.stars}</span>}
              {latestRepo.forks > 0 && <span className="flex items-center gap-1"><GitFork size={10} /> {latestRepo.forks}</span>}
              {latestRepo.watchers > 0 && <span className="flex items-center gap-1"><Eye size={10} /> {latestRepo.watchers}</span>}
              <span className="ml-auto">Updated {formatDate(latestRepo.updated_at)}</span>
            </div>
          </a>
        </div>
      )}

      {/* Latest Commit */}
      {latestCommit && (
        <div className="mb-4 relative z-10">
          <h4 className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Latest Commit</h4>
          <div className="flex items-start gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0 animate-pulse"></div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white/90 truncate">{latestCommit.message}</p>
              <p className="text-[10px] text-text-muted mt-0.5">{latestCommit.repo} • {formatDate(latestCommit.date)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="relative z-10 pt-3 border-t border-white/10">
          <h4 className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Top Languages</h4>
          <div className="space-y-2">
            {languages.map(lang => (
              <div key={lang.name} className="flex items-center gap-2 text-[10px]">
                <span className="w-16 truncate font-medium">{lang.name}</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-1000 ease-out fade-in" 
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
                <span className="w-6 text-right text-text-muted">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
    </Magnetic>
  );
};

export default React.memo(GitHubActivity);
