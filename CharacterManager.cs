using System;
using System.Collections;
using UnityEngine;

namespace OverwatchSample {
    public class CharacterManager : MonoBehaviour {
        public float UltMeter {
            get { return _ultMeter; }
            set {
                _ultMeter = value;
                OnUltMeterChanged?.Invoke(_ultMeter);
            }
        }
        public float Health {
            get { return _health; }
            set {
                _health = value;
                OnHealthChanged?.Invoke(_health);
            }
        }
        public float MaxHealth {
            get { return _maxHealth; }
            set {
                _maxHealth = value;
                OnMaxHealthChanged?.Invoke(_maxHealth);
            }
        }

        public DateTime SkillOneReady {
            get { return _skillOneReady; }
            set {
                _skillOneReady = value;
                OnSkillOneReadyChanged?.Invoke(_skillOneReady);
            }
        }

        public DateTime SkillTwoReady {
            get { return _skillTwoReady; }
            set {
                _skillTwoReady = value;
                OnSkillTwoReadyChanged?.Invoke(_skillTwoReady);
            }
        }

        public float SkillOneCooldown => 10f;
        public float SkillTwoCooldown => 20f;

        public event Action<float> OnUltMeterChanged;
        public event Action<float> OnHealthChanged;
        public event Action<float> OnMaxHealthChanged;
        public event Action<DateTime> OnSkillOneReadyChanged;
        public event Action<DateTime> OnSkillTwoReadyChanged;

        float _ultMeter;
        float _health = 200f;
        float _maxHealth = 200f;
        DateTime _skillOneReady = DateTime.Now;
        DateTime _skillTwoReady = DateTime.Now;

        void Start() {
            StartCoroutine(ChangeUltMeterCo());
            StartCoroutine(ChangeHealthCo());
            StartCoroutine(ChangeSkillCooldonwsCo());
        }

        IEnumerator ChangeUltMeterCo() {
            while (true) {
                UltMeter = 0;
                yield return new WaitForSeconds(2f);
                for (var v = 0f; v < 1f; v += 0.005f) {
                    UltMeter = v;
                    yield return new WaitForSeconds(0.025f);
                }
                UltMeter = 1f;
                yield return new WaitForSeconds(6f);
            }
        }

        IEnumerator ChangeHealthCo() {
            while (true) {
                yield return new WaitForSeconds(3f);
                MaxHealth = 500f;
                Health = 500f;
                yield return new WaitForSeconds(2f);
                Health = 420f;
                yield return new WaitForSeconds(2f);
                Health = 277f;
                yield return new WaitForSeconds(2f);
                MaxHealth = 200f;
                Health = 200f;
            }
        }

        IEnumerator ChangeSkillCooldonwsCo() {
            while (true) {
                yield return new WaitForSeconds(2f);
                SkillOneReady = DateTime.Now + TimeSpan.FromSeconds(SkillOneCooldown);
                yield return new WaitForSeconds(3f);
                SkillTwoReady = DateTime.Now + TimeSpan.FromSeconds(SkillTwoCooldown);
                yield return new WaitForSeconds(10f);
                SkillOneReady = DateTime.Now + TimeSpan.FromSeconds(SkillOneCooldown);
                yield return new WaitForSeconds(12f);
            }
        }
    }
}