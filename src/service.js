export async function loadMapList() {
  const maps = await (await fetch('/maps.json')).json()
  return maps.map
}
