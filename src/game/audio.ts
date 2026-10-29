import { SOUNDS, type SoundConfig } from '../utils/sounds'

const AUDIO_ROOT = './assets/audio'

interface SoundInstance {
  cfg: SoundConfig
  audio: HTMLAudioElement | null // 懒创建：首次进入 trigger 区间才 new Audio
  flag: boolean // 同 pixi-sound 的 flag：进入区间播放后置 false，离开区间重置回 true
}

/** 滚动区间驱动的声音管理器（Pixi v8 无内置 sound，用 HTMLAudioElement 实现）
 *  语义对照 SoundConfig：trigger 区间播一次、fadeIn/fadeOut 线性音量、
 *  区间外暂停、musicOn 关闭时暂停一切 */
export class SoundManager {
  musicOn = true
  private readonly bgm = new Audio(`${AUDIO_ROOT}/bgm.mp3`)
  private readonly instances: SoundInstance[]
  private bgmStarted = false

  constructor() {
    this.bgm.loop = true
    this.instances = SOUNDS.map((cfg) => ({ cfg, audio: null, flag: true }))
    // 浏览器 autoplay 政策：bgm 需等首次用户手势；失败（如素材缺失）则下次手势再尝试
    window.addEventListener('pointerdown', () => this.resumeBgm())
  }

  // music 开关
  toggle(): boolean {
    this.musicOn = !this.musicOn
    if (this.musicOn) this.resumeBgm()
    else {
      this.bgm.pause()
      for (const { audio } of this.instances) audio?.pause()
    }
    return this.musicOn
  }

  /** 每帧调用，scrollPro 为设计稿像素 */
  update(scrollPro: number): void {
    for (const inst of this.instances) {
      const { trigger, fadeIn, fadeOut } = inst.cfg

      // 触发区间：进入播一次；区间之外重置 flag（回翻再进可重播）
      if (scrollPro > trigger[0] && scrollPro < trigger[1]) {
        if (this.musicOn && inst.flag && (!inst.audio || inst.audio.paused)) this.play(inst)
      } else {
        inst.flag = true
      }

      const audio = inst.audio
      if (!audio) continue
      const playing = !audio.paused

      // 音量渐显/渐隐（仅播放中调整）
      if (playing && scrollPro > fadeIn[0] && scrollPro < fadeIn[1]) {
        audio.volume = (scrollPro - fadeIn[0]) / (fadeIn[1] - fadeIn[0])
      }
      if (playing && fadeOut && scrollPro > fadeOut[0] && scrollPro < fadeOut[1]) {
        audio.volume = 1 - (scrollPro - fadeOut[0]) / (fadeOut[1] - fadeOut[0])
      }

      // 区间外暂停：fadeIn 之前、fadeOut 之后（无 fadeOut 则让声音自然播完）
      if (scrollPro > 1 && scrollPro < fadeIn[0]) audio.pause()
      if (fadeOut && scrollPro > fadeOut[1]) audio.pause()
    }
  }

  private resumeBgm(): void {
    if (!this.musicOn || this.bgmStarted) return
    this.bgm
      .play()
      .then(() => { this.bgmStarted = true })
      .catch(() => {
        // 素材缺失或被政策拦截，保持 bgmStarted=false 等待下次手势
      })
  }

  private play(inst: SoundInstance): void {
    if (!inst.audio) {
      const a = new Audio(`${AUDIO_ROOT}/${inst.cfg.file}`)
      a.loop = inst.cfg.loop ?? false
      a.addEventListener('ended', () => { a.currentTime = 0 }) // 重播从头开始
      inst.audio = a
    }
    inst.audio.volume = 1
    inst.flag = false
    inst.audio.play().catch(() => {
      // 素材缺失时静默跳过
    })
  }
}
