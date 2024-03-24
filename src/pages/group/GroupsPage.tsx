import { Box, Button, Card,  Container, Grid, Typography } from "@material-ui/core"
import style from "./groups.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { getRolesState } from "src/modules/user/slice"
import { useEffect, useState } from "react"
import { AppDispatch } from "src/store/store"
import { createGroup, deleteGroup, editGroup, getGroups } from "src/modules/group/thunk"
import { updateRolesState } from "src/modules/user/thunk"
import Swal from 'sweetalert2'

export interface GroupDto {
    id: number,
    name: string,
}

export const GroupsPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const [groups, setGroups] = useState([]);
    const roles = useSelector(getRolesState());

    const fetchGroupsAndSet = async () => {
        const response = await dispatch(getGroups());
        setGroups(response);
    };

    useEffect(() => {
        fetchGroupsAndSet();
        dispatch(updateRolesState());
    }, [dispatch]);

    const handleCreateGroup = async () => {
        const result = await showInputSwal('Введите название новой группы');
        if (result) {
            await dispatch(createGroup(result));
            fetchGroupsAndSet();
        }
    };

    const onEditClick = async (group: GroupDto) => {
        const result = await showInputSwal('Введите новое название группы', group.name);
        if (result) {
            await dispatch(editGroup({ id: group.id, name: result }));
            fetchGroupsAndSet();
        }
    };

    const onDeleteClick = async (id: number) => {
        const result = await showConfirmSwal('Вы уверены, что хотите удалить группу?');
        if (result) {
            await dispatch(deleteGroup(id));
            fetchGroupsAndSet();
        }
    };

    const showInputSwal = async (title: string, defaultValue?: string) => {
        const result = await Swal.fire({
            title,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValue: defaultValue,
            showCancelButton: true,
            confirmButtonText: 'Сохранить',
            cancelButtonText: 'Отмена',
            showLoaderOnConfirm: true,
            preConfirm: (name) => {
                if (!name) {
                    Swal.showValidationMessage('Название группы не может быть пустым');
                }
                return name;
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
        return result.value;
    };

    const showConfirmSwal = async (title: string) => {
        const result = await Swal.fire({
            title,
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отмена',
            showLoaderOnConfirm: true,
        });
        return result.isConfirmed;
    };

    return (
        <Container className={style.container} sx={{display: "flex", flexDirection: "column", marginBottom: "auto" }}>
            <Typography variant="h4" className={style.title}>
                Группы кампусных курсов
            </Typography>
            {roles && roles.isAdmin && (
                <Button 
                variant="contained" 
                className={style.deleteButton} 
                onClick={handleCreateGroup}
                >
                    Создать
                </Button>
            )}
            {groups?.map((group: GroupDto) => (
                <Card key={group.id} className={style.cardContainer}>
                    <Grid container alignItems="center">
                        {roles && roles.isAdmin ? (
                            <Grid item xs={12} sm={7}> 
                                <Typography variant="subtitle1" className={style.cardTitle}>
                                    {group.name}
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid item xs={12}> 
                                <Typography variant="subtitle1" className={style.cardTitle}>
                                    {group.name}
                                </Typography>
                            </Grid>
                        )}
                        {roles && roles.isAdmin && (
                        <Grid item xs={12} sm={5}> 
                            <Box className={style.buttonContainer}>
                                <Button 
                                    size="medium" 
                                    variant="contained" 
                                    onClick={() => onEditClick(group)}  
                                    className={style.editButton}>
                                    РЕДАКТИРОВАТЬ
                                </Button>
                                <Button 
                                    size="medium" 
                                    variant="contained" 
                                    onClick={() => onDeleteClick(group.id)}
                                    className={style.deleteButton}>
                                    УДАЛИТЬ
                                </Button>
                            </Box>
                        </Grid>
                        )}
                    </Grid>
                </Card>
            ))}
        </Container>
    );
}

