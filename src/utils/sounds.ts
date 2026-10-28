/** 一个滚动区间驱动的声音（语义完全对照 linshi.js 声音段 L4905-5977）
 *  - trigger：进入区间时播放一次（离开区间后重置 flag，回翻再进区间可重播）
 *  - fadeIn：区间内音量 0→1 线性渐显；区间之前强制暂停
 *  - fadeOut：区间内音量 1→0 线性渐隐；区间之后强制暂停（缺省则让声音自然播完）
 *  - loop：循环播放（对应参考稿 sound.loop = true）
 */
export interface SoundConfig {
  name: string // 参考稿资源名（调试用）
  file: string // audio/ 下的文件名
  trigger: [number, number]
  fadeIn: [number, number]
  fadeOut?: [number, number]
  loop?: boolean
}

export const SOUNDS: SoundConfig[] = [
  // 滴答声（loop，开场怀表）
  { name: 'dida', file: 'dida.mp3', trigger: [110, 3900], fadeIn: [50, 110], fadeOut: [3900, 4100], loop: true },

  // 1 你说跳进兔子洞里 会邂逅一段奇妙之旅吗
  { name: 'nishuo1', file: '1nishuo.mp3', trigger: [2900, 3200], fadeIn: [2200, 2750], fadeOut: [4400, 5200] },

  // 2 好奇心总是驱使着我们去探索 即使犯错
  { name: 'haoqi2', file: '2haoqi.mp3', trigger: [6300, 6600], fadeIn: [4800, 5760], fadeOut: [6900, 7200] },

  // 树叶
  { name: 'shuye', file: 'shuye.mp3', trigger: [5500, 6500], fadeIn: [4700, 5500], fadeOut: [6600, 7700] },

  // 3 也许 是因为地球外的世界格外迷人
  { name: 'yexu3', file: '3yexu.mp3', trigger: [7270, 7650], fadeIn: [6700, 6950], fadeOut: [8250, 8800] },

  // 爆炸声
  { name: 'boom', file: 'boom.mp3', trigger: [8550, 8900], fadeIn: [7300, 7850], fadeOut: [9300, 9700] },

  // 4 无论如何
  { name: 'wulun4', file: '4wulun.mp3', trigger: [13800, 14000], fadeIn: [12700, 13000], fadeOut: [14300, 14600] },

  // 5 我都愿意跋涉
  { name: 'wodou5', file: '5wodou.mp3', trigger: [15690, 16270], fadeIn: [13700, 15400], fadeOut: [16580, 17100] },

  // 6 如果你还在犹豫
  { name: 'ruguo6', file: '6ruguo.mp3', trigger: [17530, 18000], fadeIn: [16666, 17250], fadeOut: [18400, 18800] },

  // 匹诺曹水泡（loop）
  { name: 'pao', file: 'pao.mp3', trigger: [18450, 18800], fadeIn: [18300, 18450], fadeOut: [19230, 20550], loop: true },

  // 7 放心去流浪吧
  { name: 'fangxin7', file: '7fangxin.mp3', trigger: [19800, 21000], fadeIn: [18700, 19340], fadeOut: [21600, 22500] },

  // 8 你会看到人来人往
  { name: 'nihui8', file: '8nihui.mp3', trigger: [22950, 23430], fadeIn: [22100, 22650], fadeOut: [23800, 24600] },

  // 9 会有人停下来
  { name: 'huiyou9', file: '9huiyou.mp3', trigger: [25330, 25800], fadeIn: [24180, 25000], fadeOut: [26170, 26480] },

  // 鸽子翅膀
  { name: 'ge1', file: 'ge1.mp3', trigger: [25200, 25760], fadeIn: [25000, 25200], fadeOut: [25760, 25980] },

  // 鸽子2
  { name: 'ge2', file: 'ge2.mp3', trigger: [25555, 26340], fadeIn: [26000, 26340], fadeOut: [26340, 27000] },

  // 10 你会看到
  { name: 'nihui10', file: '10nihui.mp3', trigger: [26688, 27200], fadeIn: [26100, 26400], fadeOut: [27680, 28170] },

  // 郑和海浪（loop）
  { name: 'wave', file: 'wave.mp3', trigger: [27560, 29100], fadeIn: [26600, 27000], fadeOut: [29300, 29570], loop: true },

  // 11 你是否还会用镜头
  { name: 'nishi11', file: '11nishi.mp3', trigger: [28760, 29560], fadeIn: [28000, 28500], fadeOut: [29700, 30200] },

  // 水滴
  { name: 'shui', file: 'shui.mp3', trigger: [30000, 30150], fadeIn: [29400, 29700], fadeOut: [30400, 30640] },

  // 口哨
  { name: 'koushao', file: 'koushao.mp3', trigger: [30400, 31600], fadeIn: [29800, 30000], fadeOut: [32680, 33000] },

  // 12 就算你已长大成熟
  { name: 'jiusuan12', file: '12jiusuan.mp3', trigger: [32500, 33040], fadeIn: [31500, 32222], fadeOut: [33400, 34200] },

  // 风化
  { name: 'fenghua', file: 'fenghua.mp3', trigger: [37000, 37600], fadeIn: [36650, 37000], fadeOut: [37600, 37800] },

  // 海雁泡泡（loop）
  { name: 'paopao', file: 'paopao.mp3', trigger: [37550, 38400], fadeIn: [37250, 37550], fadeOut: [38400, 38430], loop: true },

  // 13 就算曾经的足迹
  { name: 'jiusuan13', file: '13jiusuan.mp3', trigger: [37800, 38550], fadeIn: [37100, 37650], fadeOut: [38800, 39100] },

  // 爆炸2（boom 的独立实例，可在不同区间与 boom 同时播放）
  { name: 'boom2', file: 'boom.mp3', trigger: [39500, 39800], fadeIn: [39200, 39500], fadeOut: [40000, 40300] },

  // 14 抑或是勇敢的突破天际
  { name: 'yihuo14', file: '14yihuo.mp3', trigger: [41333, 41888], fadeIn: [40700, 41000], fadeOut: [42333, 42850] },

  // 白噪音（loop）
  { name: 'zao', file: 'zao.mp3', trigger: [42900, 43730], fadeIn: [42650, 42900], fadeOut: [43730, 44000], loop: true },

  // 15 直至有一天
  { name: 'zhizhi15', file: '15zhizhi.mp3', trigger: [45250, 45850], fadeIn: [44300, 44870], fadeOut: [46300, 46650] },

  // 电波（loop，第十四场景）
  { name: 'bo', file: 'bo.mp3', trigger: [45800, 47980], fadeIn: [45500, 45800], fadeOut: [47980, 48200], loop: true },

  // 点击（ET手指；参考稿无后渐隐，让声音自然播完）
  { name: 'click0', file: 'click.mp3', trigger: [47820, 47860], fadeIn: [47600, 47820] },

  // 16 在这里留下你的印迹（参考稿无后渐隐）
  { name: 'zaizhe16', file: '16zaizhe.mp3', trigger: [48000, 48300], fadeIn: [47700, 48000] },

  // 流星1~3（liuxing.mp3 独立实例，同文件可同时播放）
  { name: 'liuxing1', file: 'liuxing.mp3', trigger: [10300, 11188], fadeIn: [10000, 10300], fadeOut: [11188, 11388] },
  { name: 'liuxing2', file: 'liuxing.mp3', trigger: [11800, 12600], fadeIn: [11500, 11800], fadeOut: [12600, 12900] },
  { name: 'liuxing3', file: 'liuxing.mp3', trigger: [13280, 14000], fadeIn: [12980, 13280], fadeOut: [14000, 14300] },

  // 流星4（第十三场景太空）
  { name: 'liuxing4', file: 'liuxing.mp3', trigger: [44800, 45280], fadeIn: [44500, 44800], fadeOut: [45280, 45580] },

  // 海浪2（wave 的独立实例）
  { name: 'wave2', file: 'wave.mp3', trigger: [34300, 35850], fadeIn: [33500, 33870], fadeOut: [36260, 36850], loop: true },
]
