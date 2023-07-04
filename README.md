# Timestamps
**Generate timestamps for YouTube live streams while you are streaming. Once you finish your live stream, just copy & paste the timestamps to description of your YouTube video.**

You can use Elgato Stream Deck, Bitfocus Companion and H2R Graphics to automate your workflow. For example, create lower third with H2R Graphics which name is e.g. "Men's semifinal, heat 1" (I have been using for sports events). Then you create a button in Companion which triggers the lower third and creation of the new timestamp. This way you create automagically timestamps for your stream.

![alt text](https://github.com/proalvo/timestamps/blob/main/images/timestamps.png?raw=true)

## Pros
- Very lightweight application
- Network based architecture so no need run Companion and Timestamps in the same computer.
- Does not require much technical knowdledge
- Supports multiple platforms (disclaimer: I have tested only on Windows 10)
- Feel free to copy & improve the software

## Cons
- Need to understand how to setup your environment with Bitfocus Companion - but actually it is very simple.
- Be careful to not to use the port which is already used by some other application.

## Installation and running the application
- Download Node.js from https://nodejs.org/ and install it
- Download timestamps.zip from here and extract files to any directory you wish
- Open a console and start the application with command "node timestamps.js"
  
## Workflow
- Start Node.js with command ```node timestamps.js```
- open https://localhost:8080/
- In Bitfocus Companion, add a new connection. Use "Generic http" to create the connection.
  - Label: `Timestamp`
  - Base URL: `http://127.0.0.1:8080/api/`
 
![alt text](https://github.com/proalvo/timestamps/blob/main/images/companion-http-connection.png?raw=true)
    
- Add buttons for different sections of your show

![alt text](https://github.com/proalvo/timestamps/blob/main/images/companion-press-action.png?raw=true)

When you create a button in Companion, add a text you want to add to timestamp e.g. "Men's semifinals, heat 1". Only "start" is reserved keyword, you should use it when you start streaming. It sets timer to zero (0).
