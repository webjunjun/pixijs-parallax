import type { PartConfig } from '../type'

export const part0: PartConfig = {
  id: 0,
  name: '引导',
  layers: [
    { name: 'hand',  texture: 'part0/hand.png',  x: 540, y: 300,
      loop: { prop: 'x', from: 605, to: 475, duration: 1.5 },
      anims: [{ range: [0, 200], prop: 'alpha', from: 1, to: 0 }] },
    { name: 'title',  texture: 'part0/title.png',  x: 240, y: 240,
      anims: [{ range: [0, 200], prop: 'alpha', from: 1, to: 0 }] },
  ],
}
