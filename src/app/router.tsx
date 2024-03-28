import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/login/ui/LoginPage.tsx";
import { AppLayout } from "../pages/AppLayout/AppLayout.tsx";
import { routes } from "../common/const/routes.ts";
import { RegistrationPage } from "src/pages/registration/ui/RegistrationPage.tsx";
import { ProfilePage } from "src/pages/profile/ui/ProfilePage.tsx";
import { GroupsPage } from "src/pages/groups/GroupsPage.tsx";
import { GroupCoursesPage } from "src/pages/courses/group/GroupCoursesPage.tsx";
import { MyCoursesPage } from "src/pages/courses/my/MyCoursesPage.tsx";
import { TeachingCoursesPage } from "src/pages/courses/teaching/TeachingCoursesPage.tsx";

export const router = createBrowserRouter([
    {
        path: routes.root(),
        element: <AppLayout />,
        children: [
            { path: routes.login(), element: <LoginPage /> },
            { path: routes.registration(), element: <RegistrationPage /> },
            { path: routes.profile(), element: <ProfilePage /> },
            { path: routes.groups(), element: <GroupsPage /> },
            { path: routes.groups() + "/:id", element: <GroupCoursesPage /> },
            { path: routes.myCourses(), element: <MyCoursesPage /> },
            { path: routes.teachingCourses(), element: <TeachingCoursesPage /> },
        ]
    }
])
