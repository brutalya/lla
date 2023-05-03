const { Configuration, OpenAIApi } = require('openai');

//make a config
const configuration = new Configuration({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

//make a bot
const openai = new OpenAIApi(configuration);

export const generateBotResponse = async (message) => {
	const completion = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content: message }],
		temperature: 0.7,
	});
	console.log('completion:', completion);
	console.log('response:', completion.data.choices[0].message.content);
	return completion.data.choices[0].message.content;
};
