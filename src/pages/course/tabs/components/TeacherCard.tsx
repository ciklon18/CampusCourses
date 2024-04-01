import { Box, Card, Chip, Grid, Typography } from "@material-ui/core";
import style from "../tabs.module.scss";

export  const RenderTeacherCard = ({ teacher, index }: { teacher: any, index: number }) => {
    return (
        <Card key={index} className={style.teacherCard}>
            <Grid container spacing={0}>
                <Grid item xs={12} className={style.teacherData}>
                    <Box className={style.teacherStatus}>
                        <Typography
                            variant="subtitle1"
                            className={style.mainText}>
                            {teacher.name}
                        </Typography>
                        {teacher.isMain && (
                            <Chip
                                size="small"
                                label={"Основной"}
                                color="success"
                                className={style.chipStatus}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="body1"
                        className={style.secondText}>
                        {teacher.email}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}
