import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): any {
    // console.log('TruncatePipe called with value:', value, 'and limit:', limit);
    if (!value) return '';
    const words = value?.split(' ');
    return words?.length > limit 
      ? words?.slice(0, limit).join(' ') + '...' 
      : value;
  }

}
