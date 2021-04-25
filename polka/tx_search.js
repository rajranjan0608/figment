require('dotenv').config();
const axios = require('axios');

const main = async () => {
	const api = axios.create({
		baseURL: process.env.TX_SEARCH_URL,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	// 1. Get the last 5 transactions on Polkadot mainet
	try {
		const result = await api.post('/transactions_search', {
			network: 'polkadot',
			chain_id: 'mainnet',
			limit: 5,
		});

		console.log('5 last transactions: ', result.data);
	} catch (e) {
		console.log('Error getting 5 last transactions', e.message);
	}

	// 2. Get 5 last transactions for an address
	try {
		const result = await api.post('/transactions_search', {
			network: 'polkadot',
			chain_id: 'mainnet',
			limit: 5,
			account: [process.env.ADDRESS],
		});

		console.log('5 last transaction for my account: ', result.data);
	} catch (e) {
		console.log('Error getting 5 last transactions for account', e.message);
	}

	// 3. Get all staking transactions for an address
	try {
		const result = await api.post('/transactions_search', {
			network: 'polkadot',
			chain_id: 'mainnet',
			account: [process.env.ADDRESS],
			types: ['nominate', 'bonded', 'reward'],
		});

		console.log('Staking transactions: ', result.data);
	} catch (e) {
		console.log('Error getting staking transactions for my account', e.message);
	}

};

main().catch((err) => {
	console.error(err);
}).finally(() => process.exit());

