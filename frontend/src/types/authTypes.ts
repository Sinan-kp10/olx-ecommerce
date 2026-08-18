export interface User {
    id : string
    name: string
    email: string
}

export type ErrorResponse = {
    success : boolean,
    message : string,
    user?:User
}

export interface AuthState {
    user : User | null
    token : string | null
    isAuthenticated : boolean
    loading : boolean
    error : string | null

}