import * as Yup from 'yup';

export const schema = Yup.object().shape({
    password: Yup.string(),
    user: Yup.string()
});