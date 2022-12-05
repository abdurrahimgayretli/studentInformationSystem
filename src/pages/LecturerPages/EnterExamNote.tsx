import {View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import NoteModel from '../../components/NoteModal';
import {IconButton, AddIcon, DeleteIcon, ThreeDotsIcon} from 'native-base';

const EnterExamNote = ({navigation}: any) => {
  const [visible, setVisible] = React.useState(false);
  const hidden = () => setVisible(false);
  React.useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <View className="h-[100%] w-[100%] top-[1vh] absolute">
      <DataTable className="w-[90%] h-[90%] self-center ">
        <DataTable.Header>
          <DataTable.Title>Exam's Name</DataTable.Title>
          <DataTable.Title>Note</DataTable.Title>
          <DataTable.Title numeric>Confirm</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          <DataTable.Row>
            <DataTable.Cell>Vize</DataTable.Cell>
            <DataTable.Cell className="left-[4vh]">60</DataTable.Cell>
            <DataTable.Cell className="-right-[8vh]">
              <View>
                <IconButton
                  onPress={() => {
                    navigation.goBack();
                  }}
                  className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                  colorScheme="cyan"
                  icon={<ThreeDotsIcon />}
                  variant="solid"
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell className="-right-[5vh]">
              <View>
                <IconButton
                  onPress={() => {
                    navigation.goBack();
                  }}
                  className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  variant="solid"
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </ScrollView>
      </DataTable>
      <View className="absolute self-end right-[2vh] bottom-[5vh]">
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
          <NoteModel show={visible} notShow={hidden} />
        </View>
      )}
    </View>
  );
};

export default EnterExamNote;
