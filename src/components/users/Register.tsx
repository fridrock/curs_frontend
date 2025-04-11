import { useState } from "react";
import { AuthResponse, IRegisterDto } from "../../interfaces/userInterfaces";
import { AxiosResponse } from "axios";
import useUserStore from "../../state/userStore";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import Header from "../default/Header";



function Register() {
    const [registerState, setRegisterState] = useState<IRegisterDto>({username: "", password: "", email: ""})
    const userStore = useUserStore()
    const navigate = useNavigate()
    const {api} = useAxios()
    async function register(){
        //TODO validation
        try{
            let res: AxiosResponse<AuthResponse> = await api.post<AuthResponse>("/users/reg", registerState);
            if (res.status == 200){
                userStore.setToken(res.data.token)
                navigate("/home")
            }
        } catch(error){
            //TODO error handling
        }
    }
    return (
        <div className="registerPage">
            <Header></Header>
            <form>
                <h3>Create account</h3>
                <label>Username</label>
                <input onChange={(e)=>setRegisterState({...registerState, username: e.target.value})} value={registerState.username}></input>
                <label>Password</label>
                <input onChange={(e)=>setRegisterState({...registerState, password: e.target.value})} value={registerState.password}></input>
                <label>Email</label>
                <input onChange={(e)=>setRegisterState({...registerState, email: e.target.value})} value={registerState.email}></input>
            </form>
            <button onClick={()=>register()}>Register</button>
        </div>
    );
}

export default Register;
