/**
 * **flatten**
 * 
 * _flattens_ the array structure to be a single level deep. For
 * example: 
```typescript
const example = [ [ 0, 128, 255 ], [ 255, 192, 0 ] ];
console.log(flatten(example)); // [ 0, 128, 255, 255, 192, 0 ]
``` 
 * 
 * 
 * @param arr the array of elements and possibly arrays of arrays
 */
export function flatten(arr: any[]) {
  return arr.reduce((acc, val) => acc.concat(val));
}
