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

        let error = false;

        if (name.length === 0) {
            $("#sender-name").val('');
            $("#sender-name").attr("placeholder", "Name must not be Empty!");
            error = true;
        }

        if (message.length === 0) {
            $("#sender-message").val('');
            $("#sender-message").attr("placeholder", "Message must not be Empty!");
            error = true;
        }
        if (error) return;

        this.setState({ sending: true, status: null, errorMessage: "" });

        // Use EmailJS if keys are available, otherwise fallback to our API
        const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID || "service_qt4ryip";
        const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID || "template_2ni69n8";
        const userID = process.env.NEXT_PUBLIC_USER_ID || "user_Do31sKneP4eYfn5n1nLTD";

        try {
            // First try EmailJS (works on both GH Pages and Vercel)
            const result = await emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: name,
                    user_name: name,
                    reply_to: name,
                    to_name: "Parth Arora",
                    subject: subject,
                    message: message,
                },
                userID
            );

            if (result.status === 200) {
                this.setState({ sending: false, status: 'success' });
                setTimeout(() => {
                    $("#close-gedit").trigger("click");
                }, 2000);
            } else {
                throw new Error(`EmailJS failed with status: ${result.status}`);
            }
        } catch (err) {
            console.warn("EmailJS failed, falling back to API:", err);
            
            // Fallback to our local API route (works on Vercel)
            try {
                const response = await fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, subject, message }),
                });

                const data = await response.json();

                if (response.ok) {
                    this.setState({ sending: false, status: 'success' });
                    setTimeout(() => {
                        $("#close-gedit").trigger("click");
                    }, 2000);
                } else {
                    throw new Error(data.message || data.error || 'Fallback API failed');
                }
            } catch (fallbackErr) {
                console.error('All sending methods failed:', fallbackErr);
                this.setState({ 
                    sending: false, 
                    status: 'error',
                    errorMessage: fallbackErr.message || "Unknown error occurred"
                });
            }
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
                        <div onClick={this.sendMessage} className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer">Send</div>
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
                            <span className="text-xl font-bold text-white">Message Sent!</span>
                            <span className="text-sm mt-2">Closing window...</span>
                        </div>
                    )
                }
                {
                    this.state.status === 'error' && (
                        <div className="flex flex-col justify-center items-center h-full w-full bg-red-600 bg-opacity-90 absolute top-0 left-0 z-50 animateShow px-4 text-center">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <span className="text-xl font-bold text-white">Failed to Send</span>
                            <span className="text-xs mt-2 text-gray-200 max-w-xs break-words">{this.state.errorMessage}</span>
                            <button onClick={() => this.setState({ status: null })} className="mt-4 px-4 py-1 bg-white text-red-600 rounded-sm font-bold hover:bg-opacity-90 transition-colors">Try Again</button>
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



