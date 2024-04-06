# BitSnip

BitSnip is a URL shortening service built with Node.js, Express, and MongoDB. It provides a simple and efficient way to shorten long URLs for easier sharing and management.

## Tech Stack

- Node.js
- Express
- MongoDB

## Installation

1. Clone the repository
2. Create an .env file as .env.example
3. Install dependencies with `npm install`
4. Start the server with `npm start`

## Usage

- Post `/url` - send original url in body to create a shortened url, return the urlId
- Get `/:urlId` - redirects to url
- Get `/url/analytics/:urlid` - returns the analytics data.

## Future Scope

In the future, a frontend will be developed for this service to provide a more user-friendly interface and additional features such as analytics.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

MIT
