export const generateKey = (
  index: number,
  // page: number,
  loading: boolean | Falsy,
  ...args: any[]
) => {
  return [...args, loading ? `loading_${index}` : "loaded"].join("-")
}
