import { compactJoin } from '../utils.js?rev=c4787bae09e3364851a3';

export function attributeSwatch(attribute) {
  const swatch = document.createElement('span');
  swatch.className = compactJoin(['attribute-swatch', attribute && `attribute-${attribute}`]);
  return swatch;
}
