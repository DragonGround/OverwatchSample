import { useEventfulState } from "onejs"
import { Dom } from "OneJS/Dom"
import { ImageLoader } from "OneJS/Utils"
import { h } from "preact"
import { forwardRef } from "preact/compact"
import { MutableRef, useState } from "preact/hooks"
import { useEffect, useRef } from "preact/hooks"
import { Easing, Tween } from "tweenjs/tween"
import { Color, Vector2 } from "UnityEngine"
import { MeshGenerationContext, LineJoin, LineCap, Painter2D } from "UnityEngine/UIElements"
import { CharacterManager } from "./charman"

/**
 * Note: This health bar here is a good example of how you'd want to approach
 * performance tuning (since using vector api every frame can be quite heavy).
 * 
 * Recommended workflow (for CPU-bound UI animation):
 * 
 * 1) Rapid prototype everything here in TS with states and dom re-renders.
 * 2) Identify areas where UI state change is very frequent (i.e. every frame) and 
 *    turn it into imperative code.
 * 3) If more performance is needed, convert the TS code into a custom VisualElement
 *    in C#.
 * 4) If even more performance is needed, consider pooling animations with bursted jobs.
 * 
 * For majority of UI code where state change is infrequent (not every frame), you can 
 * just stop at step 1). In this particular sample, we achieved acceptable desktop 
 * performance at step 2) after converting some declarative code into imperative. In 
 * practice, you'd want to go for step 3) for this kind of health bar animation.
 */

const Bar = forwardRef(({ }: {}, ref: MutableRef<Dom>) => {

    useEffect(() => {
        ref.current.ve.generateVisualContent = onGenerateVisualContent
        ref.current.ve.MarkDirtyRepaint()
    }, [])

    function onGenerateVisualContent(mgc: MeshGenerationContext) {
        let paint2D = mgc.painter2D

        let { health, maxHealth } = lerped

        let width = ref.current.ve.resolvedStyle.width
        let height = ref.current.ve.resolvedStyle.height

        let numSegments = Math.ceil(maxHealth / interval)
        let numGaps = numSegments - 1
        let intrinsicWidth = width - numGaps * (r + g + r)
        let fullSegmentWidth = intrinsicWidth / maxHealth * interval

        PaintBar(health, new Color(1, 1, 1))

        function PaintBar(hp: number, color: Color) {
            let ns = Math.ceil(hp / interval)   // Num Segments
            let nfs = Math.floor(hp / interval) // Num Full Segments
            let i = 0
            for (i = 0; i < nfs; i++) {
                paintSegment(paint2D, i * (fullSegmentWidth + (r + g + r)), fullSegmentWidth, height, color)
            }
            if (ns != nfs) {
                let lastSegmentWidth = ((hp % interval) / interval) * fullSegmentWidth
                paintSegment(paint2D, i * (fullSegmentWidth + (r + g + r)), lastSegmentWidth, height, color)
            }
        }
    }

    return (
        <div ref={ref} class="w-full h-full"></div>
    )
})

interface LerpedNums {
    maxHealth: number
    health: number
}

let lerped: LerpedNums
let tween: Tween<LerpedNums>

export const CharacterStats = () => {
    const barRef = useRef<Dom>()
    const healthRef = useRef<Dom>()
    const maxHealthRef = useRef<Dom>()

    var charman = require("charman") as CharacterManager

    const [health, setHealth] = useEventfulState(charman, "Health")
    const [maxHealth, setMaxHealth] = useEventfulState(charman, "MaxHealth")

    if (typeof lerped === "undefined")
        lerped = { health: charman.Health, maxHealth: charman.MaxHealth }

    useEffect(() => {
        if (typeof tween !== "undefined")
            tween.stop()
        let l = { health: lerped.health, maxHealth: lerped.maxHealth }
        tween = new Tween(l).to({ maxHealth, health }, 800)
            .easing(Easing.Quadratic.InOut).onUpdate(() => {
                lerped.health = l.health
                lerped.maxHealth = l.maxHealth
                barRef.current.ve.MarkDirtyRepaint()
                healthRef.current.ve[0].text = Math.round(l.health)
                maxHealthRef.current.ve[0].text = Math.round(l.maxHealth)
            }).start()
    }, [health, maxHealth])

    return (
        <div class="flex-row">
            <image class="w-40 h-40" image={ImageLoader.Load(__dirname + "/resources/portrait.png")} />
            <div class="flex-col">
                <div class="w-96 h-20 flex-row items-end text-xl bold text-white pb-1">
                    <div ref={healthRef} class="text-4xl" style={{ bottom: -6 }}>{Math.round(lerped.health)}</div>
                    <div class="text-gray-200 px-1">&#47;</div>
                    <div ref={maxHealthRef} class="">{maxHealth}</div>
                </div>
                <div class="grow pt-2 pb-10">
                    <Bar ref={barRef} />
                </div>
            </div>
        </div>
    )
}

const r = 2 // rounded radius
const g = 2 // gap width
const shift = 4
const interval = 25

function paintSegment(paint2D: Painter2D, start: number, width: number, height: number, color: Color) {
    paint2D.strokeColor = color;
    paint2D.fillColor = color;
    paint2D.lineWidth = 4;
    paint2D.lineJoin = LineJoin.Round
    paint2D.lineCap = LineCap.Round
    paint2D.BeginPath()
    paint2D.MoveTo(new Vector2(start + shift, 0))
    paint2D.LineTo(new Vector2(start + width + shift, 0))
    paint2D.LineTo(new Vector2(start + width - shift, height))
    paint2D.LineTo(new Vector2(start - shift, height))
    paint2D.LineTo(new Vector2(start + shift, 0))
    paint2D.ClosePath();
    paint2D.Fill();
    paint2D.Stroke();
}