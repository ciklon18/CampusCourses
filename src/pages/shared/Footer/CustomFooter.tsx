import style from './Footer.module.scss';

export const CustomFooter = () => {
    return <footer className={style.footer}>
        <div className={style.container}>
            <span className={style.footer__text}>Кампусные курсы</span>
            <span className={style.footer__text}>2023</span>
        </div>
    </footer>
}