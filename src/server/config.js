module.exports = {
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/movies',
	OMDbAPI: {
		url: 'http://www.omdbapi.com/',
		key: 'a4659645'
	}
};