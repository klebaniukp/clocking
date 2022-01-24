import passwordValidator from 'password-validator';

export const passwordSchema = new passwordValidator();

passwordSchema
    .is()
    .min(8)

    .is()
    .max(15)

    .has()
    .uppercase()

    .has()
    .lowercase()

    .has()
    .digits()

    .has()
    .not()
    .spaces();
