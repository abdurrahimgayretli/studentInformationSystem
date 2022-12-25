/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
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
  HStack,
  Text,
  Link,
  Alert,
} from 'native-base';
import validationSchema from './validations';
import {User, useQuery, useRealm} from '../../models/User';
import {ToastAndroid} from 'react-native';

const SignUp = ({navigation}: any) => {
  const titles = ['Student', 'Lecturer'];
  const [selectTitle, setSelectTittle] = useState(titles[0]);

  const realm = useRealm();
  const users = useQuery<User>('User');

  const handleRegisterUser = useCallback(
    (
      tc: number,
      name: string,
      surName: string,
      telNo: number,
      mail: string,
      title: string,
    ): void => {
      if (!tc) {
        return;
      }
      realm.write(() => {
        if (
          users.find((user: User) => {
            return user.tc === tc;
          }) === undefined
        ) {
          realm.create(
            selectTitle,
            User.register(
              tc,
              name,
              surName,
              telNo,
              mail,
              title,
              String(tc),
              title === 'Admin' ? 'confirmed' : 'not confirmed',
            ),
          );
          realm.create(
            'User',
            User.checkUser(
              name,
              surName,
              tc,
              String(tc),
              title,
              title === 'Admin' ? 'confirmed' : 'not confirmed',
            ),
          );
          navigation.navigate('Login');
        } else {
          ToastAndroid.show('There is a registered user', ToastAndroid.SHORT);
        }
      });
    },
    [realm, selectTitle, users],
  );

  useEffect(() => {
    if (
      users.find((user: User) => {
        return user.title === 'Admin';
      }) === undefined
    ) {
      setSelectTittle('Admin');
      handleRegisterUser(1, 'Admin', 'Admin', 1, 'admin@gmail.com', 'Admin');
    }
  }, []);

  return (
    <View className="absolute self-center h-[100%] w-[100%] rounded-xl justify-center">
      <Formik
        initialValues={{
          name: '',
          surName: '',
          tc: 0,
          telNo: 0,
          mail: '',
          title: 'Student',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          handleRegisterUser(
            Number(values.tc),
            values.name,
            values.surName,
            Number(values.telNo),
            values.mail,
            values.title,
          );
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
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
                    isInvalid={touched.name && Boolean(errors.name)}
                  />
                  {errors.name && touched.name && (
                    <Alert status="error">{errors.name}</Alert>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Surname</FormControl.Label>
                  <Input
                    onChangeText={handleChange('surName')}
                    onBlur={handleBlur('surName')}
                    value={values.surName}
                    isInvalid={touched.surName && Boolean(errors.surName)}
                  />
                  {errors.surName && touched.surName && (
                    <Alert status="error">{errors.surName}</Alert>
                  )}
                </FormControl>
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
                  <FormControl.Label>Telephone Number</FormControl.Label>
                  <Input
                    onChangeText={handleChange('telNo')}
                    onBlur={handleBlur('telNo')}
                    value={String(values.telNo)}
                    isInvalid={touched.telNo && Boolean(errors.telNo)}
                  />
                  {errors.telNo && touched.telNo && (
                    <Alert status="error">{errors.telNo}</Alert>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Mail</FormControl.Label>
                  <Input
                    onChangeText={handleChange('mail')}
                    onBlur={handleBlur('mail')}
                    value={values.mail}
                    isInvalid={touched.mail && Boolean(errors.mail)}
                  />
                  {errors.mail && touched.mail && (
                    <Alert status="error">{errors.mail}</Alert>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Tittle</FormControl.Label>
                  <Select
                    selectedValue={selectTitle}
                    defaultValue={titles[0]}
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={'2'} />,
                    }}
                    onValueChange={itemValue => {
                      setSelectTittle(itemValue);
                      values.title = itemValue;
                    }}>
                    {titles.map((elem, i) => {
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

                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}>
                    I'm a saved user{' '}
                  </Text>
                  <Link
                    _text={{
                      color: 'indigo.500',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                    }}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    Login Page
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

export default SignUp;
