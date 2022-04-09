export function assertDefined<T>(
  variable: T
): asserts variable is NonNullable<T> {
  if (variable === null || variable === undefined) {
    throw new Error("variable is undefined or null");
  }
}
