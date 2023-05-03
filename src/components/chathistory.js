import React from 'react';
import './styles/ChatHistory.css';

function ChatHistory(props) {
	console.log(props);
	return (
		<div>
			{props.history.map((message, index) => (
				<div key={index} className={`message ${message.sender}`}>
					<p>{message.text}</p>
				</div>
			))}
		</div>
	);
}

export default ChatHistory;
