import { CourseType } from "src/modules/courses/types"
import { CoursesPage } from "../core/CoursesPage"

export const MyCoursesPage = () => {
    return (
        <CoursesPage courseType={CourseType.MY} />
    )
}

