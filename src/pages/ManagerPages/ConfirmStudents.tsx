import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IconButton,
  HamburgerIcon,
  HStack,
  Text,
  CloseIcon,
  CheckIcon,
} from 'native-base';
import ConfirmStudentModal from '../../components/ConfirmStudentModal';
import {User, useQuery, useRealm} from '../../models/User';

const ConfirmStudents = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);
  const hidden = () => setVisible(false);

  const realm = useRealm();
  const users = useQuery<User>('User');
  const students = useQuery<User>('Student');
  const [userID, setUserID] = useState('');
  const [user, setUser] = useState<User>(users[0]);

  const handleDeleteUser = (id: any) => {
    realm.write(() => {
      realm.delete(
        realm.objects<User>('User').filter((listObj: User) => {
          setUser(listObj);
          return String(listObj._id) === String(id);
        }),
      );
      realm.delete(
        realm.objects<User>(user.title).filter((listObj: User) => {
          return String(listObj.tc) === String(user.tc);
        }),
      );
    });
  };
  const handleUpdateUser = (id: any) => {
    realm.write(() => {
      const obj = users.filter((listObj: any) => {
        return String(listObj._id) === String(id);
      });
      obj[0].confirm = 'confirmed';
    });
  };

  return (
    <>
      <HStack>
        <IconButton
          onPress={() => {
            navigation.openDrawer();
          }}
          className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
          colorScheme="gray"
          icon={<HamburgerIcon />}
          variant="solid"
        />
        <Text className="font-bold self-center text-lg">Confirm Students</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
          <DataTable.Header>
            <DataTable.Title>Student's Name</DataTable.Title>
            <DataTable.Title numeric>Select Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {users
              .filter(elem => elem.confirm !== 'confirmed')
              .map((val, i) => (
                <HStack key={i}>
                  <DataTable.Cell
                    onPress={() => {
                      setUserID(String(val._id));
                      setVisible(true);
                    }}>
                    <Text className="capitalize">
                      {val.name + ' ' + val.surName}
                    </Text>
                  </DataTable.Cell>

                  <IconButton
                    onPress={() => {
                      handleDeleteUser(val._id);
                    }}
                    className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                    colorScheme="red"
                    icon={<CloseIcon />}
                    variant="solid"
                  />

                  <IconButton
                    onPress={() => {
                      handleUpdateUser(val._id);
                    }}
                    className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                    colorScheme="cyan"
                    icon={<CheckIcon />}
                    variant="solid"
                  />
                </HStack>
              ))}
          </ScrollView>
        </DataTable>
      </View>
      {visible && (
        <View className="">
          <ConfirmStudentModal
            show={visible}
            notShow={hidden}
            userID={userID}
          />
        </View>
      )}
    </>
  );
};

export default ConfirmStudents;
