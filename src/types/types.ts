export interface LoginUserDto {
    email: string;
    password: string;
}


export interface RegisterUserDto {
    fullName: string;
    birthDate: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// interface ProfileDto {
//     email: string;
//     password: string;
// }

export interface ProfileDto {
    fullName: string;
    email: string;
    birthDate: string;
}

export interface UserDto {
    email: string,
    password: string,
}

export interface UserRoles {
    isTeacher: boolean,
    isStudent: boolean,
    isAdmin: boolean,
}

export interface UserResponse {
    id: number,
    fullName: string
}


