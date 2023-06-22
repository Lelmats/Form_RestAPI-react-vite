import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import {addClient} from "../data/clients"

// Request information from "FormData"
export async function action({request}) {
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

    await addClient(datos)

    return redirect('/');
}

export default function NewClient() {
    
    const errores = useActionData();
    const navigate = useNavigate();

  return (
    <>
        <h1 className="font-black text-4xl text-blue-900">New Client</h1>
        <p className="mt-3">Fill the form to add a client</p>

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
                <Formulario/>

                <input 
                    type="submit" 
                    className="mt-5 w-full bg-blue-800 uppercase font-bold text-white text-lg"
                    value='Register Client'
                />
            </Form>
        </div>
    </>
  )
}
