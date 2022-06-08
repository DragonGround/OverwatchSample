![Overwatch UI in Unity](/resources/res.jpg?raw=true "Overwatch UI in Unity")

This sample code is meant for [OneJS](https://onejs.com) users. Video Demo: https://vimeo.com/718225603

NOTE: The lightning texture sheet used in the video cannot be freely distributed. So a different but free (and still good looking!) version is included for this repo.

## Step-by-step Setup

* Extract this repo to /Addons/OverwatchSample (under your project's persistentDataPath)
* Under root (your project's persistentDataPath), make a `index.tsx` file like below:

```ts
import { render, h } from "preact"
import Overwatch from "OverwatchSample"
import { update } from "tweenjs/tween"

render(<Overwatch />, document.body)

function animate(time) {
    requestAnimationFrame(animate)
    update(time)
}
requestAnimationFrame(animate)
```

* Open `persistentDataPath` with VSCode and run the `tsc: watch` task (Ctrl + Shift + B)
* In Unity, drag a ScriptEngine prefab onto the scene.
* Import the included `CharacterManager.cs` file into Unity and drag the MonoBehaviour onto a scene.
* Then include `CharacterManager` into the Objects list under ScriptEngine's INTEROP; name it to `charman`
* Make sure Live Reload's entry script is set to `index.js`.
* Hit Play and you should be all set

_Everytime you checkout a new OneJS version (from the private repo or Asset Store), make sure you also update your ScriptLib folder. You can do so by deleting the old one, a new one will be automatically created upon running ScriptEngine. This step will be automated in the future._