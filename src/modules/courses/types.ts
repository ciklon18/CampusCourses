import { NotificationDto, StudentDto, TeacherDto } from "../user/types";

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

export enum CourseType {
    GROUP,
    MY,
    TEACHING
}

export interface CourseDto {
    id: number,
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    remainingSlotsCount: number,
    status: string,
    semester: string,
}

export interface FullCourseDto {
    id: number,
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    studentsEnrolledCount: number,
    studentsInQueueCount: number,
    requirements: string,
    annotations: string,
    status: string,
    semester: string,
    students: StudentDto[],
    teachers: TeacherDto[],
    notifications: NotificationDto[],
}

export interface MarkDto {
    markType: string,
    mark: string,
}

export interface CourceDescriptionDto {
    requirements: string,
    annotations: string,
}

export interface EditCourseDto {
    name: string,
    startYear: number,
    maximumStudentsCount: number,
    semester: string,
    requirements: string,
    annotations: string,
    mainTeacherId: string
}