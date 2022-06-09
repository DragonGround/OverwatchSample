export interface CharacterManager {
    UltMeter: number
    Health: number
    MaxHealth: number
    SkillOneReady: Date
    SkillTwoReady: Date
    SkillOneCooldown: float
    SkillTwoCooldown: float

    add_OnUltMeterChanged(handler: (val: number) => void): void
    remove_OnUltMeterChanged(handler: (val: number) => void): void

    add_OnHealthChanged(handler: (val: number) => void): void
    remove_OnHealthChanged(handler: (val: number) => void): void
    add_OnMaxHealthChanged(handler: (val: number) => void): void
    remove_OnMaxHealthChanged(handler: (val: number) => void): void

    add_OnSkillOneReadyChanged(handler: (val: Date) => void): void
    remove_OnSkillOneReadyChanged(handler: (val: Date) => void): void
    add_OnSkillTwoReadyChanged(handler: (val: Date) => void): void
    remove_OnSkillTwoReadyChanged(handler: (val: Date) => void): void
}