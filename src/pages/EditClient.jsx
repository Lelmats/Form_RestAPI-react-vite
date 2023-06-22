import { Form, useNavigate, useLoaderData, useActionData, redirect } from 'react-router-dom'
import {getClient, updateClient} from '../data/clients'
import Formulario from '../components/Formulario'
import Error from '../components/Error'

export async function loader({params}) {
    const client = await getClient(params.clientId)
    if(Object.values(client).length === 0) {
        throw new Response('', {
            status: 404, 
            statusText: 'Need something?'
        })
    }
    return client
}

export async function action({request, params}) {
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)

    // Validation
    const errores = []

    if(Object.values(datos).includes('')) {
        errores.push("All the fields are required")
    }


    // Email Validation
    const email = formData.get('email')

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(email)) errores.push("Enter a Valid Email")


    // Return data if errors
    if (Object.keys(errores).length) return errores

    // Update Client
    await updateClient(params.clientId, datos);

    return redirect('/');
}

function EditClient() {

    const navigate = useNavigate();
    const errores = useActionData();
    const client = useLoaderData();

  return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
            <p className="mt-3">Edit the form to update a client</p>

            <div className="flex justify-end">
                <button 
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">

                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error> )}
                
                <Form
                    method="post"
                    noValidate
                >
                    <Formulario
                        client={client}
                    />

                    <input 
                        type="submit" 
                        className="mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg"
                        value='Update Client'
                    />
                </Form>
            </div>
        </>
  )
}

export default EditClient