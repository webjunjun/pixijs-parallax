import type { PartConfig } from '../type'

export const part15: PartConfig = {
  id: 15,
  name: '第十五场景',
  layers: [
    // 场景容器：linshi 构建 47680，但动画段立即钉为 47740（构建值从未生效）
    // 暂停效果 [47740,49740] x: 47740→49740（x=scrollPro，场景钉在屏幕上）
    {
      name: 'p15Cont', x: 47740, y: 0,
      anims: [{ range: [47740, 49740], prop: 'x', from: 47740, to: 49740 }],
      children: [
        // 最后一句话：横屏画布居中 x=(1040-261)/2≈390, y=(640-74)/2=283（相对容器）
        // 渐现 [48030,48240] 0→1，之后保持显示
        { name: 'talk', texture: 'part15/talk.png', x: 390, y: 283,
          anims: [
            { range: [48030, 48240], prop: 'alpha', from: 0, to: 1 },
          ] },
      ],
    },
  ],
}
