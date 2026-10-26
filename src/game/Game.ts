import { Application, Assets, Sprite, Texture } from 'pixi.js'
import { BASE_HEIGHT, BASE_WIDTH } from '../constant'

const ASSET_ROOT = '/assets/tonghua'

// 启动阶段需要预加载的图片资源（按资源目录分组）
const PRELOAD_IMAGES: Record<string, string[]> = {
  part0: ['hand', 'loading-hand', 'loading', 'music-on', 'title'],
  part1: ['biao', 'talk', 'zhen1', 'zhen2']
}

export class Game {
  private readonly app: Application

  constructor(container: HTMLElement) {
    this.app = new Application()

    this.app
      .init({
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        background: 0xffffff,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        // autoDensity: true,
        preference: 'webgl'
      })
      .then(async () => {
        container.appendChild(this.app.canvas as HTMLCanvasElement)
        await this.showLoading()
        await this.preloadImages()
      })
      .catch(() => {
        console.error('PixiJS 初始化失败')
        container.innerHTML = '<pre style="color:#f66;padding:16px">PixiJS 初始化失败，请查看控制台</pre>'
      })
  }

  // 在背景中央显示 loading 图
  private async showLoading(): Promise<void> {
    const texture = await Assets.load<Texture>(`${ASSET_ROOT}/part0/loading.png`)
    const loading = new Sprite(texture)

    loading.scale.set(0.6)
    loading.anchor.set(0.5)
    loading.position.set(this.app.screen.width / 2, this.app.screen.height / 2)
    this.app.stage.addChild(loading)
  }

  // 预加载 part0、part1 的图片资源
  private async preloadImages(): Promise<void> {
    const tasks = Object.entries(PRELOAD_IMAGES).flatMap(([part, names]) =>
      names.map((name) => Assets.load(`${ASSET_ROOT}/${part}/${name}.png`))
    )

    await Promise.all(tasks)
  }
}
