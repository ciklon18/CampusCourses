import style from "./course.module.scss";
import { Container } from "@material-ui/core";
import { getSemesterByValue, getStatusByValue, getStatusColorByValue } from "src/common/utils/DataUtil";
import { InfoTabComponent } from "./tabs/InfoTabComponent";
import { PeopleTabComponent } from "./tabs/PeopleTabComponent";
import { CourseDetailsComponent } from "./components/CourseDetailsComponent";
import { CourseHeaderComponent } from "./components/CourseHeaderComponent";
import { FullCourseDto } from "src/modules/courses/types";
import { UserResponse, UserRoles } from "src/types/types";
import { CourseEditDialog } from "./dialog/CourseEditDialog";

export const CoursePageRenderer = ({ courseData, open, roles, mainTeacher, isMainTeacher, isRegistred, badgeValue, handleOpenEditDialog, handleCloseEditDialog, handleCreateNotification, handleAddTeacher, handleChangeStatus, handleAddStudent, handleCancelStudent, handleSignUpForCourse, handleChangeMidtermMark, handleChangeFinalMark }: { courseData: FullCourseDto | null, open: boolean, mainTeacher: UserResponse, isMainTeacher: boolean, roles: UserRoles, isRegistred: boolean, badgeValue: number, handleOpenEditDialog: () => void, handleCloseEditDialog: (isEdited: boolean) => void, handleCreateNotification: () => void, handleAddTeacher: () => void, handleChangeStatus: () => void, handleAddStudent: (id: string) => void, handleCancelStudent: (id: string) => void, handleSignUpForCourse: () => void, handleChangeMidtermMark: (studentId: string, mark: string) => void, handleChangeFinalMark: (studentId: string, mark: string) => void }) => {
    return (
        <Container className={style.container}>
            <CourseHeaderComponent
                courseData={courseData}
                roles={roles}
                isMainTeacher={isMainTeacher}
                handleOpenEditDialog={handleOpenEditDialog}
            />
            {(courseData !== null) && (
                <CourseDetailsComponent
                    courseData={courseData}
                    roles={roles}
                    isRegistred={isRegistred}
                    getStatusColorByValue={getStatusColorByValue}
                    getStatusByValue={getStatusByValue}
                    getSemesterByValue={getSemesterByValue}
                    handleChangeStatus={handleChangeStatus}
                    handleSignUpForCourse={handleSignUpForCourse}
                />
            )}
            <Container className={style.courseTabsContainer}>
                <InfoTabComponent
                    courseData={courseData}
                    roles={roles}
                    badgeValue={badgeValue}
                    handleCreateNotification={handleCreateNotification}
                />
                <PeopleTabComponent
                    courseData={courseData}
                    roles={roles}
                    handleAddTeacher={handleAddTeacher}
                    handleAddStudent={handleAddStudent}
                    handleCancelStudent={handleCancelStudent}
                    handleChangeMidtermMark={handleChangeMidtermMark}
                    handleChangeFinalMark={handleChangeFinalMark}   
                />
            </Container>
            {(courseData !== null) && (
                <CourseEditDialog
                    courseData={courseData}
                    mainTeacher={mainTeacher}
                    roles={roles}
                    isMainTeacher={isMainTeacher}
                    open={open}
                    handleCloseEditDialog={handleCloseEditDialog}
                />
            )}
        </Container>
    )
}