import { CourseType } from "src/modules/courses/types"
import { CoursesPage } from "../core/CoursesPage"

export const TeachingCoursesPage = () => {
    return (
        <CoursesPage courseType={CourseType.TEACHING} />
    )
}

