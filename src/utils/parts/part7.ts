import type { PartConfig } from '../type'

export const part7: PartConfig = {
  id: 7,
  name: '第七场景',
  layers: [
    {
      // 透过鱼嘴遮罩（part6 的 part7Mask，21000 放大 10 倍揭幕）显出人脸与雨人
      // 18805~21000 scale 0.3→1 + x 右移 2000，与 part6 放大同步；alpha 轨道起点钉住初始 0
      name: 'part7', x: 19419, y: 320, pivot: [0, 320], scale: [0.3, 0.3],
      maskRef: 'part7Mask',
      anims: [
        { range: [18780, 18790], prop: 'alpha', from: 0, to: 1 },
        { range: [18805, 21000], prop: 'scaleX', from: 0.3, to: 1 },
        { range: [18805, 21000], prop: 'scaleY', from: 0.3, to: 1 },
        { range: [18805, 21000], prop: 'x', from: 19419, to: 21419 },
      ],
      children: [
        // 鱼嘴窗口外的黑幕
        { name: 'bg1', rect: { width: 1590, height: 1920, color: 0x000000 }, x: -578, y: -640 },
        { name: 'bg', texture: 'part7/bg.png', x: 991, y: 0 },
        // 「放心去流浪吧」（跟随相机视差）
        { name: 'talk', texture: 'part7/talk.png', x: 200, y: 77,
          anims: [{ range: [18780, 22000], prop: 'x', from: 200, to: -200 }] },
        // 线（21000 起随鼻子右移滑出）
        { name: 'line', texture: 'part7/line.png', x: 191, y: 361,
          anims: [{ range: [21000, 22000], prop: 'x', from: 191, to: 711 }] },
        // 鼻子：被 biziMask 横窗裁剪，21000~22000 从窗口右移滑出
        { name: 'bizi', texture: 'part7/bizi.png', x: 276, y: 401, maskRef: 'biziMask',
          anims: [{ range: [21000, 22000], prop: 'x', from: 276, to: 826 }] },
        { name: 'biziMask', rect: { width: 650, height: 80, color: 0xffffff }, x: 270, y: 400 },
        { name: 'face', texture: 'part7/face.png', x: 876, y: 0 },
        { name: 'date', texture: 'part7/date.png', x: 3417, y: 450,
          anims: [{ range: [23450, 24960], prop: 'x', from: 3407, to: 3567 }] },
        // 小人组：21380~25080 容器下移，每人同贴图竖向三拷贝实现无限滚动，个体 y 视差
        {
          name: 'rain2Cont', x: 1327, y: -540,
          anims: [{ range: [21380, 25080], prop: 'y', from: -540, to: 900 }],
          children: [
            { name: 's1', x: 5, y: -50,
              anims: [{ range: [21380, 25080], prop: 'y', from: -50, to: 50 }],
              children: [
                { name: 's1a', texture: 'part7/s1.png', x: 0, y: 0 },
                { name: 's1b', texture: 'part7/s1.png', x: 0, y: -640 },
                { name: 's1c', texture: 'part7/s1.png', x: 0, y: -1280 },
              ] },
            { name: 's2', x: 0, y: 0,
              children: [
                { name: 's2a', texture: 'part7/s2.png', x: 0, y: 269 },
                { name: 's2b', texture: 'part7/s2.png', x: 0, y: -371 },
                { name: 's2c', texture: 'part7/s2.png', x: 0, y: -1011 },
              ] },
            { name: 's3', x: 0, y: 50,
              anims: [{ range: [21380, 25080], prop: 'y', from: 50, to: -50 }],
              children: [
                { name: 's3a', texture: 'part7/s3.png', x: 0, y: 0 },
                { name: 's3b', texture: 'part7/s3.png', x: 0, y: -640 },
                { name: 's3c', texture: 'part7/s3.png', x: 0, y: -1280 },
              ] },
          ],
        },
        // 大人组：容器下移更快，个体反向视差（B4 与其他相反）
        {
          name: 'rain1Cont', x: 1327, y: -640,
          anims: [{ range: [21380, 25080], prop: 'y', from: -640, to: 1280 }],
          children: [
            { name: 'b1', x: 18, y: 100,
              anims: [{ range: [21380, 25080], prop: 'y', from: 100, to: -100 }],
              children: [
                { name: 'b1a', texture: 'part7/b1.png', x: 0, y: 0 },
                { name: 'b1b', texture: 'part7/b1.png', x: 0, y: -640 },
                { name: 'b1c', texture: 'part7/b1.png', x: 0, y: -1280 },
              ] },
            { name: 'b2', x: 0, y: 200,
              anims: [{ range: [21380, 25080], prop: 'y', from: 200, to: -200 }],
              children: [
                { name: 'b2a', texture: 'part7/b2.png', x: 0, y: 0 },
                { name: 'b2b', texture: 'part7/b2.png', x: 0, y: -640 },
                { name: 'b2c', texture: 'part7/b2.png', x: 0, y: -1280 },
              ] },
            { name: 'b3', x: 1182, y: 300,
              anims: [{ range: [21380, 25080], prop: 'y', from: 300, to: -300 }],
              children: [
                { name: 'b3a', texture: 'part7/b3.png', x: 0, y: 48 },
                { name: 'b3b', texture: 'part7/b3.png', x: 0, y: -592 },
                { name: 'b3c', texture: 'part7/b3.png', x: 0, y: -1232 },
              ] },
            { name: 'b4', x: 206, y: -100,
              anims: [{ range: [21380, 25080], prop: 'y', from: -100, to: 100 }],
              children: [
                { name: 'b4a', texture: 'part7/b4.png', x: 0, y: 0 },
                { name: 'b4b', texture: 'part7/b4.png', x: 0, y: -640 },
                { name: 'b4c', texture: 'part7/b4.png', x: 0, y: -1280 },
              ] },
          ],
        },
        // 「你会看到 人来人往」
        { name: 'talk2', texture: 'part7/talk2.png', x: 2300, y: 72,
          anims: [{ range: [22300, 23950], prop: 'x', from: 2300, to: 2100 }] },
      ],
    },
  ],
}
