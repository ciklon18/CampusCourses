import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Button } from "@material-ui/core";
import style from "./tabs.module.scss";
import { FullCourseDto } from 'src/modules/courses/types';
import { UserRoles } from 'src/types/types';
import { useAppSelector } from 'src/store/redux';
import { RenderTeacherCard } from './components/TeacherCard';
import { RenderStudentRelatedCard } from './components/StudentRelatedCard';
import { RenderTeacherAdminRelatedCard } from './components/TeacherAdminRelatedCard';

export const PeopleTabComponent = ({ courseData, roles, handleAddTeacher, handleAddStudent, handleCancelStudent, handleChangeMidtermMark, handleChangeFinalMark }: { courseData: FullCourseDto | null, roles: UserRoles, handleAddTeacher: () => void, handleAddStudent: (id: string) => void, handleCancelStudent: (id: string) => void, handleChangeMidtermMark: (studentId: string, mark: string) => void, handleChangeFinalMark: (studentId: string, mark: string) => void }) => {
    const email = useAppSelector((state) => state.user.user.email);
    const isMainTeacher = courseData?.teachers.some(teacher => teacher.email === email && teacher.isMain);
    return (
        <Tabs
            variant="outlined"
            aria-label="Course data"
            defaultValue={0}
            className={style.tabsContainer}
        >
            <TabList
                disableUnderline
                tabFlex={1}
                sx={{
                    [`& .${tabClasses.root}`]: {
                        fontSize: 'sm',
                        fontWeight: 'lg',
                        [`&[aria-selected="true"]`]: {
                            color: 'primary.500',
                            bgcolor: 'background.surface',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                            outlineOffset: '-4px',
                        },
                    },
                    width: '100%',
                }}
            >
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} className={style.tabName}>
                    Преподаватели
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} className={style.tabName}>
                    Студенты
                </Tab>
            </TabList>
            <TabPanel value={0} className={style.tabPanel}>
                {(roles?.isAdmin || (roles?.isTeacher && isMainTeacher)) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTeacher}
                        className={style.teacherButton}>
                        Добавить преподавателя
                    </Button>
                )}
                {courseData?.teachers.map((teacher, index) => (
                    RenderTeacherCard({ teacher, index })
                ))}
            </TabPanel>
            <TabPanel value={1} className={style.tabPanel}>
                {courseData?.students.map((student, index) => (
                    (!roles?.isAdmin && !roles?.isTeacher && (student.status === "Accepted" || student.email === email) && (
                        RenderStudentRelatedCard({ student, index, email }))
                    ) || ((roles?.isAdmin || roles?.isTeacher) && (
                        RenderTeacherAdminRelatedCard({ student, index, handleChangeMidtermMark, handleChangeFinalMark, handleAddStudent, handleCancelStudent })
                    ))
                ))}
            </TabPanel>
        </Tabs>
    );
}

