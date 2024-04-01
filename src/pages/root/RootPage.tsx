import { Container, Typography } from "@material-ui/core"
import style from "./root.module.scss"

export const RootPage = () => {
    return (
        <Container className={style.container}>
            <Typography variant="h1" className={style.title}>
                Добро пожаловать в систему кампусных курсов!
                </Typography>
        </Container>
    )
}