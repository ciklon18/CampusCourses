export const root = "https://camp-courses.api.kreosoft.space"

export const routes = {
    root: () => '/',
    login: () => '/login',
    logout: () => '/logout',
    registration: () => '/registration',
    profile: () => '/profile',
    groups: () => '/groups',
    myCourses: () => '/courses/my',
    teachingCourses: () => '/courses/teaching',
    group: (id: number) => `/groups/${id}`,
}
  