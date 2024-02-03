import { useEventfulState } from "onejs"
import { Dom } from "OneJS/Dom"
import { namedColor } from "onejs/utils/color-parser"
import { h } from "preact"
import { useRef, useEffect, useState } from "preact/hooks"
import { Color, Vector2 } from "UnityEngine"
import { MeshGenerationContext, Angle, ArcDirection, Painter2D } from "UnityEngine/UIElements"
import { CharacterManager } from "./charman"
import { customFont, lightningTexture } from "./preloads"

const shakeData = [
    { t: { x: 1, y: 1 }, r: 0 },
    { t: { x: -1, y: -2 }, r: -1 },
    { t: { x: -3, y: 0 }, r: 1 },
    { t: { x: 3, y: 2 }, r: 0 },
    { t: { x: 1, y: -1 }, r: 1 },
    { t: { x: -1, y: 2 }, r: -1 },
    { t: { x: -3, y: 1 }, r: 0 },
    { t: { x: 3, y: 1 }, r: -1 },
    { t: { x: -1, y: -1 }, r: 1 },
    { t: { x: 1, y: 2 }, r: 0 },
    { t: { x: 1, y: -2 }, r: -1 },
]

let shakeIndex = 0
let shakeId = 0

let defaultFont

const RadialProgress = ({ radius, progress }: { radius: number, progress: number }) => {
    const ref = useRef<Dom>();
    const [inited, setInited] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            defaultFont = (document.body as any as Dom).ve.resolvedStyle.unityFontDefinition
            setInited(true)
            ref.current.ve.generateVisualContent = onGenerateVisualContent
            ref.current.ve.MarkDirtyRepaint()
        })
    }, [])

    useEffect(() => {
        ref.current.ve.generateVisualContent = onGenerateVisualContent
        ref.current.ve.MarkDirtyRepaint()
        if (progress == 1)
            shake()
        else
            clearTimeout(shakeId)
    }, [progress])

    function shake() {
        ref.current.style.translate = { x: shakeData[shakeIndex].t.x * 0.5, y: shakeData[shakeIndex].t.y * 0.5 }
        ref.current.style.rotate = shakeData[shakeIndex].r
        // if (shakeIndex == shakeData.length - 1)
        //     return
        shakeIndex = shakeIndex >= shakeData.length - 1 ? 0 : shakeIndex + 1
        shakeId = setTimeout(shake, 100)
    }

    function onGenerateVisualContent(mgc: MeshGenerationContext) {
        var paint2D = mgc.painter2D

        paint2D.strokeColor = new Color(1, 1, 1, 0.1);
        paint2D.lineWidth = radius * 0.2;
        paint2D.BeginPath();
        paint2D.Arc(new Vector2(radius, radius), radius * 0.80, new Angle(0), new Angle(360), ArcDirection.Clockwise);
        paint2D.Stroke();
        paint2D.ClosePath();
        paint2D.strokeColor = namedColor("aquamarine");
        paint2D.lineWidth = radius * 0.2;
        paint2D.BeginPath();
        if (progress > 0) {
            paint2D.Arc(new Vector2(radius, radius), radius * 0.80, new Angle(-90), new Angle(progress * 360 - 90.0001), ArcDirection.Clockwise);
            paint2D.Stroke();
            paint2D.ClosePath();
        }
    }

    return (
        <div class="text-white" style={{ width: radius * 2, height: radius * 2 }}>
            <div ref={ref} class="absolute w-full h-full justify-center items-center rounded-full border-[1px] border-[#FFFFFF44]">
                <div class="justify-center items-center bg-[#FFFFFF20] rounded-full" style={{ width: radius * 1.2, height: radius * 1.2 }}>
                    <div class="justify-center items-center bg-[#00000033] rounded-full" style={{ width: radius * 0.9, height: radius * 0.9 }}>
                        {progress == 1 ? <div class="bold" style={{ fontSize: radius * 0.8, unityFontDefinition: customFont }}>&#xE803;</div> : <div class="bold" style={{ fontSize: radius * 0.3, unityFontDefinition: defaultFont }}>{Math.round(progress * 100)}</div>}
                    </div>
                </div>
            </div>
            {progress == 1 ? <flipbook class="absolute w-full h-full" src={lightningTexture} num-per-row={8} count={64} interval={0.025} random-rotation={true} style={{ width: radius * 4, height: radius * 4, top: -radius, left: -radius }} /> : null}
        </div>
    )
}

export const UltMeter = () => {
    var charman = require("charman") as CharacterManager

    const [ult, setUlt] = useEventfulState(charman, "UltMeter")

    return (
        <RadialProgress radius={64} progress={ult} />
    )
}