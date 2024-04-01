import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import parse from 'html-react-parser';
import style from "./tabs.module.scss";
import { Button, Card, Chip, Typography } from "@material-ui/core";
import { FullCourseDto } from 'src/modules/courses/types';
import { UserRoles } from 'src/types/types';

export const InfoTabComponent = ({ courseData, roles, badgeValue, handleCreateNotification }: { courseData: FullCourseDto | null, roles: UserRoles, badgeValue: number, handleCreateNotification: () => void }) => {
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
                    Требования к курсу
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} className={style.tabName}>
                    Аннотация
                </Tab>
                <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }} className={style.tabName}>
                    Уведомления
                    <Chip
                        label={badgeValue}
                        color="error"
                        size="small"
                        className={style.notificationBadge} />
                </Tab>
            </TabList>

            <TabPanel value={0} className={style.tabPanel}>
                <Typography className={style.tabPanelText}>
                    {parse(courseData?.requirements || "")}
                </Typography>
            </TabPanel>
            <TabPanel value={1} className={style.tabPanel}>
                <Typography className={style.tabPanelText}>
                    {parse(courseData?.annotations || "")}
                </Typography>
            </TabPanel>
            <TabPanel value={2} className={style.tabPanel}>
                {(roles.isTeacher || roles.isAdmin) && (
                    <Button
                        variant="contained"
                        color="primary"
                        className={style.createNotificationButton}
                        onClick={handleCreateNotification}
                    >
                        Создать уведомление
                    </Button>
                )}
                {courseData?.notifications.map((notification, index) => (
                    <Card key={index} className={
                        (notification.isImportant)
                            ? style.importantNotificationCard
                            : style.notificationCard}>
                        <Typography
                            variant="subtitle1"
                            className={(notification.isImportant)
                                ? style.importantNotificationTitle
                                : style.notificationTitle}>
                            {notification.text}
                        </Typography>
                    </Card>
                ))}
            </TabPanel>
        </Tabs>
    )
}