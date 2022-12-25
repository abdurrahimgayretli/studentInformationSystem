import * as yup from 'yup';

const validations = yup.object().shape({
  name: yup.string().min(3).required(),
  surName: yup.string().min(3).required(),
  tc: yup
    .number()
    .min(11111111111, 'invalid tc number')
    .max(99999999999, 'invalid tc number')
    .required(),
  telNo: yup
    .number()
    .min(1111111111, 'invalid mobile number')
    .max(9999999999, 'invalid mobile number')
    .required(),
  mail: yup.string().email().required(),
  title: yup.string().required(),
});

export default validations;
