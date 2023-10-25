import fsp from 'node:fs/promises'

export async function isDirectory (path: string) {
  try {
    return (await fsp.stat(path)).isDirectory()
  } catch {
    return false
  }
}
