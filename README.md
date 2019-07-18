# NodeJS Express API for log with Pino

Using pino with basic Nodejs Express API.

## How to use

### prepare
- install NodeJS

### package dependencies
- Express
- pino
- cors
- express-pino-logger
```
npm install --save
```

### run
```
node logger01.js
```
Service would listening 3000 port.

### Basic API Doing
- POST
 - /info


## log process
Recommend using logrotate. if log exist: /var/log/myapp.log, add the following to /etc/logrotate.d/myapp:
```
/var/log/myapp.log {
       daily
       rotate 7
       delaycompress
       compress
       notifempty
       missingok
       copytruncate
}
```

