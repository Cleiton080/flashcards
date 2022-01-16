// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// typeorm
const enviroment = {
	development: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
	},
}
const TYPEORM = enviroment[NODE_ENV]

export {
	NODE_ENV,
	TYPEORM,
}
