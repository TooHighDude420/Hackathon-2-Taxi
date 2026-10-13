const FALLBACK_ERROR = 'Er ging iets mis. Probeer het opnieuw.'

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}

function errorMessage(data) {
  if (!data) return FALLBACK_ERROR
  if (typeof data.detail === 'string') return data.detail
  const first = Object.values(data).flat()[0]
  return typeof first === 'string' ? first : FALLBACK_ERROR
}

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const response = await fetch(`/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) throw new Error(errorMessage(data))
  return data
}
