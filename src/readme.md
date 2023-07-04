#####
1. Install Node Module using `npm Install`
2. Go inside the project repository
3. Run `npm start`

### Project Description
1. POST /register: Register a new user.

```
Payload: {
    fullName: Test,
    email: test@abc.com,
    password: test,
    preferences: ['test1', 'test2']
}
```

2. POST /login: Log in a user.

```
Payload: {
    email: test@abc.com,
    password: test,
}
```

3. GET /preferences: Retrieve the news preferences for the logged-in user.
```
headers: {
    authorization: token,
}
response: {
    preferences: ['test1', 'test2']
}
```
4. PUT /preferences: Update the news preferences for the logged-in user.
```
headers: {
    authorization: token,
}
payload: {
    preferences: ['test3']
}
```

5. GET /news: Fetch news articles based on the logged-in user's preferences.
```
headers: {
    authorization: token,
}
```