import React, { useState } from 'react'

export default function Spotify() {
    const [activePlaylist, setActivePlaylist] = useState("0MwvYS9Ze9otquNC5LEB8T");

    const playlists = [
        { id: "0MwvYS9Ze9otquNC5LEB8T", name: "Parth's Vibe 1", description: "Curated collection by ParthAroraTSC" },
        { id: "1f3YDsTOam8qpootoC6nic", name: "Parth's Vibe 2", description: "Smooth flows and deep focus" }
    ];

    return (
        <div className="h-full w-full flex bg-[#121212] text-white overflow-hidden font-sans select-none">
            {/* Spotify Sidebar */}
            <div className="w-60 bg-black h-full flex flex-col p-6 hidden md:flex">
                <div className="mb-8">
                    <img src="./themes/Yaru/apps/spotify.png" alt="Spotify" className="w-10 mb-4" />
                    <nav className="space-y-4">
                        <div className="flex items-center text-gray-400 hover:text-white cursor-pointer transition">
                            <span className="font-bold">Home</span>
                        </div>
                        <div className="flex items-center text-gray-400 hover:text-white cursor-pointer transition">
                            <span className="font-bold">Search</span>
                        </div>
                        <div className="flex items-center text-gray-400 hover:text-white cursor-pointer transition">
                            <span className="font-bold">Your Library</span>
                        </div>
                    </nav>
                </div>

                <div className="flex-grow overflow-y-auto">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">Playlists</p>
                    <div className="space-y-3">
                        {playlists.map((pl) => (
                            <div 
                                key={pl.id} 
                                onClick={() => setActivePlaylist(pl.id)}
                                className={`text-sm cursor-pointer truncate ${activePlaylist === pl.id ? "text-white font-bold" : "text-gray-400 hover:text-white"}`}
                            >
                                {pl.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col relative overflow-hidden bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
                {/* Header */}
                <header className="p-4 flex items-center justify-between z-10">
                    <div className="flex space-x-4">
                        <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-not-allowed text-gray-400">
                            &lt;
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-not-allowed text-gray-400">
                            &gt;
                        </div>
                    </div>
                    <div className="bg-black bg-opacity-50 rounded-full px-3 py-1 flex items-center space-x-2 border border-gray-700">
                        <div className="w-6 h-6 rounded-full bg-ub-orange flex items-center justify-center text-[10px] font-bold">P</div>
                        <span className="text-xs font-bold">Parth Arora</span>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-grow p-8 overflow-y-auto">
                    <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                        <div className="w-52 h-52 shadow-2xl bg-[#282828] flex items-center justify-center">
                             <img src="./themes/Yaru/apps/spotify.png" alt="Playlist Art" className="w-24 opacity-20" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase">Playlist</p>
                            <h1 className="text-5xl md:text-7xl font-black mt-2 mb-4">
                                {playlists.find(p => p.id === activePlaylist).name}
                            </h1>
                            <p className="text-sm text-gray-400">
                                {playlists.find(p => p.id === activePlaylist).description} • ParthAroraTSC
                            </p>
                        </div>
                    </div>

                    {/* Spotify Embed Player */}
                    <div className="rounded-lg overflow-hidden shadow-2xl bg-black bg-opacity-40 animateShow">
                        <iframe 
                            src={`https://open.spotify.com/embed/playlist/${activePlaylist}`}
                            frameBorder="0" 
                            title="Spotify Player" 
                            className="w-full h-[450px]"
                            allow="encrypted-media"
                        ></iframe>
                    </div>
                </div>

                {/* Now Playing Bar */}
                <div className="h-20 bg-[#181818] border-t border-[#282828] flex items-center px-4 justify-between select-none">
                    <div className="flex items-center w-1/3">
                        <div className="w-14 h-14 bg-[#282828] mr-4 flex items-center justify-center rounded">
                            <img src="./themes/Yaru/apps/spotify.png" alt="Art" className="w-8 opacity-60" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-bold truncate hover:underline cursor-pointer">Discovering Vibes...</div>
                            <div className="text-[11px] text-gray-400 hover:underline cursor-pointer">ParthAroraTSC</div>
                        </div>
                        <div className="ml-5 flex space-x-3 text-gray-400">
                             <svg className="w-4 h-4 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/></svg>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-1/3">
                         <div className="flex items-center space-x-5 mb-2">
                             {/* Shuffle */}
                             <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M11 1.5v.7l.3-.3.8-.8.3-.3a.5.5 0 0 1 .7 0l.3.3a.5.5 0 0 1 0 .7l-.3.3-.8.8-.3.3v.7a.5.5 0 0 1-1 0v-.7l-.3.3-.8.8-.3.3a.5.5 0 0 1-.7 0l-.3-.3a.5.5 0 0 1 0-.7l.3-.3.8-.8.3-.3v-.7a.5.5 0 0 1 1 0zM1 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/></svg>
                             {/* Prev */}
                             <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.15V14.3a.7.7 0 0 1-.7.7H.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h2.6z"/></svg>
                             {/* Play */}
                             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black cursor-pointer hover:scale-105 transition">
                                 <svg className="w-4 h-4 ml-0.5" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/></svg>
                             </div>
                             {/* Next */}
                             <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.106A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.15v5.15a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/></svg>
                             {/* Repeat */}
                             <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M11 5.466V1.7a.7.7 0 0 0-1.195-.495l-3.5 3.5a.7.7 0 0 0 0 .99l3.5 3.5A.7.7 0 0 0 11 8.7V6.466C13.24 6.466 15 8.226 15 10.466s-1.76 4-4 4a4.015 4.015 0 0 1-3.66-2.466.75.75 0 0 0-1.373.6A5.515 5.515 0 0 0 11 15.966c3.038 0 5.5-2.462 5.5-5.5s-2.462-5.5-5.5-5.5z"/></svg>
                         </div>
                         <div className="w-full flex items-center text-[10px] text-gray-400 space-x-2">
                             <span>0:00</span>
                             <div className="flex-grow h-1 bg-gray-600 rounded-full flex items-center group cursor-pointer">
                                 <div className="w-1/3 h-full bg-white group-hover:bg-[#1db954] rounded-full"></div>
                                 <div className="w-3 h-3 bg-white rounded-full -ml-1.5 opacity-0 group-hover:opacity-100 shadow-lg"></div>
                             </div>
                             <span>3:45</span>
                         </div>
                    </div>

                    <div className="w-1/3 flex justify-end items-center space-x-3">
                         <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M12.996 8L10 10.996V8.5H1v-1h9V5.004L12.996 8zm.004-3.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z"/></svg>
                         <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 16 16" fill="currentColor"><path d="M13 2.5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10a.5.5 0 0 1 .5-.5zM0 4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm1.5 0v8a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5z"/></svg>
                         <div className="flex items-center group w-24">
                             <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer mr-2" viewBox="0 0 16 16" fill="currentColor"><path d="M12.944 0c-1.398 0-2.586 1.071-2.923 2.434l-.014.057L9.41 4.75a.25.25 0 0 1-.41 0L8.4 2.49l-.014-.057C8.049 1.07 6.861 0 5.464 0 3.827 0 2.5 1.327 2.5 2.964c0 1.25.772 2.316 1.859 2.742l.063.023L3.15 8.134a.25.25 0 0 1-.41 0L2.144 6.77l-.014-.057C1.792 5.349.605 4.278-.792 4.278c-1.637 0-2.964 1.327-2.964 2.964 0 1.25.772 2.316 1.859 2.742l.063.023-1.272 2.405a.25.25 0 0 1-.41 0L-4.4 11.05a5.5 5.5 0 1 1 7.8 0l-.544.544a4.75 4.75 0 1 0-6.712 0l.544-.544a6.25 6.25 0 1 1 8.838 0l-.544.544a7 7 0 1 0-9.9 0l.544-.544a8.5 8.5 0 1 1 12.02 0l-.544.544a9.25 9.25 0 1 0-13.081 0l.544-.544z"/></svg>
                             <div className="flex-grow h-1 bg-gray-600 rounded-full flex items-center cursor-pointer">
                                 <div className="w-2/3 h-full bg-white group-hover:bg-[#1db954] rounded-full"></div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const displaySpotify = () => {
    return <Spotify />;
}
