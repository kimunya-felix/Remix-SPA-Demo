import axios from 'axios';
import { ClientActionFunctionArgs, Form, json, useLoaderData } from "@remix-run/react";

interface User {
  displayName: string;
  email: string;
}



export async function clientLoader() {
  // Fetch user details from API
  const response = await axios.get<User>("https://api.example.com/user");
  return json({ user: response.data });
  
}



export default function Index() {
  const { user } = useLoaderData<typeof clientLoader>();
  
  return (
    <div className="pt-32 flex justify-center items-center flex-col gap-8">
      <h1 className="text-2xl font-bold underline">
        MSW Demo!
      </h1>

      <div className="border-solid border-2 flex flex-col p-4">
        <Form method="post" className="w-[32rem]">
          <h1 className="text-lg font-bold pb-2">Settings for <span className="text-blue-700">{user?.displayName}</span></h1>

          <div className="grid gap-2">
            <label htmlFor="displayName" className="text-base font-semibold">Name</label>
            <input
              name="displayName" placeholder="Name" className="border-solid p-1 border-2 text-base"
            />
          </div>

          <div className="grid gap-2" >
            <label htmlFor="email" className="text-base  font-semibold">Email</label>
            <input name="email" placeholder="Email" className="border-solid p-1 border-2 text-base"/>
          </div>

          <div className="grid pt-4" >
            <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}


export async function clientAction({
  request,
}: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const email = formData.get("email");

  // Send data to API
  const response = await axios.post("https://api.example.com/user", 
    { displayName, email });
  return response.data;
}