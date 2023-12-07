export interface IRegisterRequest {
    email: string;
    fullName: string;
    username?: string;
    password: string;
    confirmPassword: string;
    id?: string;
}
