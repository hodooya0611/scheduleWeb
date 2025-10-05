export interface LoginForm {
    memberId: string;
    password: string;
}

export interface LoginRequest {
    memberId: string;
    password: string;
}
export interface LoginResponse {
    memberId: string;
    token: string;
    role: string;
}
