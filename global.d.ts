// global.d.ts
export {};

declare global {
 namespace PlaywrightTest {
    interface Matchers<R, T> {
      toBeWithinRange(a: number, b: number): R;
    }
  }
}