export async function loadMapList() {
  const maps = await import('./maps.json')
  return maps.map
}
