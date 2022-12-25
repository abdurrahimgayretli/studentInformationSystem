/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Modal, Portal, Title} from 'react-native-paper';
import {
  NativeBaseProvider,
  IconButton,
  CheckIcon,
  VStack,
  View,
  Input,
} from 'native-base';
import {User, useQuery, useRealm} from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassModal = () => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const realm = useRealm();
  const users = useQuery<User>('User');
  const [user, setUser] = useState<User>(users[0]);

  const getData = async () => {
    try {
      const tc = await AsyncStorage.getItem('@tc');
      setUser(
        users.filter(val => {
          return val.tc === Number(tc);
        })[0],
      );
    } catch (e) {
      // error reading value
    }
  };

  const handleChangePass = () => {
    realm.write(() => {
      if (confirmPass === pass) {
        user.password = pass;
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={true}
          contentContainerStyle={{
            alignSelf: 'center',
            width: 300,
            borderRadius: 8,
            height: 300,
            backgroundColor: 'white',
          }}>
          <VStack className="space-y-[10vh] self-center">
            <Title className="pb-[2vh] self-center">Change Password</Title>
            <View className="w-[30vh]">
              <Input
                type="password"
                placeholder="Password"
                onChangeText={setPass}
                value={pass}
              />
            </View>
            <View className="w-[30vh]">
              <Input
                type="password"
                value={confirmPass}
                onChangeText={setConfirmPass}
                placeholder="Confirm Password"
              />
            </View>

            <IconButton
              onPress={() => {
                handleChangePass();
              }}
              className="h-[6vh] w-[20vh] self-center rounded-lg"
              colorScheme="green"
              icon={<CheckIcon />}
              variant="solid"
            />
          </VStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default ChangePassModal;
