import style from "./component.module.scss";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { FullCourseDto } from "src/modules/courses/types";
import { UserRoles } from "src/types/types";

export const CourseHeaderComponent = ({ courseData, roles, isMainTeacher, handleOpenEditDialog }: { courseData?: FullCourseDto | null, isMainTeacher: boolean, roles?: UserRoles, handleOpenEditDialog: () => void }) => {
    return (
        <Container className={style.courseHeaderContainer}>
            <Typography variant="h3">
                {courseData?.name || "Название курса"}
            </Typography>
            <Box className={style.courseHeader}>
                <Typography variant="h6">
                    Основные данные курса
                </Typography>
                {((roles?.isAdmin) || (isMainTeacher)) && (
                    <Button
                        variant="contained"
                        color="primary"
                        className={style.editButton}
                        onClick={handleOpenEditDialog}>
                        РЕДАКТИРОВАТЬ
                    </Button>
                )}
            </Box>
        </Container>
    )
}