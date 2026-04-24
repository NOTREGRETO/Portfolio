import React, { Component } from 'react';
import $ from 'jquery';
import ReactGA from 'react-ga4';
import emailjs from '@emailjs/browser';

export class Gedit extends Component {

    constructor() {
        super();
        this.state = {
            sending: false,
            status: null, // null, 'success', 'error'
            errorMessage: "",
        }
    }

    sendMessage = async () => {
        let name = $("#sender-name").val();
        let subject = $("#sender-subject").val();
        let message = $("#sender-message").val();

        name = name.trim();
        subject = subject.trim();
        message = message.trim();

        if (name.length === 0 || message.length === 0) {
            if (name.length === 0) {
                $("#sender-name").val('').attr("placeholder", "Name must not be Empty!");
            }
            if (message.length === 0) {
                $("#sender-message").val('').attr("placeholder", "Message must not be Empty!");
            }
            return;
        }

        this.setState({ sending: true, status: null, errorMessage: "" });

        // EmailJS credentials - hardcoded as reliable defaults
        const serviceID = "service_qt4ryip";
        const templateID = "template_2ni69n8";
        const userID = "user_Do31sKneP4eYfn5n1nLTD";

        try {
            // Initialize EmailJS with public key
            emailjs.init(userID);

            // Send via EmailJS (works on any hosting - static or server)
            const timestamp = new Date().toLocaleString('en-IN', { 
                dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' 
            });
            const formattedMessage = [
                `Dear Parth Arora,`,
                ``,
                `You have received a new inquiry through your portfolio website.`,
                ``,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `📧 From: ${name}`,
                `📋 Subject: ${subject || 'General Inquiry'}`,
                `🕐 Received: ${timestamp}`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                ``,
                `Message:`,
                `${message}`,
                ``,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `This message was sent via ParthAroraTSC Portfolio`,
                `https://partharoratsc.github.io`,
            ].join('\n');

            const result = await emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: name,
                    user_name: name,
                    reply_to: name.includes('@') ? name : undefined,
                    subject: `🔔 Portfolio Inquiry: ${subject || 'General Inquiry'}`,
                    message: formattedMessage,
                    to_name: "Parth Arora",
                }
            );

            if (result.status === 200) {
                this.setState({ sending: false, status: 'success' });
                setTimeout(() => {
                    $("#close-gedit").trigger("click");
                }, 2000);
            } else {
                throw new Error(`EmailJS returned status ${result.status}`);
            }
        } catch (emailjsErr) {
            console.error("EmailJS Error:", emailjsErr);

            // Only try API fallback if we're on a server-rendered deployment (not static GitHub Pages)
            const isServerDeployment = typeof window !== 'undefined' && 
                !window.location.hostname.includes('github.io');

            if (isServerDeployment) {
                try {
                    const response = await fetch('/api/sendEmail', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, subject, message }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        this.setState({ sending: false, status: 'success' });
                        setTimeout(() => {
                            $("#close-gedit").trigger("click");
                        }, 2000);
                        return;
                    } else {
                        throw new Error(data.message || "Server error");
                    }
                } catch (apiErr) {
                    console.error("API fallback also failed:", apiErr);
                }
            }

            // If we reach here, all methods failed
            const errorText = emailjsErr?.text || emailjsErr?.message || "Unknown error";
            this.setState({ 
                sending: false, 
                status: 'error', 
                errorMessage: `EmailJS: ${errorText}`
            });
        }

        ReactGA.event({
            category: "Send Message",
            action: `${name}, ${subject}, ${message}`
        });
    }

    render() {
        return (
            <div className="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none">
                <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
                    <span className="font-bold ml-2">Send a Message to Me</span>
                    <div className="flex">
                        <div onClick={this.sendMessage} className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer transition-colors">Send</div>
                    </div>
                </div>
                <div className="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
                    <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
                    <div className="relative">
                        <input id="sender-name" className=" w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none font-medium text-sm pl-6 py-0.5 bg-transparent" placeholder="Your Email / Name :" spellCheck="false" autoComplete="off" type="text" />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold light text-sm text-ubt-gedit-blue">1</span>
                    </div>
                    <div className="relative">
                        <input id="sender-subject" className=" w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light gedit-subject outline-none text-sm font-normal pl-6 py-0.5 bg-transparent" placeholder="subject (may be a feedback for this website!)" spellCheck="false" autoComplete="off" type="text" />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold  text-sm text-ubt-gedit-blue">2</span>
                    </div>
                    <div className="relative flex-grow">
                        <textarea id="sender-message" className=" w-full gedit-message font-light text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent" placeholder="Message" spellCheck="false" autoComplete="none" type="text" />
                        <span className="absolute left-1 top-1 font-bold  text-sm text-ubt-gedit-blue">3</span>
                    </div>
                </div>
                {
                    this.state.sending && (
                        <div className="flex justify-center items-center h-full w-full bg-gray-400 bg-opacity-30 absolute top-0 left-0 z-50">
                            <img className="w-8 animate-spin" src="./themes/Yaru/status/process-working-symbolic.svg" alt="Ubuntu Process Symbol" />
                        </div>
                    )
                }
                {
                    this.state.status === 'success' && (
                        <div className="flex flex-col justify-center items-center h-full w-full bg-green-600 bg-opacity-90 absolute top-0 left-0 z-50 animateShow">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span className="text-xl font-bold text-white uppercase tracking-tighter">Message Sent!</span>
                            <span className="text-sm mt-2 font-light">Closing window...</span>
                        </div>
                    )
                }
                {
                    this.state.status === 'error' && (
                        <div className="flex flex-col justify-center items-center h-full w-full bg-red-600 bg-opacity-95 absolute top-0 left-0 z-50 animateShow px-6 text-center">
                            <svg className="w-16 h-16 mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <span className="text-xl font-bold text-white uppercase tracking-tighter">Failed to Send</span>
                            <span className="text-xs mt-3 text-gray-100 max-w-xs break-words font-medium bg-black bg-opacity-20 p-2 rounded">{this.state.errorMessage}</span>
                            <button onClick={() => this.setState({ status: null })} className="mt-6 px-6 py-2 bg-white text-red-600 rounded font-bold hover:bg-gray-100 transition-colors shadow-lg">Try Again</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Gedit;

export const displayGedit = () => {
    return <Gedit> </Gedit>;
}




