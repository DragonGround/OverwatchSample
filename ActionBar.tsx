import { Dom } from "OneJS/Dom"
import { h } from "preact"
import { useRef } from "preact/hooks"
import { useEffect, useState } from "preact/hooks"
import { CharacterManager } from "./charman"
import { customFont } from "./preloads"

const Slot = ({ iconChar, ready, duration }: { iconChar: string, ready: Date, duration: number }) => {
    const ref = useRef<Dom>()

    const [isOnCD, setIsOnCD] = useState(false)
    const [cdLeft, setCDLeft] = useState(duration)

    useEffect(() => {
        if (ready.getTime() < Date.now())
            return
        setIsOnCD(true)
        setTimeout(() => {
            setIsOnCD(false)
        }, duration * 1000)

        let left = Math.floor(duration)
        const countDown = () => {
            left--
            setCDLeft(left)
            if (left > 0) {
                setTimeout(countDown, 1000)
            }
        }
        countDown()
    }, [ready])

    return <div>
        <div class="w-16 h-16 rounded-md mr-4 text-4xl text-[#000000AA] overflow-hidden justify-center items-center border-white border-[1px]" style={{ unityFontDefinition: customFont, color: isOnCD ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.7)", backgroundColor: isOnCD ? "rgba(200,200,200,0.6)" : "rgba(255,255,255,0.7)" }}>
            <div ref={ref} class="w-full h-full absolute bg-[#7FFFD4BB] " style={{ transitionProperty: isOnCD ? ["top"] : [], transitionDuration: [duration], transitionTimingFunction: ["Linear"], top: isOnCD ? 0 : 64 }}></div>
            <div>{iconChar}</div>
            {isOnCD ? <div class="w-full h-full absolute text-white justify-center items-center bold whitespace-nowrap" style={{ textShadow: { offset: [0, 0], blurRadius: 2, color: "black" } }}>{cdLeft}</div> : null}
        </div>
    </div>

}

export const ActionBar = () => {
    var charman = require("charman") as CharacterManager

    const [s1, setS1] = useState(charman.SkillOneReady)
    const [s2, setS2] = useState(charman.SkillTwoReady)

    useEffect(() => {
        charman.add_OnSkillOneReadyChanged(onSkillOneReadyChanged)
        charman.add_OnSkillTwoReadyChanged(onSkillTwoReadyChanged)

        function CleanUp() {
            charman.remove_OnSkillOneReadyChanged(onSkillOneReadyChanged)
            charman.remove_OnSkillTwoReadyChanged(onSkillTwoReadyChanged)
        }
        onEngineReload(CleanUp)
        return CleanUp
    }, [])

    function onSkillOneReadyChanged(v: Date): void {
        setS1(v)
    }

    function onSkillTwoReadyChanged(v: Date): void {
        setS2(v)
    }

    return <div class="w-[544px] flex-row justify-end mb-10 pr-10">
        <Slot iconChar="\uE806" ready={s1} duration={charman.SkillOneCooldown} />
        <Slot iconChar="\uE805" ready={s2} duration={charman.SkillTwoCooldown} />
        <div class="w-40 h-16 text-5xl items-center flex-row justify-around text-[#FFFFFFBB] border-t-[1px] border-b-[1px] border-[#FFFFFFBB]" style={{ unityFontDefinition: customFont }}>
            <div>{"\uE804"}</div>
            <div class="bold flex flex-row whitespace-nowrap text-3xl top-[-1px]">3/5</div>
        </div>
    </div>

}