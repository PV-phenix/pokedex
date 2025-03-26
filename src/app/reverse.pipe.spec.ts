import { ReversePipe } from './reverse.pipe';
import  '@angular/compiler';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });
});
