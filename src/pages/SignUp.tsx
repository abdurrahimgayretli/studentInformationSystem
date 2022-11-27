/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigate} from 'react-router-native';
import {SelectList} from 'react-native-dropdown-select-list';

const SignUp = () => {
  const navigate = useNavigate();
  const tittles = [
    {key: 'Student', value: 'Student'},
    {key: 'Lecturer', value: 'Lecturer'},
  ];
  return (
    <View className="absolute self-center bg-orange-200 w-[40vh] h-[50vh] rounded-xl top-[20vh] justify-center">
      <Formik
        initialValues={{
          name: '',
          surName: '',
          tc: 0,
          tittle: '',
        }}
        onSubmit={values => {
          console.log(values.name);
          navigate('/login');
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <Text className="absolute top-[2vh] self-center font-bold text-xl text-white">
              Sign Up
            </Text>
            <View className="w-[34vh] self-center">
              <TextInput
                mode="outlined"
                label={'Name'}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <TextInput
                mode="outlined"
                label={'Sur Name'}
                onChangeText={handleChange('surName')}
                onBlur={handleBlur('surName')}
                value={values.surName}
              />
              <TextInput
                mode="outlined"
                label={'TC'}
                onChangeText={handleChange('tc')}
                onBlur={handleBlur('tc')}
                value={String(values.tc)}
                keyboardType="numeric"
              />
              <Button
                className="top-[30vh] absolute"
                mode="elevated"
                onPress={handleSubmit}>
                Sign Up
              </Button>
              <View className="h-[7vh] top-[0.5vh]">
                <SelectList
                  boxStyles={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    borderColor: '#D0D5DD',
                  }}
                  dropdownStyles={{backgroundColor: 'white'}}
                  dropdownItemStyles={{backgroundColor: 'white'}}
                  defaultOption={{key: '', value: ''}}
                  data={tittles}
                  placeholder={'Tittle'}
                  save={'value'}
                  setSelected={(val: string) => {
                    values.tittle = val;
                  }}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;
