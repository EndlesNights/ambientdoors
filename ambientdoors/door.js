var superwall_id = '';
var mod = "ambientdoors"; // our mod scope & name

let ambDoorData = {
	openPath: "modules/ambientdoors/defaultSounds/DoorOpenSound.wav",
	openLevel: 0.8,
	closePath: "modules/ambientdoors/defaultSounds/DoorCloseSound.wav",
	closeLevel: 0.8,
	lockPath: "modules/ambientdoors/defaultSounds/DoorLockSound.wav",
	lockLevel: 0.8,
	unlockPath: "modules/ambientdoors/defaultSounds/DoorUnLockSound.wav",
	unlockLevel: 0.8
};

Hooks.on("preUpdateWall", async (scene, object, updateData,userID) => {
	
	if(object.door == 0 || updateData.ds == null)
	{
		return;
	}

	let playpath = "";
	let playVolume = 0.8;
	
	if(object.ds == 2) // Door Unlocking
	{
		playpath = object.flags.ambientdoors.doorData.unlockPath;
		playVolume = object.flags.ambientdoors.doorData.unlockLevel;
	}
	else if(updateData.ds == 0) //Door Close
	{
		playpath = object.flags.ambientdoors.doorData.closePath;
		playVolume = object.flags.ambientdoors.doorData.closeLevel;
	}
	else if(updateData.ds == 1) //Door Open
	{
		playpath = object.flags.ambientdoors.doorData.openPath;
		playVolume = object.flags.ambientdoors.doorData.openLevel;
	}
	else if(updateData.ds == 2) // Door Lock
	{
		playpath = object.flags.ambientdoors.doorData.lockPath;
		playVolume = object.flags.ambientdoors.doorData.lockLevel;
	}
	
	if(playpath != "" && playpath != null)
	{
		AudioHelper.play({src: playpath, volume: playVolume, autoplay: true, loop: false}, true);
	}
});

Hooks.on('createWall', async (scene,object,updateData,userID) => {
	
	console.log(userID);
	
	console.log(scene);
	superwall_id = object._id;
	wall = await canvas.walls.get(superwall_id);
	wall.setFlag(mod,"doorData", ambDoorData);
	wall.update(wall.data);
});


Hooks.on("renderWallConfig", (app, html, data) => {

	if(data.object.door == 0) // if it's not a door don't worry
	{
		app.setPosition({
		height: 270,
		width: 400
		});
		return;
	}
	
	app.setPosition({
		height: 460,
		width: 520
	});

	let thisDoor;
	
	if(app.object.getFlag(mod, "doorData") == null)
	{
		app.object.setFlag(mod, "doorData", ambDoorData);
	}
	else
	{
		thisDoor = app.object.getFlag(mod, "doorData");
	}
	
	var closeFlag = thisDoor.closePath;
	var openFlag = thisDoor.openPath;
	var lockFlag = thisDoor.lockPath;
	var unLockFlag = thisDoor.unlockPath;
	
	
	const message =`
	<div class="form-group">
		<label>Door Sound Effects</label>
		<p class="notes"> Pathway to the soundeffect that will be played whenever a door is entering that state. Leave blank for no sound effect. </p>
	</div>
	
    <div class="form-group">
		<label>Door Close</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.doorData.closePath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.closePath" value="${closeFlag ? closeFlag : ``}" placeholder="Door Close Sound Path" data-dtype="String" />
		</div>
	</div>
	
    <div class="form-group">
		<label>Door Open</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.doorData.openPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.openPath" value="${openFlag ? openFlag : ``}" placeholder="Door Open Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Door Lock</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.doorData.lockPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.lockPath" value="${lockFlag ? lockFlag : ``}" placeholder="Door Lock Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Door Unlock</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.doorData.unlockPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.doorData.unlockPath" value="${unLockFlag ? unLockFlag : ``}" placeholder="Door Unlock Sound Path" data-dtype="String" />
		</div>
	</div>
	`
	
	html.find(".form-group").last().after(message);
	const button = html.find('button[data-target="flags.ambientdoors.doorData.closePath"]')[0];
	const button2 = html.find('button[data-target="flags.ambientdoors.doorData.openPath"]')[0];
	const button3 = html.find('button[data-target="flags.ambientdoors.doorData.lockPath"]')[0];
	const button4 = html.find('button[data-target="flags.ambientdoors.doorData.unlockPath"]')[0];
	
	app._activateFilePicker(button);
	app._activateFilePicker(button2);
	app._activateFilePicker(button3);
	app._activateFilePicker(button4);
});
