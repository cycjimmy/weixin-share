// @cycjimmy/awesome-js-funcs ships no type declarations. This shim covers only
// the singleton helper this package uses.
declare module '@cycjimmy/awesome-js-funcs/designPattern' {
  /**
   * Create a getter/setter pair that keeps a single instance.
   */
  export function CreateInstance<T>(): (newInstance?: T) => T | undefined
}
