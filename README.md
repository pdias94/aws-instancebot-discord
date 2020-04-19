
# aws-instancebot-discord
A bot for start, stop and get current status with IP for AWS EC2 Instances on discord app (:

## How it works
The basic command which the bot will get from the messages sent in the chat is *!aws*. Then 3 basic commands it will check:

- start (starts EC2 instance)
- stop (stops EC2 instance)
- status (get EC2 instance status followed by it's public IP)

## Examples

### Start
Command: **!aws start**

Bot response: **Starting instance :monocle_face:**

### Stop
Command: **!aws stop**

Bot response: **Stopping instance :monocle_face:**

### Status
Command: **!aws status**

#### Status: running
Bot response: **Instance status: running (18.181.80.8) :smile:**

#### Status: stopped
Bot response: **Instance status: stopped :sleeping:**

#### Status: pending
Bot response: **Instance status:  pending :thinking:**

## Developer Area

### Starting the bot command to production
Run `npm run start` to start the bot in production

### Starting the bot command to development
Run `npm run dev` to start the bot in development with livereload
