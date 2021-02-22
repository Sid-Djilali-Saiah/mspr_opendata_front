import 'mutationobserver-shim';
import 'intersection-observer';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: prop => {
      return '';
    },
  }),
});
