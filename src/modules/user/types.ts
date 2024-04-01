export interface StudentDto {
    id: string,
    name: string,
    email: string,
    status: string,
    midtermResult: string,
    finalResult: string,
}

export interface TeacherDto {
    name: string,
    email: string,
    isMain: boolean,
}

export interface NotificationDto {
    text: string,
    isImportant: boolean,
}