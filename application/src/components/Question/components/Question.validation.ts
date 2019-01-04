import * as Yup from 'yup';

export const errorRequiredMessage = 'Esta pregunta necesita más información';
export const errorMaxTitleMessage = 'Te excediste los 100 caracteres';
export const errorMaxDescriptionMessage = 'Te excediste los 1000 caracteres';
export const errorRequiredCoinMessage = 'Ingrese un valor';
export const  getSchema = (coin: number) => {
    if (coin === 0) {
        return Yup.object().shape({
            category_id: Yup.string()
                            .required('Por favor selecciona un curso'),
            description: Yup.string()
                            .max(1000,errorMaxDescriptionMessage),
            title: Yup.string()
                      .required('Por favor escribe una pregunta')
                      .min(10,errorRequiredMessage)
                      .max(100,errorMaxTitleMessage),
        });
    } else {
        return Yup.object().shape({
            category_id: Yup.string()
                            .required('Por favor selecciona un curso'),
            coin: Yup.number()
                     .required(errorRequiredCoinMessage)
                     .positive('El número debe ser positivo')
                     .integer('El número no debe tener decimales')
                     .lessThan((coin + 1), '<strong style="font-family: Raleway Bold, sans-serif;">No tienes suficientes coins para dar esa recompensa,</strong> responde las preguntas de tus compañeros para ganar coins'),
            description: Yup.string()
                            .max(1000,errorMaxDescriptionMessage),
            title: Yup.string()
                      .required('Por favor escribe una pregunta')
                      .min(10,errorRequiredMessage)
                      .max(100,errorMaxTitleMessage),
        });
    }
}
