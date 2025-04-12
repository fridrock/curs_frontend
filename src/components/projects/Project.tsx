import { AxiosResponse } from "axios"
import useAxios from "../../hooks/useAxios"

export default function Project(){
    const {api} = useAxios()
    async function performRequest(){
        try{
            let response: AxiosResponse = await api.get("/protected/")
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }
    return <>
        <button onClick={async ()=> await performRequest()}>Click me</button>
    </>
}