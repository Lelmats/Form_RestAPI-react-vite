export async function getClients() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL)

    const resultado = await respuesta.json()
    
    return(resultado)
}

export async function getClient(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)

    const resultado = await respuesta.json()
    
    return(resultado)
}

export async function addClient(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()

    } catch (error) {
        console.log(error)
    }
}

export async function updateClient(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()

    } catch (error) {
        console.log(error)
    }
}

export async function deleteClient(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })
        await respuesta.json()

    } catch (error) {
        console.log(error)
    }
}