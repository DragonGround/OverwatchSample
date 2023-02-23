![Overwatch UI in Unity](/resources/res.jpg?raw=true "Overwatch UI in Unity")

This sample code is meant for [OneJS](https://onejs.com) users. Video Demo: https://vimeo.com/718225603

NOTE: The lightning texture sheet used in the video cannot be freely distributed. So a different but free (and still good looking!) version is included for this repo.

## Step-by-step Setup

* Extract this repo to `{ProjectDir}/OneJS/OverwatchSample`
* Open `{ProjectDir}/OneJS` with VSCode and run the `tsc: watch` task (Ctrl + Shift + B)
* In Unity, drag a ScriptEngine prefab onto the scene.
* Create an empty GameObject in scene and name it `charman`. Then, drag the included `CharacterManager.cs` onto it.
* Add `CharacterManager` to the Objects list under ScriptEngine's INTEROP; name it to `charman`. (Read the info box above the Objects list for tips on how to pick specific Objects)
* Set Live Reload's entry script to `OverwatchSample/index.js`.
* Hit Play and you should be all set