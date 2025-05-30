export async function POST(request) {
  const { subdomain } = await request.json()

  const response = await fetch('https://masteradmin.icbapp.site/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      type: `${subdomain}.icbapp`,
    }),
  })

  const data = await response.json()
  return Response.json(data)
}
