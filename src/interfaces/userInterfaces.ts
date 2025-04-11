

interface IRegisterDto{
    username: string
    password: string
    email: string
}

interface AuthResponse {
    token: string
}


export type {IRegisterDto, AuthResponse}