
export const isLoggedIn = () => {
    const idUser = window.localStorage.getItem('idUser');
    const myCourses = window.localStorage.getItem('myCourses');
    const sortStatus = window.localStorage.getItem('sortStatus');
    const topicStates = window.localStorage.getItem('topicStates');
    const token = window.localStorage.getItem('token');
    const refresh = window.localStorage.getItem('refresh');

    if (idUser && myCourses && sortStatus && topicStates && token && refresh) {
        return true;
    } else {
        return false;
    }
}