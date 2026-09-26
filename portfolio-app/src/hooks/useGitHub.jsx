import { useState, useEffect } from 'react';

const CACHE_KEY = 'github_activity_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useGitHub = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      try {
        // Check cache
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }

        // Fetch User Data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('User fetch failed');
        const userData = await userRes.json();

        // Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        if (!reposRes.ok) throw new Error('Repos fetch failed');
        const reposData = await reposRes.json();

        const latestRepo = reposData[0];
        
        let latestCommit = null;
        if (latestRepo && latestRepo.size > 0) {
          try {
            const commitRes = await fetch(`https://api.github.com/repos/${username}/${latestRepo.name}/commits?per_page=1`);
            if (commitRes.ok) {
              const commitData = await commitRes.json();
              if (commitData && commitData.length > 0) {
                latestCommit = commitData[0];
              }
            }
          } catch (err) {
            console.error('Failed to fetch commit', err);
          }
        }

        // Aggregate Languages
        const langCounts = {};
        reposData.forEach(repo => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });

        // Convert to percentages based on repo count (or just relative scale)
        const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const languages = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: totalLangs > 0 ? Math.round((count / totalLangs) * 100) : 0
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4); // Top 4 languages

        const finalData = {
          user: {
            name: userData.name,
            login: userData.login,
            avatar_url: userData.avatar_url,
            followers: userData.followers,
            following: userData.following,
            public_repos: userData.public_repos,
            created_at: userData.created_at
          },
          latestRepo: latestRepo ? {
            name: latestRepo.name,
            description: latestRepo.description,
            language: latestRepo.language,
            updated_at: latestRepo.pushed_at || latestRepo.updated_at,
            stars: latestRepo.stargazers_count,
            forks: latestRepo.forks_count,
            watchers: latestRepo.watchers_count
          } : null,
          latestCommit: latestCommit ? {
            message: latestCommit.commit.message.split('\n')[0],
            date: latestCommit.commit.author.date,
            repo: latestRepo.name
          } : null,
          languages
        };

        if (isMounted) {
          setData(finalData);
          setLoading(false);
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: finalData
          }));
        }

      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { data, loading, error };
};

export default useGitHub;
