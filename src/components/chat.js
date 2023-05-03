import React, { useState } from 'react';
import ChatHistory from './chathistory';
import { generateBotResponse } from './openai';
import './styles/Chat.css';

function Chat() {
	const [history, setHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const inputRef = React.useRef(null);

	const handleButtonClick = React.useCallback(async (event) => {
		console.log('handleButtonClick');
		event.preventDefault();

		const message = inputRef.current.value.trim();

		if (!message) {
			return;
		}

		inputRef.current.value = '';

		setHistory((prevHistory) => [
			...prevHistory,
			{ sender: 'user', text: message },
		]);

		setIsLoading(true);

		try {
			let answer = await generateBotResponse(message);
			if (answer) {
				setHistory((prevHistory) => [
					...prevHistory,
					{ sender: 'bot', text: answer },
				]);
			}
		} catch (error) {
			if (error.response) {
				console.log(error.response.status);
				console.log(error.response.data);
			} else {
				console.log(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<div>
			<h1>Chatbot</h1>
			<ChatHistory history={history} isLoading={isLoading} />
			{isLoading && <div>Loading...</div>}
			<form>
				<label>
					<input type="text" ref={inputRef} />
					<button
						onClick={handleButtonClick}
						disabled={isLoading}
						className={isLoading ? 'disabled-button' : ''}
					>
						Send
					</button>
				</label>
			</form>
		</div>
	);
}

export default Chat;
