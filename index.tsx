import { render, h } from "preact"
import Overwatch from "./Overwatch"
import { update } from "tweenjs"

render(<Overwatch />, document.body)

function animate(time) {
    requestAnimationFrame(animate)
    update(time)
}
requestAnimationFrame(animate)