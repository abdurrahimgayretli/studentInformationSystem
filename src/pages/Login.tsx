import React, {useEffect} from 'react';
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
  HStack,
  Text,
  Link,
} from 'native-base';
import {User, useQuery} from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const user = useQuery<User>('User');

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = (values: any) => {
    user.find(val => {
      return (
        val.tc === values.tc &&
        val.password === values.password &&
        val.confirm === 'confirmed'
      );
    }) !== undefined
      ? navigation.navigate('Pages', {userTc: values.tc})
      : console.log(false);
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
          tc: '11',
          password: '11',
        }}
        onSubmit={values => {
          login(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
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
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={String(values.password)}
                  />
                  <Link
                    _text={{
                      fontSize: 'xs',
                      fontWeight: '500',
                      color: 'indigo.500',
                    }}
                    alignSelf="flex-end"
                    mt="1">
                    Forget Password?
                  </Link>
                </FormControl>

                <Button
                  onPress={handleSubmit}
                  className="mt-[1vh] bg-indigo-900">
                  Sign up
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
