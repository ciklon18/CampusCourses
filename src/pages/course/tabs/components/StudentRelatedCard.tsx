import { Box, Card, Chip, Grid, Typography } from "@material-ui/core";
import style from "../tabs.module.scss";
import { getStudentStatusByValue, getStudentStatusColorByValue, getCertificationText, getCertificationColor } from "src/common/utils/DataUtil";



export const RenderStudentRelatedCard = ({ student, index, email }: { student: any, index: number, email: string }) => {
    const isAccepted = student.status === "Accepted" && student.email === email;

    return (
        <Card key={index} className={style.studentCard}>
            <Grid container spacing={0}>
                <Grid item xs={ (isAccepted) ? 4 : 12 } className={style.studentData}>
                    <Typography variant="subtitle1" className={style.mainText}>
                        {student.name}
                    </Typography>
                    <Box className={style.studentStatusText}>
                        <Typography variant="body1" className={style.secondText}>
                            Статус -
                        </Typography>
                        <Typography
                            variant="body1"
                            className={style.studentStatus}
                            color={getStudentStatusColorByValue(student.status)}>
                            {getStudentStatusByValue(student.status)}
                        </Typography>
                    </Box>
                    <Typography variant="body1" className={style.secondText}>
                        {student.email}
                    </Typography>
                </Grid>
                {isAccepted && (
                    <>
                        <RenderCertificationBlock
                            text="Промежуточная аттестация"
                            result={student.midtermResult}
                        />
                        <RenderCertificationBlock
                            text="Финальная аттестация"
                            result={student.finalResult}
                        />
                    </>
                )}
            </Grid>
        </Card>
    );
}

const RenderCertificationBlock = ({ text, result }: { text: string, result: any }) => (
    <Grid item xs={4} className={style.studentCertificationBlock}>
        <Typography variant="body1" className={style.studentCertificationText}>
            {text}
        </Typography>
        <Chip
            size="small"
            label={getCertificationText(result)}
            color={getCertificationColor(result)}
            className={style.chipStatus}
        />
    </Grid>
);

