/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigate} from 'react-router-native';

const Login = () => {
  const navigate = useNavigate();

  return (
    <View className="absolute self-center bg-orange-200 w-[40vh] h-[30vh] rounded-xl top-[30vh] justify-center">
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
          <>
            <Text className="absolute top-[2vh] self-center font-bold text-xl text-white">
              Login
            </Text>
            <View className="w-[34vh] self-center">
              <TextInput
                mode="outlined"
                label={'TC'}
                onChangeText={handleChange('tc')}
                onBlur={handleBlur('tc')}
                value={values.tc}
              />
              <TextInput
                mode="outlined"
                label={'Password'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Button
                className="top-[16vh] absolute"
                mode="elevated"
                onPress={handleSubmit}>
                Sign Up
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;
