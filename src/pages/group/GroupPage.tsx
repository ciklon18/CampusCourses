import { Box, Button, Card, Container, Typography } from "@material-ui/core"
import style from "./group.module.scss"
import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { CourseDto } from "src/modules/courses/types"
import { getCourses } from "src/modules/courses/thunk"
import { useAppDispatch } from "src/store/redux"
import { GroupDto } from "src/modules/group/types"
import { getGroups } from "src/modules/group/thunk"
import { CourseFormDialog } from "./component/CourseFormDialog"

const getSemesterByValue = (value: string) => {
    switch (value) {
        case "Spring":
            return "Весенний";
        case "Autumn":
            return "Осенний";
    }
}

const getStatusByValue = (value: string) => {
    switch (value) {
        case "Created":
            return "Создан";
        case "Closed":
            return "Закрыт";
        case "OpenForAssigning":
            return "Открыт для записи";
        case "InProcess":
            return "В процессе обучения";
    }
}

const getStatusColorByValue = (value: string) => {
    switch (value) {
        case "Created":
            return "#6d7583";
        case "Closed":
            return "#dc3545";
        case "OpenForAssigning":
            return "#309261";
        case "InProcess":
            return "#0d91fe";
    }
}

export const GroupPage = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useAppDispatch();

    const [group, setGroup] = useState<GroupDto>();
    const [courses, setCourses] = useState<CourseDto[]>([]);
    const [open, setOpen] = useState(false);

    const fetchCourses = useCallback(async () => {
        const response = await dispatch(getCourses(id || ""));
        setCourses(response);
    }, [dispatch, id]);

    const fetchGroup = useCallback(async () => {
        const response = await dispatch(getGroups());
        setGroup(response.find((group) => group.id.toString() === id));
    }, [dispatch, id]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await fetchCourses();
    };

    useEffect(() => {
        fetchGroup();
    }, [fetchGroup]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);


    return (
        <Container
            className={style.container}
            sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "auto"
            }}>
            <Typography
                variant="h4"
                className={style.title}>
                Группа - {group?.name}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                className={style.button}
                onClick={handleOpen}>
                СОЗДАТЬ КУРС
            </Button>
            <Container className={style.courses}>
                {courses.map((course) => (
                    <Card className={style.cardContainer} key={course.id}>
                        <Box className={style.cardContent}>
                            <Typography
                                variant="h6"
                                className={style.cardTitle}>
                                {course.name}</Typography>
                            <Typography
                                variant="body1"
                                className={style.mainText}>
                                Учебный год - {course.startYear}-{course.startYear + 1}
                            </Typography>
                            <Typography
                                variant="body1"
                                className={style.mainText}>
                                Семестр - {getSemesterByValue(course.semester)}
                            </Typography>
                            <Typography
                                variant="body2"
                                className={style.secondaryText}>
                                Мест всего - {course.maximumStudentsCount}
                            </Typography>
                            <Typography
                                variant="body2"
                                className={style.secondaryText}>
                                Мест свободно - {course.remainingSlotsCount}
                            </Typography>
                        </Box>
                        <Box className={style.cardStatus}>
                            <Typography
                                variant="body1"
                                sx={{ color: getStatusColorByValue(course.status) }}
                                className={style.statusText}>
                                {getStatusByValue(course.status)}
                            </Typography>
                        </Box>
                    </Card>

                ))}
            </Container>
            <CourseFormDialog
                open={open}
                onClose={handleClose}
                id={id || ""} />
        </Container>
    );
}

