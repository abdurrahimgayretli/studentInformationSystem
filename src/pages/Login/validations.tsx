import * as yup from 'yup';

const validations = yup.object().shape({
  tc: yup.number().required(),
  password: yup.string().required(),
});

export default validations;
