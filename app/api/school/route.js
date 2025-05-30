export async function POST(request) {
  const form = await request.formData()
  const type = form.get('type')

  const res = await fetch('https://masteradmin.icbapp.site/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ type }),
  })

  const data = await res.json()
  return Response.json(data)
}
