import { http, HttpResponse } from "msw";

export const handlers = [
    http.get('https://api.example.com/user', () => {
      const user = {
        displayName: 'John Maverick',
        email: 'john.maverick@example.com',
      }
      return HttpResponse.json(user)
    }),

    http.post('https://api.example.com/user', async ({ request }) => {
        const data = await request.json();
        return HttpResponse.json({
            message: "User settings updated successfully!",
            user: data
        }, { status: 200 })
    }),
]