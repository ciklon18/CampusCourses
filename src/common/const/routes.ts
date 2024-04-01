export const root = "https://camp-courses.api.kreosoft.space"

export const routes = {
    root: () => '/',
    login: () => '/login',
    logout: () => '/logout',
    registration: () => '/registration',
    profile: () => '/profile',
    groups: () => '/groups',
    courses: () => '/courses',
    myCourses: () => '/courses/my',
    teachingCourses: () => '/courses/teaching',
    group: (id: number) => `/groups/${id}`,
    course: (id: number) => `/courses/${id}`,
}
  