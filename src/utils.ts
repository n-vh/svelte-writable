export function stringify(value: any): string {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value.toString();
}

export function parse<T>(initialValue: T, value: string) {
  if (typeof initialValue === 'number') {
    return Number(value);
  } else if (typeof initialValue === 'object') {
    return JSON.parse(value);
  }
  return value;
}
