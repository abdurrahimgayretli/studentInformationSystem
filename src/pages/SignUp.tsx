import React, {useCallback, useState} from 'react';
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
} from 'native-base';
import {User, useRealm} from '../models/User';

const SignUp = ({navigation}: any) => {
  const [selectTitle, setSelectTittle] = useState('');
  const titles = ['Student', 'Lecturer', 'Admin'];

  const realm = useRealm();

  const handleRegisterUser = useCallback(
    (
      tc: string,
      name: string,
      surName: string,
      telNo: string,
      mail: string,
      title: string,
    ): void => {
      if (!tc) {
        return;
      }
      realm.write(() => {
        realm.create(
          selectTitle,
          User.register(
            tc,
            name,
            surName,
            telNo,
            mail,
            title,
            tc,
            selectTitle === 'Admin' ? 'confirmed' : 'not confirmed',
          ),
        );
        realm.create(
          'User',
          User.checkUser(
            name,
            surName,
            tc,
            tc,
            title,
            selectTitle === 'Admin' ? 'confirmed' : 'not confirmed',
          ),
        );
      });
    },
    [realm, selectTitle],
  );

  return (
    <View className="absolute self-center h-[100%] w-[100%] rounded-xl justify-center">
      <Formik
        initialValues={{
          name: 'test',
          surName: 'test',
          tc: 11,
          telNo: 11,
          mail: 'test@gmail.com',
          title: 'Student',
        }}
        onSubmit={values => {
          handleRegisterUser(
            String(values.tc),
            values.name,
            values.surName,
            String(values.telNo),
            values.mail,
            values.title,
          );
          navigation.navigate('Login');
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
                  <FormControl.Label>Telephone Number</FormControl.Label>
                  <Input
                    onChangeText={handleChange('telNo')}
                    onBlur={handleBlur('telNo')}
                    value={String(values.telNo)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Mail</FormControl.Label>
                  <Input
                    onChangeText={handleChange('mail')}
                    onBlur={handleBlur('mail')}
                    value={values.mail}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Tittle</FormControl.Label>
                  <Select
                    selectedValue={selectTitle}
                    defaultValue={selectTitle[0]}
                    placeholder={'Choose Title'}
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
