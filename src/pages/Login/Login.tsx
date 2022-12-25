import React from 'react';
import {View, ToastAndroid} from 'react-native';
import {Formik} from 'formik';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Text,
  Link,
  Alert,
} from 'native-base';
import {User, useQuery} from '../../models/User';
import validationSchema from './validations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const user = useQuery<User>('User');

  const login = (values: any) => {
    user.find(val => {
      return (
        Number(val.tc) === Number(values.tc) &&
        String(val.password) === String(values.password)
      );
    }) === undefined
      ? ToastAndroid.show('Wrong TC or password', ToastAndroid.SHORT)
      : user.find(val => {
          return (
            Number(val.tc) === Number(values.tc) &&
            String(val.password) === String(values.password) &&
            val.confirm === 'confirmed'
          );
        }) === undefined
      ? ToastAndroid.show('User not confirmed', ToastAndroid.SHORT)
      : navigation.navigate('Pages', {userTc: values.tc});
    storeData(values.tc);
  };

  const storeData = async (tc: string) => {
    try {
      await AsyncStorage.setItem('@tc', tc);
    } catch (e) {
      // saving error
    }
  };

  return (
    <View className="absolute self-center h-[100%] w-[100%] rounded-xl justify-center">
      <Formik
        initialValues={{
          tc: '1',
          password: '1',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          login(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Center className="w-full">
            <Box safeArea className="p-[1vh] w-[80%] py-[4vh] ">
              <Heading className="text-gray-800 font-semibold">Welcome</Heading>
              <Heading className="mt-[0.5vh] text-gray-600 font-medium text-sm">
                Login to continue
              </Heading>
              <VStack className="space-y-3 mt-[2.5vh]">
                <FormControl>
                  <FormControl.Label>TC</FormControl.Label>
                  <Input
                    onChangeText={handleChange('tc')}
                    onBlur={handleBlur('tc')}
                    value={String(values.tc)}
                    isInvalid={touched.tc && Boolean(errors.tc)}
                  />
                  {errors.tc && touched.tc && (
                    <Alert status="error">{errors.tc}</Alert>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={String(values.password)}
                    isInvalid={touched.password && Boolean(errors.password)}
                  />
                  {errors.password && touched.password && (
                    <Alert status="error">{errors.password}</Alert>
                  )}
                </FormControl>

                <Button
                  onPress={handleSubmit}
                  className="mt-[1vh] bg-indigo-900">
                  Login
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    I'm a new user.{' '}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => {
                      navigation.navigate('Sign Up');
                    }}>
                    Sigun Up
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        )}
      </Formik>
    </View>
  );
};

export default Login;
