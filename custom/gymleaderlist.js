var uninstalled = false;
var fs = require('fs');
var request;
var fileExists = true;
try {
	request = require('request');
} catch (err) {
	uninstalled = true;
}

var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/gymleaders.json'));

exports.commands = {

 
 
        sgl: 'setgymleader',
        setgymleader: function(target, room, user){
        	if (!this.can('makeroom')) return;
        	if (!target) return this.sendReply('The proper syntax is /setgymleader [type], [user] - Adds user to GL list');
        	var targetsArray = target.split(',');
        	target0 = targetsArray[0];
        	target1 = targetsArray[1];
        	this.sendReply(target1 + ' has now been set as ' + target0 + ' Gym Leader.');
        	gymleaderlist[target0] = target1;
        	fs.writeFile('storage-files/gymleaders.json', JSON.stringify(gymleaderlist));
        	return;
        },
   
 
 
        vgl: 'viewgymleaders',
        viewgymleaders: function(name, target, user) {
        	if (!this.canBroadcast()) return;
        	var glList = '<center><table><tr><td><b>Type</b></td><td><b>Gym Leader<b></td><td><b>Last Seen</b></td></tr><br/>';
        	for (gl in gymleaderlist){
                var lastSeen = this.lastSeen(toId(a[gl]));
                var targetsArray = lastSeen.split(',');
                lastSeen = targetsArray[0] +' ago';
                if (Users.get(toId(gymleaderlist[gl]))) {
                if (Users.get(toId(gymleaderlist[gl])).connected) {
                	var lastSeen = '<font color = "green"> online.</font>';
            	}
        	}
            // Need to find a better way to fetch Type icons.
            glList += '<tr><td>' + '<img src="http://yggdrasilleague.no-ip.org:25565/avatars/Types/'+gl.toString()+'.png">' + '</td>' + '<td>' + gymleaderlist[gl] + ': ' + '</td>' + '<td>' + lastSeen + '</td>' + '</tr>';
        	}
        	this.sendReplyBox(glList+'</table>');
        }
        
};