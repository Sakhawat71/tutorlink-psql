export interface ILoginUser {
    email: string;
    password: string;
};

export interface IRegisterUser {
    name: string;
    email: string;
    password: string;
    role: "admin" | "tutor" | "student";
};