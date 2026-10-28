import type { PartConfig } from '../type'

export const part12: PartConfig = {
  id: 12,
  name: '第十二场景',
  layers: [
    // 场景容器：对应 linshi part12（position 43489,271 / pivot 3136,271）
    // 位移 [42900,43900] x 43489→44489；放大 [43200,44100] scale 1→3.2（pivot 点保持不动）；淡出 [43800,43900]
    // 遮罩容器与日期序列帧都是场景子节点，跟随场景位移/放大/淡出（与 linshi 一致）
    {
      name: 'sceneCont', x: 43489, y: 271, pivot: [3136, 271],
      anims: [
        { range: [42900, 43900], prop: 'x', from: 43489, to: 44489 },
        { range: [43200, 44100], prop: 'scaleX', from: 1, to: 3.2 },
        { range: [43200, 44100], prop: 'scaleY', from: 1, to: 3.2 },
        { range: [43800, 43900], prop: 'alpha', from: 1, to: 0 },
      ],
      children: [
        // 背景
        { name: 'bg', texture: 'part12/bg.png', x: 0, y: 0 },

        // 白色矩形（右侧留白）
        { name: 'bg2', x: 2085, y: 0, rect: { width: 789, height: 640, color: 0xffffff } },

        // 黑色块（被圆形遮罩揭示）
        { name: 'black', texture: 'part12/black.png', x: 1119, y: 0, maskRef: 'blackMask' },

        // 人物（局部 x 470→770，对应 linshi 620±150）
        { name: 'person', texture: 'part12/person.png', x: 470, y: 0,
          anims: [{ range: [39490, 41980], prop: 'x', from: 470, to: 770 }] },

        // 日期（静态）
        { name: 'date2', texture: 'part12/date.png', x: 666, y: 429 },

        // 黑色块圆形遮罩容器：pivot 与圆心重合，缩放时从圆心 (1043+3036, 320) 向外展开
        { name: 'blackMaskCont', x: 1043, y: 320, pivot: [3036, 320], scale: [0, 0],
          anims: [
            { range: [40748, 42900], prop: 'scaleX', from: 0, to: 1 },
            { range: [40748, 42900], prop: 'scaleY', from: 0, to: 1.2 },
          ],
          children: [
            { name: 'blackMask', circle: { radius: 3036, color: 0xffffff, alpha: 1.0 }, x: 3036, y: 320 },
          ],
        },

        // 对话文字
        { name: 'talk', texture: 'part12/talk.png', x: 1592, y: 333 },

        // 日期计数器：正放 [42900,43200] → 倒放 [43450,43700] → 之后隐藏（linshi gotoAndStop(12)）
        { name: 'dateCont', x: 2983, y: 0,
          children: [
            { name: 'dateUp', x: 0, y: 0,
              frameSeq: { prefix: 'part12/date', frames: 12, range: [42900, 43200] },
              anims: [{ range: [43700, 43701], prop: 'alpha', from: 1, to: 0 }] },
            { name: 'dateDown', x: 0, y: 0,
              frameSeq: { prefix: 'part12/date', frames: 12, range: [43450, 43700], reverse: true },
              anims: [
                { range: [43450, 43451], prop: 'alpha', from: 0, to: 1 },
                { range: [43700, 43701], prop: 'alpha', from: 1, to: 0 },
              ] },
          ],
        },
      ],
    },
  ],
}
