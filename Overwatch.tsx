import { h } from "preact"
import { CharacterStats } from "./CharacterStats"
import { UltMeter } from "./UltMeter"
import { ActionBar } from "./ActionBar"

const Overwatch = () => {
    return (
        <div class="w-full h-full flex-row bg-crop justify-between items-end py-20 px-20" style={{ backgroundImage: __dirname + "/resources/bg.jpg" }}>
            <CharacterStats />
            <UltMeter />
            <ActionBar />
        </div>
    )
}

export default Overwatch