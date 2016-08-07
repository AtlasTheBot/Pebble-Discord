var currentVersion = '0.1';
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Settings = require('settings');

var fontSize = Settings.option('fontSize'); //guess
if (fontSize === undefined) fontSize = 0;
var fontSizeName = ['small', 'large', 'mono', 'classic-small', 'classic-large'];

function menuServers() {
	var menu = new UI.Menu({
		sections: [{
			title: 'Your Servers',
			items: [{
				id: '120330239996854274',
				title: '/r/Undertale',
				subtitle: '* - 1 mention',
			}, {
				id: '81384788765712384',
				title: 'Discord API',
				subtitle: '* New messages',
			}]
		}]
	});

	menu.on('select', function(e) {
		menuChannels(e.item.id);
	});
	
	menu.on('longSelect', function(e) {
		showMenu({type: 'friends', title: 'Friend status/DMs', subtitle: 'Maybe?'});
	});
	
	menu.show();
}

function menuChannels(serverID) {
	var menu = new UI.Menu({
		sections: [{
			title: '/r/Undertale - Text Channels',
			items: [{
				id: '128997354450714624',
				title: '#flowerbed',
				subtitle: 'Welcome to the Undertale Discord server!',
			}, {
				id: '120330239996854274',
				title: '#newhome',
				subtitle: '* - General discussion, on topic or off.',
			}]
		}]
	});

	menu.on('select', function(e) {
		messages(serverID, e.item.id);
	});
	
	menu.on('longSelect', function(e) {
		showMenu({type: 'server', title: '/r/Undertale', subtitle: '1600 Members'});
	});

	menu.show();
}

function messages(serverID, channelID) {
		var menu = new UI.Menu({
		sections: [{
			title: '#flowerbed',
			items: [{
				id: '211722322099437568',
				timestamp: '1470550175018',
				title: 'Nate The Lever (Atlas)',
				subtitle: '>Flipped Cursor',
			}, {
				id: '120330239996854274',
				timestamp: '1470550175020',
				title: 'RoadCrosser',
				subtitle: '@Nate The Lever (Atlas) (╯°□°）╯︵ ┻━┻',
			}]
		}]
	});
	
	menu.on('select', function(e) {
		showMessage(e.item.title, e.item.subtitle, e.item.timestamp);
	});
	
	menu.on('longSelect', function(e) {
		showMenu({type: 'channel', title: '#flowerbed', subtitle: 'Welcome to the Undertale Discord server!'});
	});

	menu.show();
}

function showMessage(user, content, timestamp) {
		var card = new UI.Card({
			title: user,
			subtitle: (timestamp !== '-1' ? convertTimestamp(timestamp) : ''),
			body: content,
			scrollable: true,
			style: fontSizeName[fontSize]
	});
	card.show();
}

function menuSettings() {
		console.log('Settings Loading');

		var menu = new UI.Menu({
			sections: [{
				title: 'You!',
				items: [{
					id: 0,
					title: 'Nate#2564',
				}]
			}, {
				title: 'Display',
				items :[{
					id: 1,
					title: 'Font Size',
					subtitle: capitalize(fontSizeName[fontSize]),
				}]
			}, {
				title: 'Discord v' + currentVersion
			}, {
				title: 'by Atlas#2564'
			}]
		});

		menu.on('select', function(e) {
			if (e.item.id === 1) {
				fontSize++;
				if (fontSize > fontSizeName.length - 1) fontSize = 0;
				Settings.option('fontSize', fontSize);
				menu.item(e.sectionIndex, e.itemIndex, {
					subtitle: capitalize(fontSizeName[fontSize])
				});
			}
		});

		//Show menu
		menu.show();
		console.log('Settings Loaded');
	}

function showMenu(topItem) {
			var menu = new UI.Menu({
		sections: [{
			title: capitalize(topItem.type),
			items: [{
				id: '-2',
				title: topItem.title,
				subtitle: topItem.subtitle
			}]
		}, {
			title: 'You!',
			items: [{
				id: '-1',
				title: 'Nate#2564',
				subtitle: 'Select for settings'
			}]
		}]
	});
	
	menu.on('select', function(e) {
		if(e.item.id === '-1') {
			menuSettings();
		} else if(e.item.id === '-2') {
			showMessage(e.item.title, e.item.subtitle, '-1'); //lazy woo
		}
	});

	menu.show();
}

menuServers(); //Start it up!

// Helper Functions
function capitalize(str) { //I'm lazy!
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertTimestamp(timestamp) {
	if (typeof timestamp === 'string') timestamp = parseInt(timestamp, 10);
	var d = new Date(timestamp);
	return padStart(d.getDate()    , 2, '0') + '/' +
		     padStart(d.getMonth()+1 , 2, '0') + '/' +
		     padStart(d.getFullYear(), 2, '0') + ' ' +
		     padStart(d.getHours()   , 2, '0') + ':' +
		     padStart(d.getMinutes() , 2, '0');
}

function padStart(str, length, fill) {
	if (typeof str === 'number') str += ''; //this works
	if (fill === undefined || fill === '') fill = ' ';
	
	while (str.length < length) {
		str = fill + str;
	}
	
	return str;
}
