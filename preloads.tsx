import { ImageLoader, FontLoader } from "OneJS/Utils"

export const lightningTexture = ImageLoader.Load(__dirname + "/resources/lightning.png")
export const customFont = FontLoader.LoadDefinition(__dirname + "/resources/my-custom-font.ttf")