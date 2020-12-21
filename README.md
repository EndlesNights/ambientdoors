![](https://img.shields.io/badge/Foundry-v0.7.9-informational)
## Ambient Doors

* **Author**: EndlesNights#9000
* **Version**: 2.2.1
* **Foundry VTT Compatibility**: 0.6.0 to 0.7.9 (Havn't tried it with older versions)
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

### Method 2
Extract the query.zip file to the public/modules directory. Use the `Manage Modules` in your World on the Settings tab of the sidebar on the right and then enable the `Ambient Doors` module.


## Change Log

**Version 2.2.1**
*Issue where the default sounds where not being pulled propperly while doing jingle door check.
* Clean up code little

**Version 2.2.0**

*Update to Foundry VTT 0.7.9
*Added an option to custimize the lock jingle sound effect that plays when attempting to open a locked door.
*Lock jingle sound effect now players for everyone instead of just the user attempting to open the door.

**Version 2.1.0**

*Update to Foundry VTT 0.7.5
*Added Silent Door Open mode, with configurable permissions, if a valid user opens a door while holding down Alt, the doors audio will not play.

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
