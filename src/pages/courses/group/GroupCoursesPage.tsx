import { CourseType } from "src/modules/courses/types"
import { CoursesPage } from "../core/CoursesPage"

export const GroupCoursesPage = () => {
    return (
        <CoursesPage courseType={CourseType.GROUP} />
    )
}

