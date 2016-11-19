# Charlie (random message service)
### TL;DR

Just send your messages to our messages service. Someone will pop your message only once and may have fun with that :B

```
GET /

returns a random message sent by a random person in a random time

POST /
payload: {message: randomMessage}

stores a random message in our random database to be randomly popped by other random user
```
