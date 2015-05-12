var fs = require('fs');


exports.commands = {

/***********************
	Set Gym Leader
***********************/

	sgl: 'setgymleader',
	setgymleader: function (target, room, user) {
		if (!this.can('makeroom')) return;
		if (!target) return this.sendReply('/setgymleader [league], [type], [user] - Adds user to GL list');
		var targetsArray = target.split(',');
		var target0 = targetsArray[0];
		var target1 = targetsArray[1];
		var target2 = targetsArray[2];
		if (path.existsSync(target0 + 'gymleaders.json')) { 
			var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/'+target0+'gymleaders.json'));
			gymleaderlist[target0] = target2;
  			fs.writeFile('storage-files/'+target0+'gymleaders.json', JSON.stringify(gymleaderlist));
		}else{
			var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/'+target0+'gymleaders.json'));
			gymleaderlist[target0] = target2;
			fs.writeFile('storage-files/'+target0+'gymleaders.json','{'+JSON.stringify(gymleaderlist)+'}');
		}
		this.sendReply(target2 + ' has now been set as ' + target1 + ' Gym Leader for ' + target0 + '.');
		
		return;
	},

	vgl: 'viewgymleaders',
	viewgymleaders: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if(!target) return this.sendReply ('/viewgymleaders [league] - Displays the list of Gym Leaders for selected league.');
		if (path.existsSync(target + 'gymleaders.json')) { 
  			var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/'+target+'gymleaders.json'));
		}else{
			return this.sendReply ('League doesn't exist or hasn't set up a Gym Leader list.');
		}
		
		var glList = '<center><table><tr><td><b>Type</b></td><td><b>Gym Leader<b></td><td><b>Last Seen</b></td></tr><br/>';
		for (type in gymleaderlist) {
			var lastSeen = dates.lastSeen(toId(gymleadrlist[type])).split(",")[0] + ' ago';
			if (Users.get(gymleaderlist[type]) && Users.get(toId(gymleaderlist[type])).connected) 
				lastSeen = '<font color = "green"> online.</font>';
			glList += '<tr><td>' + '<img src="http://yggdrasilleague.no-ip.org:25565/storage-files/Types/' + type + '.png">' + '</td>' + '<td>' + gymleaderlist[type] + ': ' + '</td>' + '<td>' + lastSeen + '</td>' + '</tr>';
		}
		this.sendReplyBox(glList + '</table>');
	}
};
