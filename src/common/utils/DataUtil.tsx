export const getSemesterByValue = (value: string) => {
    switch (value) {
        case "Spring":
            return "Весенний";
        case "Autumn":
            return "Осенний";
    }
    return "Весенний";
}

export const getStatusByValue = (value: string) => {
    switch (value) {
        case "Finished":
            return "Закрыт";
        case "OpenForAssigning":
            return "Открыт для записи";
        case "Started":
            return "В процессе обучения";
        case "Created":
            return "Создан";
    }
    return "Не определен";
}

export const getStatusColorByValue = (value: string) => {
    switch (value) {
        case "Finished":
            return "#dc3545";
        case "OpenForAssigning":
            return "#309261";
        case "Started":
            return "#0d91fe";
        case "Created":
            return "#6d7583";
    }
    return "#6d7583";
}

export const getStudentStatusByValue = (value: string) => {
    switch (value) {
        case "Declined":
            return "отклонен";
        case "Accepted":
            return "принят";
        case "InQueue":
            return "в очереди";
    }
    return "не определен";
}

export const getStudentStatusColorByValue = (value: string) => {
    switch (value) {
        case "Declined":
            return "#d33665";
        case "Accepted":
            return "#349779";
        case "InQueue":
            return "#3172fd";
    }
    return "#6d7583";
}

export const getCertificationText = (value: string) => {
    switch (value) {
        case "NotDefined":
            return "Не оценено";
        case "Failed":
            return "Не сдано";
        case "Passed":
            return "Сдано";
    }
    return "Не оценено";
}

export const getCertificationColor = (value: string) => {
    switch (value) {
        case "NotDefined":
            return "info";
        case "Failed":
            return "error";
        case "Passed":
            return "success";
        default:
            return "info";
    }    
}

export const getChangeStatusInputOptions = (status: string) => {
    switch (status) {
        case "":
            return {};
        case "Finished":
            return {};
        case "OpenForAssigning":
            return {
                "OpenForAssigning": "Запись",
                "Started": "В процессе",
                "Finished": "Закрыт"
            };
        case "Started":
            return {
                "Started": "В процессе",
                "Finished": "Закрыт"
            };
        case "Created":
            return {
                "OpenForAssigning": "Запись",
                "Started": "В процессе",
                "Finished": "Закрыт"
            };
        default:
            return {
                "Finished": "Закрыт",
                "OpenForAssigning": "Запись",
                "Started": "В процессе",
                "Created": "Создан"
            };
    }
};