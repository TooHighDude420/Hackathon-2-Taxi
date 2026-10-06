export function getSpeedStatus(currentSpeedKmh, speedLimitKmh) {
  const overBy = currentSpeedKmh - speedLimitKmh

  if (overBy <= 0) {
    return { level: 'ok', textClass: 'text-green-600' }
  }

  if (overBy < 5) {
    return {
      level: 'warning',
      textClass: 'text-red-600',
      label: 'Je chauffeur rijdt licht te hard',
      description: 'De snelheid ligt boven de limiet, maar nog geen 5 km/u te hard.',
    }
  }

  return {
    level: 'danger',
    textClass: 'text-red-600',
    label: 'Je chauffeur rijdt veel te hard',
    description: 'De snelheid ligt meer dan 5 km/u boven de limiet.',
  }
}
