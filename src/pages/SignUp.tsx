import React, {useState} from 'react';
import {Formik} from 'formik';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Select,
  CheckIcon,
  View,
} from 'native-base';
import {useNavigate} from 'react-router-native';

const SignUp = () => {
  const navigate = useNavigate();
  const tittles = ['Student', 'Lecturer'];
  const [tittle, setTittle] = useState('');

  return (
    <View className="absolute self-center h-[100%] w-[100%] rounded-xl justify-center">
      <Formik
        initialValues={{
          name: '',
          surName: '',
          tc: 0,
          tittle: '',
        }}
        onSubmit={values => {
          console.log(values);
          navigate('/login');
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <Center className="w-full">
            <Box safeArea className="p-[1vh] w-[80%] py-[4vh] ">
              <Heading className="text-gray-800 font-semibold">Welcome</Heading>
              <Heading className="mt-[0.5vh] text-gray-600 font-medium text-sm">
                Sign up to continue!
              </Heading>
              <VStack className="space-y-3 mt-[2.5vh]">
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Surname</FormControl.Label>
                  <Input
                    onChangeText={handleChange('surName')}
                    onBlur={handleBlur('surName')}
                    value={values.surName}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>TC</FormControl.Label>
                  <Input
                    onChangeText={handleChange('tc')}
                    onBlur={handleBlur('tc')}
                    value={String(values.tc)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Tittle</FormControl.Label>

                  <Select
                    selectedValue={tittle}
                    placeholder={'Choose Tittle'}
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={'2'} />,
                    }}
                    onValueChange={itemValue => {
                      setTittle(itemValue);
                      values.tittle = itemValue;
                    }}>
                    {tittles.map((elem, i) => {
                      return (
                        <Select.Item
                          key={i}
                          label={String(elem)}
                          value={String(elem)}
                        />
                      );
                    })}
                  </Select>
                </FormControl>
                <Button
                  onPress={handleSubmit}
                  className="mt-[1vh] bg-indigo-900">
                  Sign up
                </Button>
              </VStack>
            </Box>
          </Center>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
