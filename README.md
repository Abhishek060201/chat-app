https://docs.google.com/document/d/1Bdkq2WvjT2LAWxmIg7s-M5za5W6FYq3qvGtQDAkQVxY/
Backend: https://github.com/Abhishek060201/chat-app-backend
######
Steps:
  ######
  Signup - Create user by taking information like username, email and password.
  ######
  Login - Only signed-up users will be able to login with their respective username and password.
  ######
  Join Room - As soon as user enters correct login credentials, a signed JWT token is sent to the client and upon entering the room-id the JWT token is returned to the server and is verified and after authentication the user is allowed to enter the room.
  ######
  Creating Server - Creating an http server with express, and passing it to the socket.io server for initial upgrade handshake. Then listen on the port 3001.
```
  const { Server } = require('socket.io')
  const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
  })
  server.listen(3001, () => console.log('SERVER RUNNING'));
```
Then set the the socket server to listen to the connection event.
  .on('connection', (socket) => {
  console.log(socket.id, 'has Connected')
  }
On the client side create a sendMessage function which would be called once the user enters a message and clicks the send button. (messageData is the message present in the input box).
```
  const sendMessage = async () => {
  await socket.emit('send_message', messsageData);
       setMessageList(list => [...list, messsageData]);

       //empty the chat-box input
       setCurrentMessage('');
  }
```  
On the server side listen to the ‘send_message’ and then broadcast it to the room the user has sent the message from. But before the we will verify the JWT token before the user connects to a room.
```
  io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token)  {
     jwt.verify(socket.handshake.query.token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
       if (err) return next(new Error('Authentication error'))
            socket.decoded = decoded
            next();
        });
    }
    else {
        next(new Error('Authentication error'))
    }
  })
```
Now we setup the mongoDB server to store the all the Users and the chats of each room.
```
  const url = process.env.ATLAS_URI

  mongoose.connect(url, (err) => {
  if (err) return console.log(err)
   console.log('Connected to Database')
  })

  const connection = mongoose.connection;
  Now create user and chat schema
  const url = process.env.ATLAS_URI

  mongoose.connect(url, (err) => {
   if (err) return console.log(err)
   console.log('Connected to Database')
  })
 
  const connection = mongoose.connection;
```
Now the server is configured.

Packages Used:
######
  Server side -
  ######
    Express 
    Mongoose
    Socket.io
    JSONWebtokens
    dotenv
  Client side -
  ######
    React
    Axios
    React-router-dom
    Socke.io-client


References:
######
  Socket-io - https://socket.io/docs/v4/ 
  ######
  RealTime Chat-App tutorial - https://youtu.be/NU-HfZY3ATQ
  ######
  How to implement JWT in websockets - https://stackoverflow.com/questions/36788831/authenticating-socket-io-connections-using-jwt
  ######
  MongoDB - 
  ```
  https://www.youtube.com/watch?v=ofme2o29ngU
  https://www.youtube.com/watch?v=DZBGEVgL2eE
  ```
  JWT - 
  ```
  https://www.youtube.com/watch?v=7Q17ubqLfaM
  https://www.youtube.com/watch?v=mbsmsi7l3r4
  ```
  NodeJs and ExpressJs - 
  ```
  https://www.youtube.com/watch?v=TlB_eWDSMt4
  https://youtu.be/L72fhGm1tfE
  ```
  


