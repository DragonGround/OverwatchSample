export interface CharacterManager {
    UltMeter: number
    Health: number
    MaxHealth: number
    SkillOneReady: Date
    SkillTwoReady: Date
    SkillOneCooldown: float
    SkillTwoCooldown: float

    OnUltMeterChanged: OneJS.Event<(val: number) => void>
    add_OnUltMeterChanged(handler: (val: number) => void): void
    remove_OnUltMeterChanged(handler: (val: number) => void): void

    OnHealthChanged: OneJS.Event<(val: number) => void>
    add_OnHealthChanged(handler: (val: number) => void): void
    remove_OnHealthChanged(handler: (val: number) => void): void

    OnMaxHealthChanged: OneJS.Event<(val: number) => void>
    add_OnMaxHealthChanged(handler: (val: number) => void): void
    remove_OnMaxHealthChanged(handler: (val: number) => void): void

    OnSkillOneReadyChanged: OneJS.Event<(val: Date) => void>
    add_OnSkillOneReadyChanged(handler: (val: Date) => void): void
    remove_OnSkillOneReadyChanged(handler: (val: Date) => void): void

    OnSkillTwoReadyChanged: OneJS.Event<(val: Date) => void>
    add_OnSkillTwoReadyChanged(handler: (val: Date) => void): void
    remove_OnSkillTwoReadyChanged(handler: (val: Date) => void): void
}