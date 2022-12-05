import {View} from 'react-native';
import React from 'react';
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

const ConfirmStudents = ({navigation}: any) => {
  const [visible, setVisible] = React.useState(false);
  const hidden = () => setVisible(false);
  React.useEffect(() => {
    console.log(visible);
  }, [visible]);

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
            <HStack>
              <DataTable.Cell
                onPress={() => {
                  setVisible(true);
                }}>
                Abdurrahim Gayretli
              </DataTable.Cell>

              <IconButton
                onPress={() => {
                  navigation.goBack();
                }}
                className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                colorScheme="cyan"
                icon={<CloseIcon />}
                variant="solid"
              />

              <IconButton
                onPress={() => {
                  navigation.goBack();
                }}
                className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                colorScheme="red"
                icon={<CheckIcon />}
                variant="solid"
              />
            </HStack>
          </ScrollView>
        </DataTable>
      </View>
      {visible && (
        <View className="">
          <ConfirmStudentModal show={visible} notShow={hidden} />
        </View>
      )}
    </>
  );
};

export default ConfirmStudents;
