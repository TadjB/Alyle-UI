import { ThemeConfig } from './theme/theme-config';

export interface TypographyConfig {
  fontSize: number;
  fontFamily?: string;
  fontWeight?: number;
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'capitalize' | 'lowercase';
  gutterTop?: number;
  gutterBottom?: number;
}

export class LyStyleUtils {
  typography: {
    htmlFontSize: number,
    fontSize: number;
  };
  pxToRem(value: number) {
    const size = this.typography.fontSize / 14;
    return `${value / this.typography.htmlFontSize * size}rem`;
  }
  colorOf(value: string, optional?: string): string {
    return get(this, value, optional);
  }
}

/**
 * get color of object
 * @param obj object
 * @param path path
 * @param optional get optional value, if not exist return default if not is string
 */
function get(obj: Object, path: string[] | string, optional: string): string {
  const _path: string[] = path instanceof Array ? path : path.split(':');
  for (let i = 0; i < _path.length; i++) {
    const posibleOb = obj[_path[i]];
    if (posibleOb) {
      obj = posibleOb;
    } else {
      /** if not exist */
      return path as string;
    }
  }
  if (typeof obj === 'string') {
    return obj as string;
  } else if (optional) {
    return obj[optional] || obj['default'];
  } else {
    return obj['default'];
  }
  // return typeof obj === 'string' ? obj as string : obj['default'] as string;
}

export function eachMedia(str: string, fn: ((val: string, media: string, len: number) => void)) {
  const values = str.split(/\s/g);
  for (let index = 0; index < values.length; index++) {
    const valItem = values[index].split(/\@/g);
    const value = valItem.shift();
    const len = valItem.length;
    if (len) {
      for (let j = 0; j < len; j++) {
        fn.call(undefined, value, valItem[j], valItem.length);
      }
    } else {
      fn.call(undefined, value, undefined, len);
    }
  }
}
/**
 * Simple object check.
 * @param item
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) { return target; }
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) { Object.assign(target, { [key]: {} }); }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
