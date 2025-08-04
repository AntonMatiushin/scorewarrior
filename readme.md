### How to run

- `yarn install`
- `yarn dev`

### OR
- `docker build -t scw .`
- `docker run -d --rm --name scw -p 3000:3000 scw`

Service is available on http://localhost:3000

try
`http://localhost:3000/config?appVersion=13.3.481&platform=android`


## Assumptions:

### Task requirements
- It was not clear from the task definition how do some response properties link to request params. So I did some of them configurable in .env, considering it is just static data. assets_urls and definitions_urls - we send all of them in every response by the same reason, it is not clear how do they link to app version from query params

### Data storage 
- Data sources are in JSON files. I did not use db assuming it is not very important in this task. It affected some parts (for example, repositories - we get all items at once instead of using some db-specific WHERE conditions)
- As an option we could consider loading all the data on startup. I do not expect millions of app versions, and I do not expect this kind of data will change often, so we could use in-memory storage for that instead of querying it from any data source. And we would implement reload by some event
- Also, we could use more efficient data structures (tree for example if we decide to store data in memory), or indexes (if we decide to query data from db) 
- I used in-memory cache assuming there is only one instance of this service. If we expect many replicas we should use for example shared Redis for caching

### Tests
- Tests are just illustrations :)
