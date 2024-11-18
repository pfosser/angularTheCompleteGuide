import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  // Disable caching, so the pipe is executed each time the input
  // could _potentially_ change
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...value];
    sorted.sort((a, b) => {
      if (direction === 'asc') {
        return a > b ? 1 : -1;
      } else return a > b ? -1 : 1;
    });
    return sorted;
  }
}
