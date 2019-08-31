1. What is the purpose of using _sessions_?

Sessions are commonly used to allow a server to store information about a
client. That information can then be used for a variety of purposes, one being
authentication / authorization.

2. What does bcrypt do to help us store passwords in a secure manner.

`bcrypt` uses an algorithm to encrypt passwords so that when we handle users'
passwords in our application, we never store them as plaintext.

3. What does bcrypt do to slow down attackers?

As stated above, `bcrypt` encrypts passwords. The result of using `bcrypt` is
a hash that is composed of three parts, all of which are used to decode the
hash into its plaintext counterpart.

4. What are the three parts of the JSON Web Token?

A JSON Web Token (JWT) is composed of the following three parts:

 - header: contains the algorithm with the token type
 - payload: information or any other data we’d like to store in the token
 - signature: used to verify the message wasn't changed along the way
