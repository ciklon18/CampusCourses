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

// interface ProfileResponse {
//     fullName: string;
//     email: string;
//     birthDate: string;
// }

export interface UserDto {
    email: string,
    password: string,
}



