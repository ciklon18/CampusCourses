import { Box, Button, Card, Grid, Typography, Container } from "@material-ui/core";
import style from "./component.module.scss";
import { FullCourseDto } from "src/modules/courses/types";
import { UserRoles } from "src/types/types";



export const CourseDetailsComponent = ({ courseData, roles, isRegistred, handleChangeStatus, handleSignUpForCourse, getStatusColorByValue, getStatusByValue, getSemesterByValue }: { courseData: FullCourseDto, roles: UserRoles, isRegistred: boolean, handleChangeStatus: () => void, handleSignUpForCourse: () => void, getStatusColorByValue: (status: string) => string, getStatusByValue: (status: string) => string, getSemesterByValue: (semester: string) => string }) => {
    return (
        <Container className={style.courseDataContainer}>
            <Card className={style.courseStatusCard}>
                <Box>
                    <Typography variant="subtitle1" className={style.courseSubtitle}>
                        Статус курса
                    </Typography>
                    <Typography
                        variant="body1"
                        className={style.courseDataItemValue}
                        color={getStatusColorByValue(courseData?.status)}>
                        {getStatusByValue(courseData?.status)}
                    </Typography>
                </Box>
                {
                    roles?.isAdmin &&
                    <Button
                        variant="contained"
                        className={style.editButton}
                        onClick={handleChangeStatus}>
                        ИЗМЕНИТЬ
                    </Button>
                }
                {
                    !roles?.isAdmin && !roles?.isTeacher && courseData.status === "OpenForAssigning" && !isRegistred &&
                    <Button
                        variant="contained"
                        color="success"
                        className={style.editButton}
                        onClick={handleSignUpForCourse}>
                        ЗАПИСАТЬСЯ
                    </Button>
                }
            </Card>
            <Card className={style.courseDataCard}>
                <Grid container spacing={0}>
                    <Grid item xs={6} className={style.courseDataItem}>
                        <Typography variant="subtitle1" className={style.courseSubtitle}>
                            Учебный год
                        </Typography>
                        <Typography variant="body1" className={style.courseDataItemValue}>
                            {courseData?.startYear}-{courseData?.startYear + 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={style.courseDataItem}>
                        <Typography variant="subtitle1" className={style.courseSubtitle}>
                            Семестр
                        </Typography>
                        <Typography variant="body1" className={style.courseDataItemValue}>
                            {getSemesterByValue(courseData?.semester)}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
            <Card className={style.courseDataCard}>
                <Grid container spacing={0}>
                    <Grid item xs={6} className={style.courseDataItem}>
                        <Typography variant="subtitle1" className={style.courseSubtitle}>
                            Всего мест
                        </Typography>
                        <Typography variant="body1" className={style.courseDataItemValue}>
                            {courseData?.maximumStudentsCount}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={style.courseDataItem}>
                        <Typography variant="subtitle1" className={style.courseSubtitle}>
                            Студентов зачислено
                        </Typography>
                        <Typography variant="body1" className={style.courseDataItemValue}>
                            {courseData?.studentsEnrolledCount}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
            <Card className={style.courseDataCard}>
                <Grid container spacing={0}>
                    <Grid item xs={6} className={style.courseDataItem}>
                        <Typography variant="subtitle1" className={style.courseSubtitle}>
                            Заявок на рассмотрении
                        </Typography>
                        <Typography variant="body1" className={style.courseDataItemValue}>
                            {courseData?.studentsInQueueCount}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}