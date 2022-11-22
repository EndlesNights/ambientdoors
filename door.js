import { libWrapper } from './shim.js';

const mod = "ambientdoors"; //mod scope & name

//TODO
//Change Play to play ambient sound, add range value. If global range, play sound as is.

Hooks.once("init", () => {

	libWrapper.register(
		mod, "DoorControl.prototype._onMouseDown",
		function (wrapped, event) {

		//check to see if the door is locked, otherwise use normal handler
		if(this.wall.document.ds === CONST.WALL_DOOR_STATES.LOCKED) {
			// Call custom handler first. Only call the original handler to run if our new handler does not return ture
			const eventLockJingle = onDoorMouseDown.call(this, event)
			if (eventLockJingle) return;
		}
		return wrapped(event);
		},
		"MIXED",
	);
});

function onDoorMouseDown(event) {
	
	const doorData = this.wall.document.flags.ambientdoors?.doorData || defaultDoorData();
	const playpath = doorData.lockJinglePath === "DefaultSound"? game.settings.get(mod, "lockedDoorJinglePathDefault") : doorData.lockJinglePath;
	const playVolume = doorData.lockJingleLevel;
	
	if(playpath != "" && playpath != null) AudioHelper.play({src: playpath, volume: playVolume, autoplay: true, loop: false}, true);
	
	//return true here to block the normal handler wich will only play sound on a per player basis.
	return true;
}

//grab the default sounds from the config paths
function defaultDoorData() {
	return {
		closePath: game.settings.get(mod, "closeDoorPathDefault"),
		closeLevel: game.settings.get(mod, "closeDoorLevelDefault"),
		openPath: game.settings.get(mod, "openDoorPathDefault"),
		openLevel: game.settings.get(mod, "openDoorLevelDefault"),
		lockPath: game.settings.get(mod, "lockDoorPathDefault"),
		lockLevel: game.settings.get(mod, "lockDoorLevelDefault"),
		unlockPath: game.settings.get(mod, "unlockDoorPathDefault"),
		unlockLevel: game.settings.get(mod, "unlockDoorLevelDefault"),
		lockJinglePath: game.settings.get(mod, "lockedDoorJinglePathDefault"),
		lockJingleLevel: game.settings.get(mod, "lockedDoorJingleLevelDefault")
	}
}
Hooks.on("preUpdateWall", async (object, updateData, diff, userID) => {

	if(object.door == 0 || updateData.ds == null){ //Exit early if not a door OR door state not updating
		return;
	}

	const sneakyDoorBinding = game.keybindings.bindings.get(`${mod}.sneakyDoor`)[0];
	if(sneakyDoorBinding && game.users.find(x => x._id === userID ).role >= game.settings.get(mod, "stealthDoor") && game.keyboard.downKeys.has(sneakyDoorBinding.key)){ // Exit if Sneaky Door Opening Mode
		return;
	}	
	
	let doorData;
	try { doorData = object.flags.ambientdoors.doorData; } //If data is set us that
	catch(err) { doorData = defaultDoorData();} //If no data is set use default sounds.
	let playpath = "";
	let playVolume = 0.8;
	
	if(object.ds == 2) { // Door Unlocking
		playpath = doorData.unlockPath === "DefaultSound"? game.settings.get(mod, "unlockDoorPathDefault") : doorData.unlockPath;
		playVolume = doorData.unlockLevel;
	}
	else if(updateData.ds == 0) { //Door Close
		playpath = doorData.closePath === "DefaultSound"? game.settings.get(mod, "closeDoorPathDefault") : doorData.closePath;
		playVolume = doorData.closeLevel;
	}
	else if(updateData.ds == 1) {//Door Open
		playpath = doorData.openPath === "DefaultSound"? game.settings.get(mod, "openDoorPathDefault") : doorData.openPath;
		playVolume = doorData.openLevel;
	}
	else if(updateData.ds == 2) {// Door Lock
		playpath = doorData.lockPath === "DefaultSound"? game.settings.get(mod, "lockDoorPathDefault") : doorData.lockPath;
		playVolume = doorData.lockLevel;
	}
	
	if(playpath != "" && playpath != null) {
		AudioHelper.play({src: playpath, volume: playVolume, autoplay: true, loop: false}, true);
	}
	
});

Hooks.on("renderWallConfig", (app, html, data) => {

	if(data.object.door == 0) {// if it's not a door don't worry
		// app.setPosition({
		// height: 270,
		// width: 400
		// });
		return;
	}
	
	app.setPosition({
		height: 708,
		width: 520
	});

	let thisDoor;
	
	if(app.object.getFlag(mod, "doorData") == null) {
		// thisDoor = defaultDoorData();
		thisDoor = {
			closePath: "DefaultSound",
			closeLevel: game.settings.get(mod, "closeDoorLevelDefault"),
			openPath: "DefaultSound",
			openLevel: game.settings.get(mod, "openDoorLevelDefault"),
			lockPath: "DefaultSound",
			lockLevel: game.settings.get(mod, "lockDoorLevelDefault"),
			unlockPath: "DefaultSound",
			unlockLevel: game.settings.get(mod, "unlockDoorLevelDefault"),
			lockJinglePath: "DefaultSound",
			lockJingleLevel: game.settings.get(mod, "lockedDoorJingleLevelDefault")
		};
		app.object.setFlag(mod, "doorData", thisDoor);
	}
	else {
		thisDoor = app.object.getFlag(mod, "doorData");
	}

	let closeFlag = thisDoor.closePath;
	let openFlag = thisDoor.openPath;
	let lockFlag = thisDoor.lockPath;
	let unLockFlag = thisDoor.unlockPath;
	let lockJingleFlag = thisDoor.lockJinglePath;
	
	const message =`
	<div class="form-group">
		<label>Door Sound Effects</label>
		<p class="notes"> File pathway to the soundeffect that will be played whenever a doors state is changed. Leave the pathway blank, or turn the level to zero for no sound effect. </p>
	</div>
	
    <div class="form-group">
		<label>Door Close</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="audio" data-target="flags.ambientdoors.doorData.closePath" title="Browse Files" tabindex="-1" name="audio-picker">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.closePath" value="${closeFlag ? closeFlag : ``}" placeholder="Door Close Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Close Door Sound Level</label>
		<div class="form-fields">
			<input type="range" name="flags.ambientdoors.doorData.closeLevel" value=${thisDoor.closeLevel}  min=0 max=2 step=0.05 data-dtype="Number">
			<span class="range-value">${thisDoor.closeLevel}</span>
		</div>
	</div>	
	
    <div class="form-group">
		<label>Door Open</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="audio" data-target="flags.ambientdoors.doorData.openPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.openPath" value="${openFlag ? openFlag : ``}" placeholder="Door Open Sound Path" data-dtype="String" />
		</div>
	</div>

	<div class="form-group">
		<label>Open Door Sound Level</label>
		<div class="form-fields">
			<input type="range" name="flags.ambientdoors.doorData.openLevel" value=${thisDoor.openLevel}  min=0 max=2 step=0.05 data-dtype="Number">
			<span class="range-value">${thisDoor.openLevel}</span>
		</div>
	</div>	
	
	<div class="form-group">
		<label>Door Lock</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="audio" data-target="flags.ambientdoors.doorData.lockPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.lockPath" value="${lockFlag ? lockFlag : ``}" placeholder="Door Lock Sound Path" data-dtype="String" />
		</div>
	</div>

	<div class="form-group">
		<label>Lock Door Sound Level</label>
		<div class="form-fields">
			<input type="range" name="flags.ambientdoors.doorData.lockLevel" value=${thisDoor.lockLevel}  min=0 max=2 step=0.05 data-dtype="Number">
			<span class="range-value">${thisDoor.lockLevel}</span>
		</div>
	</div>	
	
	<div class="form-group">
		<label>Door Unlock</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="audio" data-target="flags.ambientdoors.doorData.unlockPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.unlockPath" value="${unLockFlag ? unLockFlag : ``}" placeholder="Door Unlock Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Unlock Door Sound Level</label>
		<div class="form-fields">
			<input type="range" name="flags.ambientdoors.doorData.unlockLevel" value=${thisDoor.unlockLevel}  min=0 max=2 step=0.05 data-dtype="Number">
			<span class="range-value">${thisDoor.unlockLevel}</span>
		</div>
	</div>
	
    <div class="form-group">
		<label>Locked Door Jingle</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="audio" data-target="flags.ambientdoors.doorData.lockJinglePath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.lockJinglePath" value="${lockJingleFlag ? lockJingleFlag : ``}" placeholder="Locked Door Jingle Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Locked Door Jingle Sound Level</label>
		<div class="form-fields">
			<input type="range" name="flags.ambientdoors.doorData.lockJingleLevel" value=${thisDoor.lockJingleLevel}  min=0 max=2 step=0.05 data-dtype="Number">
			<span class="range-value">${thisDoor.lockJingleLevel}</span>
		</div>
	</div>
	`

	html.find(".form-group").last().after(message);
	app.activateListeners(html);

});

Hooks.on("init", () => {
	game.settings.register(mod, "stealthDoor",{
		name: "Silent Door Permission Level",
        hint: "The required role permission level to use the silent door open/close feature. (Alt + Click the Door)",
		scope: "world",
		config: true,
		default: "2",
		choices: {1: "Player", 2: "Trusted", 3: "Assistant", 4: "Game Master"},
		type: String
	});

    game.settings.register(mod, "closeDoorPathDefault", {
        name: "Door Close",
        hint: "The default sound effect that will be played when a door is closed.",
        scope: 'world',
        config: true,
        default: "modules/ambientdoors/defaultSounds/DoorCloseSound.wav",
        type: String
    });

    game.settings.register(mod, "closeDoorLevelDefault", {
        name: "Close Door Volume Level",
        hint: "The default volume level that the close door SFX will be played at.",
        scope: 'world',
        config: true,
        default: 0.8,
        type: Number,
		range: {min:0, max:2, step:0.05}
    });

    game.settings.register(mod, "openDoorPathDefault", {
        name: "Door Open",
        hint: "The default sound effect that will be played when a door is opened.",
        scope: 'world',
        config: true,
        default: "modules/ambientdoors/defaultSounds/DoorOpenSound.wav",
        type: String
    });

    game.settings.register(mod, "openDoorLevelDefault", {
        name: "Open Door Volume Level",
        hint: "The default volume level that the open door SFX will be played at.",
        scope: 'world',
        config: true,
        default: 0.8,
        type: Number,
		range: {min:0, max:2, step:0.05}
    });

    game.settings.register(mod, "lockDoorPathDefault", {
        name: "Door Lock",
        hint: "The default sound effect that will be played when a door is locked.",
        scope: 'world',
        config: true,
        default: "modules/ambientdoors/defaultSounds/DoorLockSound.wav",
        type: String
    });

    game.settings.register(mod, "lockDoorLevelDefault", {
        name: "Close Lock Volume Level",
        hint: "The default volume level that the lock door SFX will be played at.",
        scope: 'world',
        config: true,
        default: 0.8,
        type: Number,
		range: {min:0, max:2, step:0.05}
    });
	
    game.settings.register(mod, "unlockDoorPathDefault", {
        name: "Door Unlock",
        hint: "The default sound effect that will be played when a door is unlocked.",
        scope: 'world',
        config: true,
        default: "modules/ambientdoors/defaultSounds/DoorUnlockSound.wav",
        type: String
    });

    game.settings.register(mod, "unlockDoorLevelDefault", {
        name: "Unlock Door Volume Level",
        hint: "The default volume level that the unlock door SFX will be played at.",
        scope: 'world',
        config: true,
        default: 0.8,
        type: Number,
		range: {min:0, max:2, step:0.05}
    });	
	
    game.settings.register(mod, "lockedDoorJinglePathDefault", {
        name: "Locked Door Jingle",
        hint: "The default sound effect that will be played when a locked door is attempted to be opened.",
        scope: 'world',
        config: true,
        default: "sounds/lock.wav",
        type: String
    });

    game.settings.register(mod, "lockedDoorJingleLevelDefault", {
        name: "Locked Door Jingle Volume Level",
        hint: "The default volume level that the unlock door SFX will be played at.",
        scope: 'world',
        config: true,
        default: 0.8,
        type: Number,
		range: {min:0, max:2, step:0.05}
    });

	game.keybindings.register(mod, "sneakyDoor", {
		name: "Quiet Door hotkey",
		hint: "Use this key when opening/closing or locking/unlocking a door ",
		editable: [
		  {
			key: "AltLeft"
		  }
		],
		precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
	});
});