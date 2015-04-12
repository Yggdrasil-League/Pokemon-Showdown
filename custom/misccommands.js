var fs = require('fs');

exports.commands = {

/**********************
	Away Commands
**********************/

	sleeping: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⓈⓁⒺⒺⓅⒾⓃⒼ';
		var awayMessage = ' is now sleeping. Night!';
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	working: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⓌⓄⓇⓀⒾⓃⒼ';
		var awayMessage = ' is now working';
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	studying: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⓈⓉⓊⒹⓎⒾⓃⒼ';
		var awayMessage = ' is now studying.';
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	class: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒾⓃ ⒸⓁⒶⓈⓈ';
		var awayMessage = ' is now attending class.';
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	bath: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒷⒶⓉⒽⒾⓃⒼ';
		var awayMessage = ' is now taking a bath. No peeking!';
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	eating: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒺⒶⓉⒾⓃⒼ';
		var awayMessage = ' is now eating. *nom nom*';
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	fapping: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒻⒶⓅⓅⒾⓃⒼ';
		var awayMessage = " is now fapping because they can't get any.";
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	
	distracted: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒹⒾⓈⓉⓇⒶⒸⓉⒺⒹ';
		var awayMessage = " is now distracted (possibly with unicorns).";
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	anime: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒶⓃⒾⓂⒺ';
		var awayMessage = " is now watching anime.";
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	quacking: function (target, room, user, cmd) {
		if(toId(user) != 'adminrobo' && toId(user) !== 'profdrix') return this.sendReply('The command \'/quacking\' was unrecognized. To send a message starting with \'/quacking\', type \'//quacking\'.');
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⓆⓊⒶⒸⓀⒾⓃⒼ';
		var awayMessage = " has gone quacking mad.";
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	gone: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - ⒶⓌⒶⓎ';
		var awayMessage = " disappears.";
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	},
	
	cry: function (target, room, user, cmd) {
		if (user.blockChallenges) return this.sendReply("You are already blocking challenges!");
		user.blockChallenges = true;
		this.sendReply("You are now blocking all incoming challenge requests.");
		user.awayName = ' - Ⓒⓡⓨ Ⓑⓐⓑⓨ';
		var awayMessage = " is a whiny little brat who needs to man up.";
		var name = user.name + user.awayName;
		this.add('|html|<b>- <font color = #007bff>' + user.name + '</font></b>' + awayMessage);
		user.forceRename(name, undefined, true);
		
	}
};
