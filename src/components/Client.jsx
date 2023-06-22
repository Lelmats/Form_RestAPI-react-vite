/* eslint-disable react/prop-types */
import { useNavigate, Form, redirect } from "react-router-dom"
import { deleteClient } from "../data/clients";

export async function action({params}) {

  await deleteClient(params.clientId)
  return redirect('/');
  
}

export default function Client({client}) {

  const navigate = useNavigate()

  const {nombre, empresa, email, telefono, id} = client

  return (
    <tr className="border-b">
        <td className="p-6 space-y-2">
          <p className="text-2xl text-gray-800">{nombre}</p>
          <p>{empresa}</p>
        </td>
        <td className="p-6 space-y-2">
          <p className="text-gray-600"><span className="text-gray-600 uppercase font-bold">Email: </span>{email}</p>
          <p className="text-gray-600"><span className="text-gray-600 uppercase font-bold">Telephone: </span>{telefono}</p>
        </td>
        <td className="p-6 flex gap-3">
          <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-black text-xs"
          onClick={() => navigate(`/clients/${id}/edit`)}
          >
            Edit
          </button>
          <Form
            method='post'
            action={`/clients/${id}/delete`}
            onSubmit={(e) => {
              if(!confirm('Would you like to delete?')){
                e.preventDefault()
              }
            }}
          >
            <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-black text-xs"
            >
              Delete
            </button>
          </Form>
        </td>
    </tr>
  )
}
