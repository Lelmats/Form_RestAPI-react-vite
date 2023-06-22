import { useLoaderData } from "react-router-dom";
import Client from "../components/Client";
import {getClients} from "../data/clients"


// Obtener el resultado
export function loader() {
    const clients = getClients()

    return clients
}

export default function Index() {

  const clients = useLoaderData();

  return (
      <>
        <h1 className="font-black text-4xl text-blue-900">Clients</h1>
        <p className="mt-3">Admin your clients</p>

        { clients.length ? (
          <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Client</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Actions</th>
              </tr>              
            </thead>
            <tbody>
              {clients.map( client => (
                  <Client 
                  client={client}
                  key={client.id}
                  />
              ))}
            </tbody>
          </table>

        ) : (
          <p className="text-center mt-10">No hay clientes aún</p>
        )}
      </>
    )
}
