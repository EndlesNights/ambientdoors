## Ambient Doors

* **Author**: EndlesNights#9000
* **Version**: 2.3.2
* **Foundry VTT Compatibility**: v10
* **System Compatibility**: Universal

### Link(s) to Module
* [https://github.com/EndlesNights/ambientdoors](https://github.com/EndlesNights/ambientdoors)

### Description
Ambient Doors module for Foundry VTT - Adds easily customized sounds effects that trigger for all user when interacting with doors. Just open up a doors configeration window to initilize the set up for that door, and you'll be able to enter in the sound file pathways that you wish to play when that door; is opened, is closed, is locked, or is unlocked. If you do not wish for any sound effect to play when an certain action is taken, just leave that spesific field blank. Some default sounds have been provided.

## Installation
### Method 1
* Open the Foundry application and click **"Install Module"** in the **"Add-On Modules"** tab.
* Paste the following link: https://raw.githubusercontent.com/EndlesNights/ambientdoors/master/module.json
* Click "Install"
* Activate the module in your World using **Manage Modules** under the **Game Settings** tab.


## Change Log

**Version 2.3.2**
* Added libwrapped as a dependency, now uses libwrapped to wrap core function rather than manually overriding it, which may cause conflicts with other modules. 

**Version 2.3.2**
* Fixed an issue where door jingle sound effect would not play for other users.

**Version 2.3.1**
* Fixed an issue where sounds would not play if the Quiet Door hotkey was not set.

**Version 2.3.0**
* Updated to Foundry VTT v10

**Version 2.2.6**
* Updated to Foundry VTT v9

**Version 2.2.4**
* Update to Foundry VTT 0.8.6 Stable Release.

**Version 2.2.3**

* Doors sound Paths can now be set to "DefaultSound", that door will always use the default sounds that are currently set in the configation window. "DefaultSound" is now the default that all new configured doors are set to.

**Version 2.2.2**

* Fixed minnor issue where default values where not being set properly.

**Version 2.2.1**

* Issue where the default sounds where not being pulled propperly while doing jingle door check.
* Clean up code little

**Version 2.2.0**

* Update to Foundry VTT 0.7.9
* Added an option to custimize the lock jingle sound effect that plays when attempting to open a locked door.
* Lock jingle sound effect now players for everyone instead of just the user attempting to open the door.

**Version 2.1.0**

* Update to Foundry VTT 0.7.5
* Added Silent Door Open mode, with configurable permissions, if a valid user opens a door while holding down Alt, the doors audio will not play.

**Version 2.0.0**

Complete Internal rewrite
* Volume Levels can now be adjusted for each sound files.
* All doors should now have sound effects by default without having to open up the wall configation window.
* Added a Module settings were the Gamemaster can set the pathways for all default sound files, and volume levels.
* Fixed issue where sounds would not play properly after a client refresh.
* Fixed issue were sounds would play multiple times depending on number of client.

**Version 1.1.0**

Rezied the wall configuration window when editing doors so that all of the elements fit into the window without the user having to scroll.

**Version 1.0.0**

Inistial release version.
