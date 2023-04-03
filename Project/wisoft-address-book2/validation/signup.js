export async function validation(dto) {
    const username = validationUsername(dto.username);
    const id = validationId(dto.id);
    const password = validationPassword(dto.password);

    return {username, id, password};
}

function validationUsername(username) {
    if (username.length >= 2
        && username.length <= 4) {
        return "username 정상 입력";
    }
    return "username 비정상 입력";
}

function validationId(id) {
    if (id.length >= 4 && id.length <= 12) {
        return "id 정상 입력";
    }
    return "id 비정상 입력";
}

function validationPassword(password) {
    if (password.length >= 4 && password.length <= 10) {
        return "password 정상 입력";
    }
    return "password 비정상 입력";
}


