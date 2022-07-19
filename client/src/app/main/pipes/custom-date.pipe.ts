import { Pipe } from '@angular/core';
@Pipe({
  name: 'custom_date',
})
export class CustomDatePipe {
  transform(value: string): string {
    const month = new Date(value).toLocaleString('default', { month: 'short' });
    const date = new Date(value).toLocaleString('default', { day: 'numeric' });
    const year = new Date(value).getFullYear();
    return `${month} ${date}, ${year}`;
  }
}
