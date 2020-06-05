Hooks.on("updateWall", (scene, wallData) => {
		
	if(wallData.door == 0 || wallData.ds == wallData.flags.ambientdoors.lastState)
		return;
	
	
	var playpath = "";
	
	if(wallData.flags.ambientdoors.lastState == 2) // Door Unlocking
	{
		playpath = wallData.flags.ambientdoors.unLockPath;
		wallData.flags.ambientdoors.lastState = 0;
	}
	else
	{
		if(wallData.ds == 0) //Door Close
			playpath = wallData.flags.ambientdoors.closePath; 
		if(wallData.ds == 1) //Door Open
			playpath = wallData.flags.ambientdoors.openPath; 
		if(wallData.ds == 2) // Door Lock
			playpath = wallData.flags.ambientdoors.lockPath;
			
		wallData.flags.ambientdoors.lastState = wallData.ds;		
	}
	
	if(playpath != "" && playpath != null)
	{
		AudioHelper.play({src: playpath, volume: 0.8, autoplay: true, loop: false}, true);
	}
});


Hooks.on("renderWallConfig", (app, html, data) => {
		
	if(data.object.door == 0) // if it's not a door don't worry
	{
		return;
	}

	var closeFlag = app.object.getFlag("ambientdoors", "closePath");
	var openFlag = app.object.getFlag("ambientdoors", "openPath");
	var lockFlag = app.object.getFlag("ambientdoors", "lockPath");
	var unLockFlag = app.object.getFlag("ambientdoors", "unLockPath");
	
	if(app.object.getFlag("ambientdoors", "lastState") == null)
	{		
		app.object.setFlag("ambientdoors", "lastState", data.object.ds);
	}
	if(app.object.getFlag("ambientdoors", "closePath") == null)
	{		
		app.object.setFlag("ambientdoors", "closePath", "modules/ambientdoors/defaultSounds/DoorCloseSound.wav");
		closeFlag = "modules/ambientdoors/defaultSounds/DoorCloseSound.wav";
	}
	if(app.object.getFlag("ambientdoors", "openPath") == null)
	{		
		app.object.setFlag("ambientdoors", "openPath", "modules/ambientdoors/defaultSounds/DoorOpenSound.wav");
		openFlag = "modules/ambientdoors/defaultSounds/DoorOpenSound.wav";
	}
	if(app.object.getFlag("ambientdoors", "lockPath") == null)
	{		
		app.object.setFlag("ambientdoors", "lockPath", "modules/ambientdoors/defaultSounds/DoorLockSound.wav");
		lockFlag = "modules/ambientdoors/defaultSounds/DoorLockSound.wav";
	}
	if(app.object.getFlag("ambientdoors", "unLockPath") == null)
	{		
		app.object.setFlag("ambientdoors", "unLockPath", "modules/ambientdoors/defaultSounds/DoorUnlockSound.wav");
		unLockFlag = "modules/ambientdoors/defaultSounds/DoorUnlockSound.wav";
	}

	
	const message =`
	<div class="form-group">
		<label>Door Sound Effects</label>
		<p class="notes"> Pathway to the soundeffect that will be played whenever a door is entering that state. Leave blank for no sound effect. </p>
	</div>
	
    <div class="form-group">
		<label>Door Close</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.closePath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.closePath" value="${closeFlag ? closeFlag : ``}" placeholder="Door Close Sound Path" data-dtype="String" />
		</div>
	</div>
	
    <div class="form-group">
		<label>Door Open</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.openPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.openPath" value="${openFlag ? openFlag : ``}" placeholder="Door Open Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Door Lock</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.lockPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.lockPath" value="${lockFlag ? lockFlag : ``}" placeholder="Door Lock Sound Path" data-dtype="String" />
		</div>
	</div>
	
	<div class="form-group">
		<label>Door Unlock</label>
		<div class="form-fields">
			<button type="button" class="file-picker" data-type="sound" data-target="flags.ambientdoors.unLockPath" title="Browse Files" tabindex="-1">
				<i class="fas fa-file-import fa-fw"></i>
			</button>
			<input class="sound" type="text" name="flags.ambientdoors.unLockPath" value="${unLockFlag ? unLockFlag : ``}" placeholder="Door Unlock Sound Path" data-dtype="String" />
		</div>
	</div>
	`
    
	html.find(".form-group").last().after(message);
	const button = html.find('button[data-target="flags.ambientdoors.closePath"]')[0];
	const button2 = html.find('button[data-target="flags.ambientdoors.openPath"]')[0];
	const button3 = html.find('button[data-target="flags.ambientdoors.lockPath"]')[0];
	const button4 = html.find('button[data-target="flags.ambientdoors.unLockPath"]')[0];
	
	app._activateFilePicker(button);
	app._activateFilePicker(button2);
	app._activateFilePicker(button3);
	app._activateFilePicker(button4);
});



