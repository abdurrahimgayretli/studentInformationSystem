import {View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IconButton,
  AddIcon,
  DeleteIcon,
  ThreeDotsIcon,
  HStack,
  VStack,
  Text,
  HamburgerIcon,
} from 'native-base';
import AddLessonModal from '../../components/AddLessonModal';

const EditLessonList = ({navigation}: any) => {
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
            <DataTable.Title>Lesson's Name</DataTable.Title>
            <DataTable.Title numeric>Select Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            <HStack className="pt-[1vh] space-x-[80vh] self-center">
              <VStack space={3}>
                <Text className="text-sm truncate max-w-[20vh] h-[5vh] top-[1vh]">
                  Mobil Programlama
                </Text>
              </VStack>
              <VStack space={4}>
                <HStack space={4}>
                  <IconButton
                    onPress={() => {
                      navigation.goBack();
                    }}
                    className="h-[5vh] w-[5vh] rounded-lg"
                    colorScheme="blue"
                    icon={<ThreeDotsIcon />}
                    variant="solid"
                  />
                  <IconButton
                    onPress={() => {
                      navigation.goBack();
                    }}
                    className="h-[5vh] w-[5vh] rounded-lg"
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    variant="solid"
                  />
                </HStack>
              </VStack>
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
        {visible && (
          <View className="">
            <AddLessonModal show={visible} notShow={hidden} />
          </View>
        )}
      </View>
    </>
  );
};

export default EditLessonList;
