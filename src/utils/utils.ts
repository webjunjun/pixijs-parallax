/** 线性插值：scroll 在 [min,max] 内时，输出从 from 渐变到 to */
export function scrollNum(min: number, max: number, scroll: number, from: number, to: number): number {
  return from + ((scroll - min) / (max - min)) * (to - from)
}

/** 线性插值：scroll 在 [min,max] 内时，输出从 from 渐变到 to，区间外自动钉住 from/to */
export function scrollNumClamped(min: number, max: number, scroll: number, from: number, to: number): number {
  const t = Math.min(1, Math.max(0, (scroll - min) / (max - min)))
  return from + t * (to - from)
}

export function inRange(scroll: number, min: number, max: number): boolean {
  return scroll > min && scroll < max
}