export interface CourseDto {
    id: number,
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    remainingSlotsCount: number,
    status: string,
    semester: string,
}

export interface CourceCreationDto {
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    semester: string,
    requirements: string,
    annotations: string,
    mainTeacherId: string,
}