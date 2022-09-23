const checkAccent = (string) => {
  if (string.match(/[Á-ẑ]/g)) return false
  return true
}

export default checkAccent
