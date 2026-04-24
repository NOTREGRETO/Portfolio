import React, { useState, useEffect } from 'react';

export default function Github() {
    const [stats, setStats] = useState(null);
    const [repos, setRepos] = useState([]);
    const [readme, setReadme] = useState("");
    const [loading, setLoading] = useState(true);

    const username = "ParthAroraTSC";

    useEffect(() => {
        setLoading(true);
        // Fetch User Stats
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => {
                if (data.message === "Not Found") return;
                setStats(data);
            })
            .catch(err => console.error(err));

        // Fetch Top Repos
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setRepos(data);
                }
            })
            .catch(err => console.error(err));

        // Fetch Profile README
        // We check both 'main' and 'master' branches for the README
        const fetchReadme = async () => {
            try {
                let res = await fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`);
                if (!res.ok) {
                    res = await fetch(`https://raw.githubusercontent.com/${username}/${username}/master/README.md`);
                }
                if (res.ok) {
                    let data = await res.text();
                    // Sanitize legacy handles if they exist in the README
                    setReadme(data.replace(/vivek9patel/g, username).replace(/NOTREGRETO/g, username));
                } else {
                    setReadme("No profile README found. Check out my repositories below!");
                }
            } catch (err) {
                console.error(err);
                setReadme("Failed to load README.");
            } finally {
                setLoading(false);
            }
        };

        fetchReadme();
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-start bg-[#0d1117] text-[#c9d1d9] p-4 overflow-y-auto custom-scrollbar" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif' }}>
            <div className="w-full max-w-5xl animateShow mt-4 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar */}
                    <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="relative group">
                            <img 
                                src={stats ? stats.avatar_url : `https://github.com/${username}.png`} 
                                alt={username} 
                                className="w-48 h-48 md:w-full rounded-full border border-[#30363d] mb-4 shadow-sm object-cover bg-[#161b22]"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold text-[#e6edf3]">{stats ? stats.name : "Parth Arora"}</h2>
                        <p className="text-xl font-light text-[#8b949e]">{username}</p>
                        <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="w-full mt-4 py-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-sm font-medium text-[#c9d1d9] hover:bg-[#30363d] transition text-center">
                            View Profile
                        </a>
                        <p className="mt-4 text-[#e6edf3] text-sm leading-snug">
                            {stats ? stats.bio : "SOC Analyst | Cyber Security Enthusiast | VAPT Expertise"}
                        </p>
                        <div className="flex items-center mt-4 text-xs text-[#8b949e]">
                            <span className="font-semibold text-[#e6edf3] mr-1">{stats ? stats.followers : "0"}</span> followers 
                            <span className="mx-1">·</span> 
                            <span className="font-semibold text-[#e6edf3] mr-1">{stats ? stats.following : "0"}</span> following
                        </div>
                        
                        <div className="mt-6 w-full text-sm text-[#e6edf3] space-y-2 border-t border-[#30363d] pt-4">
                            {stats && stats.company && (
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2Zm0 1.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25H1.75Z"></path></svg>
                                    {stats.company}
                                </div>
                            )}
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.192 6.5 6.5 0 0 1 0 9.192Zm-1.06-8.132a5 5 0 1 0-7.071 7.071L8 14.07l3.535-3.535a5 5 0 0 0 0-7.071Z"></path></svg>
                                {stats && stats.location ? stats.location : "India"}
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H3.337v7.225h1.606zm-1.56-8.212c.537 0 .867-.359.867-.806C4.232 3.918 3.91 3.58 3.376 3.58c-.533 0-.88.338-.88.794 0 .447.337.806.85.806h.02zM13.148 13.394V9.3c0-2.193-1.173-3.214-2.733-3.214-1.258 0-1.823.693-2.138 1.182h.014V6.169H6.685c.02.453 0 7.225 0 7.225h1.606V9.36c0-.216.016-.432.08-.586.173-.432.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h1.606z"/></svg>
                                <a href="https://www.linkedin.com/in/parth-arora-1343b5368/" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline truncate">LinkedIn Profile</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="md:w-3/4">
                        <div className="flex border-b border-[#30363d] mb-6 text-sm">
                            <span className="border-b-2 border-[#f78166] pb-3 px-4 font-semibold text-[#e6edf3] flex items-center cursor-default">
                                <svg className="w-4 h-4 mr-2 text-[#8b949e]" viewBox="0 0 16 16" version="1.1" fill="currentColor"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Z"></path><path d="M6 3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 3.75Zm-2.25 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Z"></path></svg>
                                Overview
                            </span>
                        </div>

                        {/* README Section */}
                        <div className="border border-[#30363d] rounded-md p-6 mb-8 bg-[#0d1117]">
                            <div className="flex items-center text-xs text-[#8b949e] mb-4">
                                <span>{username} / README.md</span>
                            </div>
                            <div className="prose prose-invert max-w-none text-sm">
                                {loading ? (
                                    <div className="italic text-[#8b949e] animate-pulse">Fetching profile data...</div>
                                ) : (
                                    <pre className="whitespace-pre-wrap font-sans text-[#e6edf3]">
                                        {readme}
                                    </pre>
                                )}
                            </div>
                        </div>

                        <h3 className="text-base font-normal mb-4 text-[#e6edf3]">Top Repositories</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {repos.length > 0 ? (
                                repos.map((repo, i) => (
                                    <div key={i} className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] hover:bg-[#161b22] transition group">
                                        <div className="flex justify-between items-start">
                                            <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-[#58a6ff] font-semibold hover:underline">
                                                {repo.name}
                                            </a>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-[#30363d] text-[#8b949e]">
                                                {repo.visibility}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#8b949e] mt-2 h-10 line-clamp-2">
                                            {repo.description || "No description provided."}
                                        </p>
                                        <div className="flex items-center mt-4 text-[11px] text-[#8b949e]">
                                            {repo.language && (
                                                <span className="flex items-center mr-4">
                                                    <div className="w-3 h-3 rounded-full bg-[#f1e05a] mr-1"></div>
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span className="flex items-center mr-4">
                                                ★ {repo.stargazers_count}
                                            </span>
                                            <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 16 16"><path d="M5 5.372v.838c0 .366.442.55.701.29l3.208-3.208a.41.41 0 0 0 0-.582L5.7 1.302c-.26-.26-.701-.076-.701.29v.838a4.5 4.5 0 0 0-4.5 4.5v.458c0 .226.183.41.409.41H1.5a.41.41 0 0 0 .409-.41v-.458A3.09 3.09 0 0 1 5 5.372Z"></path></svg>
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 p-8 border border-dashed border-[#30363d] rounded-md text-center text-[#8b949e]">
                                    {loading ? "Loading repositories..." : "No public repositories found."}
                                </div>
                            )}
                        </div>

                        <h3 className="text-base font-normal mb-4 text-[#e6edf3]">Contribution Activity</h3>
                        <div className="p-4 border border-[#30363d] rounded-md bg-[#0d1117] flex flex-col">
                            <img 
                                src={`https://ghchart.rshah.org/40c463/${username}`} 
                                alt="GitHub Contribution Chart" 
                                className="w-full opacity-90 my-2"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="flex justify-between items-center mt-2 text-[10px] text-[#8b949e]">
                                <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline flex items-center">
                                    View full activity on GitHub
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                                <div className="flex items-center gap-1">
                                    <span>Less</span>
                                    <div className="w-2.5 h-2.5 bg-[#161b22] border border-[#30363d]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#0e4429]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#006d32]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#26a641]"></div>
                                    <div className="w-2.5 h-2.5 bg-[#39d353]"></div>
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="mt-10 mb-10 text-[10px] text-[#484f58] uppercase tracking-widest font-mono">
                System Interface : GitHub API v3
            </p>
        </div>
    );
}

export const displayGithub = () => {
    return <Github />;
}
