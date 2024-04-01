import { Box, Button, Card, Chip, Grid, Typography } from "@material-ui/core";
import style from "../tabs.module.scss";
import { getStudentStatusByValue, getStudentStatusColorByValue, getCertificationText, getCertificationColor } from "src/common/utils/DataUtil";
import { StudentDto } from "src/modules/user/types";


export const RenderTeacherAdminRelatedCard = ({ student, index, handleChangeMidtermMark, handleChangeFinalMark, handleAddStudent, handleCancelStudent }: { student: StudentDto, index: number, handleChangeMidtermMark: (studentId: string, mark: string) => void, handleChangeFinalMark: (studentId: string, mark: string) => void, handleAddStudent: (id: string) => void, handleCancelStudent: (id: string) => void }) => {
    const isAccepted = student.status === "Accepted";
    const isInQueue = student.status === "InQueue";

    return (
        <Card key={index} className={style.studentCard}>
            <Grid container spacing={0}>
                <Grid item xs={ (isAccepted || isInQueue) ? 4 : 12 } className={style.studentData}>
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
                            handleClick={() => handleChangeMidtermMark(student.id, student.midtermResult)}
                        />
                        <RenderCertificationBlock
                            text="Финальная аттестация"
                            result={student.finalResult}
                            handleClick={() => handleChangeFinalMark(student.id, student.finalResult)}
                        />
                    </>
                )}
                {isInQueue && <RenderStudentButtons
                    id={student.id}
                    handleAddStudent={handleAddStudent}
                    handleCancelStudent={handleCancelStudent} />}
            </Grid>
        </Card>
    );
}

const RenderCertificationBlock = ({ text, result, handleClick }: { text: string, result: string, handleClick: () => void }) => (
    <Grid item xs={4} className={style.studentCertificationBlock}>
        <Typography
            variant="body1"
            sx={{
                textDecoration: 'underline',
                color: '#007bff',
                '&:hover': {
                    color: '#81bdfd',
                }
            }}
            onClick={handleClick}
            className={style.studentCertificationText}>
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

const RenderStudentButtons = ({id, handleAddStudent, handleCancelStudent }: { id: string, handleAddStudent: (id: string) => void, handleCancelStudent: (id: string) => void }) => (
    <Grid item xs={8} className={style.studentButtonsBlock}>
        <Button
            variant="contained"
            color="primary"
            className={style.studentAcceptButton}
            onClick={() => handleAddStudent(id)}>
            Зачислить
        </Button>
        <Button
            variant="contained"
            color="error"
            className={style.studentDeclineButton}
            onClick={() => handleCancelStudent(id)}>
            Отклонить заявку
        </Button>
    </Grid>
);


