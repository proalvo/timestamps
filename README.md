# Timestamps
**Generate timestamps for YouTube live streams while you are streaming. Once you finish your live stream, just copy & paste the timestamps to description of your YouTube video.**

You can use Elgato Stream Deck, [Bitfocus Companion](https://bitfocus.io/companion) and [H2R Graphics](https://h2r.graphics/) to automate your workflow. For example, create lower third with H2R Graphics which name is "Men's semifinal, heat 1". Then you create a button in Companion which triggers the lower third and creation of the new timestamp. This way you automagically create timestampsfor your stream.

User interface is mainly to copy the timestamps - timestamps are created through API calls from Companion. API call is simply `http://127.0.0.1:8080/api/<your optional text>`. To reset the timer use `http://127.0.0.1:8080/api/start` or press START button in user interface.

![User interface is very simple as content is created through the API](https://github.com/proalvo/timestamps/blob/main/images/timestamps.png)

## Pros
- Very lightweight application
- Network based architecture so no need run Companion and Timestamps in the same computer. **timestamps.js** has IP address 127.0.0.1 by default so you can run the app only on local computer. Change the IP address to your computer's IP address if you want to use it over the network.
- Does not require much technical knowdledge
- Supports multiple platforms 

## Installation and running the application

### Windows
- Download Node.js from https://nodejs.org/ and install it
- Download timestamps.zip from here and extract files to any directory you wish
- Start Node.js with command ```node timestamps.js```
### Linux (eg. Raspberry Pi)
- Install Node.js. Get suitable version from https://github.com/nodesource/distributions (select LTS version)
- Get timestamps app with
  ```
  git clone https://github.com/proalvo/timestamps.git
  cd timestamps
  node timestamps.js
  ```
### Continue setting up the timestamps app  
- open `https://127.0.0.1:8080/`
- In Bitfocus Companion, add a new connection. Use "Generic http" to create the connection.
  - Label: `timestamps`
  - Base URL: `http://127.0.0.1:8080/api/` 
 
![alt text](https://github.com/proalvo/timestamps/blob/main/images/companion-http-connection.png?raw=true)
    
- Add buttons for different sections of your show. Input your own text to URI field. You can combine triggering of lower thirds from H2R Graphics and timestamps to the same button.

![alt text](https://github.com/proalvo/timestamps/blob/main/images/companion-press-action.png?raw=true)

When you create a button in Companion, add a text you want to add to timestamp e.g. "Men's semifinals, heat 1". Only "**start**" is reserved keyword, you should use it when you start streaming. It sets timer to zero (0).
