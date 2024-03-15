import { Pipe, PipeTransform } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Pipe({
  name: 'countdown',
  pure: false,
})
export class CountdownPipe implements PipeTransform {
  
  
  transform(targetDate: string): Observable<string> {
    return new Observable<string>(observer => {
      const updateCountdown = () => {
        const targetTime = new Date(targetDate).getTime();
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
          observer.next('00:00:00:00');
          observer.complete();
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          observer.next(`${days} ${hours} ${this.formatNumber(minutes)} ${this.formatNumber(seconds)}`);
        }
      };

      updateCountdown(); // Call immediately to show initial value

      const intervalId = setInterval(updateCountdown, 1000);

      // Clear interval when the component is destroyed
      return () => clearInterval(intervalId);
    });
  }

  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


}
