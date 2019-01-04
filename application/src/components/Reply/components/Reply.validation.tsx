import * as Yup from 'yup';

export const schema = Yup.object().shape({
    reply: Yup.string()
        .max(1000, "Te excediste los 1000 caracteres"),
});