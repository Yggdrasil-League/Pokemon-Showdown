//This file should contain most of the important functions needed for doing stuff. Yeah.
var fs = require('fs');

//main stuff
var Core = exports.Core = {
	write: function (fileName, item, value, options, subItem) {
		//File SHOULD be a .JSON file. This is by far the best kind of file to store data in.
		if (fileName.substr(-4) !== 'json') return;
		if (!fs.existsSync(fileName)) fs.writeFileSync(fileName, '{}');
		var file = JSON.parse(fs.readFileSync(fileName));
		if (subItem) {
			if (!file[item]) file[item] = {};
			if (!options || !file[item].subItem) file[item].subItem = value;
			else if (options === '+') file[item].subItem += value;
			else if (options === '-') file[item].subItem -= value;
			else file[item].subItem = value;
		} else {
			if (!options || !file[item]) file[item] = value;
			else if (options === '+') file[item] += value;
			else if (options === '-') file[item] -= value;
			else file[item] = value;
		}
		fs.writeFileSync(fileName, JSON.stringify(file, null, 1));
	},
	read: function (fileName, item, subItem) {
		if (fileName.substr(-4) !== 'json' || !fs.existsSync(fileName)) return;
		var file = JSON.parse(fs.readFileSync(fileName));
		if (subItem) {
			if (file[item])
		return file[item];
	},
	setDate: function (user) {
		user = toId(user);
		var file = JSON.parse(fs.readFileSync('storage-files/dates.json'));
		if (!file[user]) file[user] = {};
		if (!file[user].totalOnline) file[user].totalOnline = 0;
		file[user].totalOnline += Date.now() - (file[user].lastSeen || 0);
		file[user].lastSeen = Date.now();
	},
	getLastSeen: function (user) {
		user = toId(user);
		var file = JSON.parse(fs.readFileSync('storage-files/dates.json'));
		if (!file[user]) return 'never';
		
		var format = function (target, word) {
			if (Math.floor(target) === 0) return '';
            if (Math.floor(target) !== 1) return target + ' ' + word + "s";
            return target + ' ' + word;
        }
		var rawDate = Date.now() - file[user].lastSeen;
		var seconds = Math.floor(rawDate / 1000);
		var mins = Math.floor(seconds / 60);
		var hours = Math.floor(mins / 60);
		var days = Math.floor(hours / 24);
		return format(days, 'day') + ', ' + format(hours % 24, 'hour') + ', ' + format(mins % 60, 'minute') + ', ' + format(seconds % 60, 'second');
	},
	getTotalOnline: function (user) {
		user = toId(user);
		var file = JSON.parse(fs.readFileSync('storage-files/dates.json'));
		if (!file[user]) return 'never';
		
		var format = function (target, word) {
			if (Math.floor(target) === 0) return '';
            if (Math.floor(target) !== 1) return target + ' ' + word + "s";
            return target + ' ' + word;
        }
		var rawDate = file[user].totalOnline;
		var seconds = Math.floor(rawDate / 1000);
		var mins = Math.floor(seconds / 60);
		var hours = Math.floor(mins / 60);
		var days = Math.floor(hours / 24);
		return format(days, 'day') + ', ' + format(hours % 24, 'hour') + ', ' + format(mins % 60, 'minute') + ', ' + format(seconds % 60, 'second');
	}
};

//Extra edits
Users.User.prototype.onDisconnect = function(connection) {
        if (this.named) Core.write('storage-files/lastseen.json', this.userid, Date.now()); 
        for (var i = 0; i < this.connections.length; i++) {
            if (this.connections[i] === connection) {
                // console.log('DISCONNECT: ' + this);
                if (this.connections.length <= 1) {
                    this.markInactive();
                    if (!this.authenticated) {
                        this.group = Config.groupsranking[0];
                        this.isStaff = false;
                    }
                }
                for (var j in connection.rooms) {
                    this.leaveRoom(connection.rooms[j], connection, true);
                }
                --this.ips[connection.ip];
                this.connections.splice(i, 1);
                break;
            }
        }
        if (!this.connections.length) {
            for (var i in this.roomCount) {
                if (this.roomCount[i] > 0) {
                    console.log('!! room miscount: ' + i + ' not left');
                    Rooms.get(i, 'lobby').onLeave(this);
                }
            }
            this.roomCount = {};
            if (!this.named && Object.isEmpty(this.prevNames)) {
                this.destroy();
            }
        }
    };
	
	Users.User.prototype.disconnectAll = function() {
        if (this.named) Core.write('storage-files/lastseen.json', this.userid, Date.now()); 
        for (var roomid in this.mutedRooms) {
            clearTimeout(this.mutedRooms[roomid]);
            delete this.mutedRooms[roomid];
        }
        this.clearChatQueue();
        var connection = null;
        this.markInactive();
        for (var i = 0; i < this.connections.length; i++) {
            connection = this.connections[i];
            for (var j in connection.rooms) {
                this.leaveRoom(connection.rooms[j], connection, true);
            }
            connection.destroy();
            --this.ips[connection.ip];
        }
        if (this.connections.length) {
            console.log('!! failed to drop all connections for ' + this);
            this.connections = [];
        }
        for (var i in this.roomCount) {
            if (this.roomCount[i] > 0) {
                console.log('!! room miscount: ' + i + ' not left');
                Rooms.get(i, 'lobby').onLeave(this);
            }
        }
        this.roomCount = {};
    };

    Rooms.GlobalRoom.prototype.onRename = function(user, oldid, joining) {
        if (user.named && toId(oldid) != toId(user)) Core.write('storage-files/lastseen.json', user.userid, Date.now()); 
        delete this.users[oldid];
        this.users[user.userid] = user;
        return user;
    };
	
	Users.User.prototype.hasSysopAccess = function() {
        //go ahead and add in a comma separated list of names in the array below. 
        //Remember, ONLY give Sysop access to people you absolutely trust.
        var systemOperators = ['siiilver', 'champinnah', 'onyxeagle', 'blakjack'];
        if (systemOperators.map(toId).indexOf(this) > -1) {
            return true;
        } else {
            return false;
        }
    };
	
	Users.prototype.chat = function (message, room, connection) {
		var now = new Date().getTime();

		if (message.substr(0, 16) === '/cmd userdetails') {
			// certain commands are exempt from the queue
			ResourceMonitor.activeIp = connection.ip;
			room.chat(this, message, connection);
			ResourceMonitor.activeIp = null;
			return false; // but end the loop here
		}
		
			if (message === 'staff') {
				return false;
			}
		
		if (this.chatQueueTimeout) {
			if (!this.chatQueue) this.chatQueue = []; // this should never happen
			if (this.chatQueue.length >= THROTTLE_BUFFER_LIMIT - 1) {
				connection.sendTo(room, '|raw|' +
					"<strong class=\"message-throttle-notice\">Your message was not sent because you've been typing too quickly.</strong>"
				);
				return false;
			} else {
				this.chatQueue.push([message, room, connection]);
			}
		} else if (now < this.lastChatMessage + THROTTLE_DELAY) {
			this.chatQueue = [[message, room, connection]];
			this.chatQueueTimeout = setTimeout(
				this.processChatQueue.bind(this), THROTTLE_DELAY);
		} else {
			this.lastChatMessage = now;
			ResourceMonitor.activeIp = connection.ip;
			room.chat(this, message, connection);
			ResourceMonitor.activeIp = null;
		}
	};
