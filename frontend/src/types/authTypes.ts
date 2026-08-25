export interface User {
    _id: string
    name: string
    email: string
}

export type ErrorResponse = {
    success: boolean,
    message: string,
    user?: User
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    authInitialized: boolean
    error: string | null

}