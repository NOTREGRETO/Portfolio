import React, { useState } from 'react';
import { reports } from '../../data/reports';

const Reports = () => {
    const [activeReport, setActiveReport] = useState(0);

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-[#252526] border-r border-[#333] flex flex-col">
                <div className="p-4 border-b border-[#333]">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Project Reports
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {reports.map((report, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveReport(index)}
                            className={`w-full p-4 text-left border-b border-[#333] transition-colors flex flex-col ${activeReport === index ? 'bg-[#37373d] border-l-4 border-blue-500' : 'hover:bg-[#2a2d2e]'}`}
                        >
                            <span className="text-sm font-medium">{report.title}</span>
                            <span className="text-xs text-gray-500 truncate mt-1">{report.fileName}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content (Viewer) */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header report={reports[activeReport]} />

                {/* Report Content Area */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#1a1a1a] flex justify-center">
                    <div className="w-full max-w-3xl bg-white text-black p-12 shadow-2xl min-h-[1000px] rounded-sm transform origin-top scale-95 transition-transform">
                        <div className="border-b-2 border-gray-800 pb-4 mb-8 flex justify-between items-end">
                            <div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900">{reports[activeReport].title}</h2>
                                <p className="text-sm text-gray-500 font-medium">Security Implementation & Analysis Report</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-gray-400 italic">ParthAroraTSC SECURITY LABS</p>
                                <p className="text-xs text-gray-400">Date: 2025-2026</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-justify leading-relaxed whitespace-pre-line">
                            {reports[activeReport].content}
                        </div>

                        <div className="mt-24 pt-8 border-t border-gray-100 flex justify-between items-center grayscale opacity-50">
                            <img src="https://img.icons8.com/ios-filled/50/000000/fingerprint.png" className="w-8 h-8" alt="security-seal" />
                            <p className="text-[10px] text-gray-400 tracking-widest font-bold">CONFIDENTIAL • CYBERSECURITY INFRASTRUCTURE REVIEW</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Header = ({ report }) => (
    <div className="p-4 bg-[#2d2d2d] flex justify-between items-center border-b border-[#333]">
        <div className="flex items-center">
            <div className="bg-red-500 rounded p-1 mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <div>
                <h1 className="text-lg font-bold">{report.title}</h1>
                <p className="text-xs text-gray-400">Cybersecurity Project Report • PDF View</p>
            </div>
        </div>
        <div className="flex space-x-2">
            <a 
                href={report.downloadLink} 
                download={report.fileName}
                className="p-2 hover:bg-[#3e3e42] rounded transition-colors text-gray-400 hover:text-white"
                title="Download Full Report"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </a>
            <button className="p-2 hover:bg-[#3e3e42] rounded transition-colors text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
        </div>
    </div>
);

export const displayReports = () => <Reports />;

export default Reports;
