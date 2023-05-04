import React from 'react';
import './styles/ChatHistory.css';

function ChatHistory(props) {
	console.log(props);
	return (
		<div class="messages">
			{props.history.map((message, index) => (
				<div key={index} className={`message ${message.sender}`}>
					<p>{message.text}</p>
					<span class="time">9:15 AM</span>
				</div>
			))}
		</div>
	);
}

export default ChatHistory;
