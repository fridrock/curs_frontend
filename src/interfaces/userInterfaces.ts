

interface IRegisterDto{
    username: string
    password: string
    email: string
}

interface IAuthDto{
    username: string
    password: string
}

interface AuthResponse {
    token: string
}


export type {IRegisterDto,IAuthDto, AuthResponse}