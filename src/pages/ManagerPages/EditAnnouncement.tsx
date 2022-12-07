import {View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IconButton,
  HamburgerIcon,
  HStack,
  Text,
  ThreeDotsIcon,
  DeleteIcon,
  AddIcon,
} from 'native-base';
import AddAnnouncementModal from '../../components/AddAnnouncementModal';

const EditAnnouncement = ({navigation}: any) => {
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
        <Text className="font-bold self-center text-lg">Edit Announcement</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
          <DataTable.Header>
            <DataTable.Title>Announcement's Name</DataTable.Title>
            <DataTable.Title numeric>Select Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            <HStack>
              <DataTable.Cell
                onPress={() => {
                  setVisible(true);
                }}>
                Hoşgeliniz
              </DataTable.Cell>
              <IconButton
                onPress={() => {
                  navigation.goBack();
                }}
                className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                colorScheme="blue"
                icon={<ThreeDotsIcon />}
                variant="solid"
              />
              <IconButton
                onPress={() => {
                  navigation.goBack();
                }}
                className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                colorScheme="red"
                icon={<DeleteIcon />}
                variant="solid"
              />
            </HStack>
          </ScrollView>
        </DataTable>
        <View className="absolute self-end right-[2vh] bottom-[10vh]">
          <IconButton
            onPress={() => {
              setVisible(true);
            }}
            className=" rounded-full m-[1vh]"
            colorScheme="blue"
            size={16}
            icon={<AddIcon />}
            _icon={{size: '2xl'}}
            variant="solid"
          />
        </View>
      </View>
      {visible && (
        <View className="">
          <AddAnnouncementModal show={visible} notShow={hidden} />
        </View>
      )}
    </>
  );
};

export default EditAnnouncement;
