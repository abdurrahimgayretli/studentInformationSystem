import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from 'native-base';
import {useNavigate} from 'react-router-native';

const Login = () => {
  const navigate = useNavigate();

  return (
    <View className="absolute self-center h-[100%] w-[100%] rounded-xl justify-center">
      <Formik
        initialValues={{
          tc: '',
          password: '',
        }}
        onSubmit={values => {
          console.log(values);

          navigate('/mainPage');
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
                  <FormControl.Label>TC</FormControl.Label>
                  <Input
                    onChangeText={handleChange('tc')}
                    onBlur={handleBlur('tc')}
                    value={String(values.tc)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={String(values.password)}
                  />
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

export default Login;
