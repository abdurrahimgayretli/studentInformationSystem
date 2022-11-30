import {View} from 'react-native';
import React from 'react';
import {DataTable, IconButton} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import NoteModel from '../../components/NoteModal';

const EnterExamNote = ({navigation}: any) => {
  const [visible, setVisible] = React.useState(false);
  const hidden = () => setVisible(false);
  React.useEffect(() => {
    console.log(visible);
  }, [visible]);

  return (
    <View className="">
      <DataTable>
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
                  icon={require('../../../assets/delete.png')}
                  mode="outlined"
                  size={30}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell className="-right-[5vh]">
              <View>
                <IconButton
                  onPress={() => {
                    navigation.goBack();
                  }}
                  icon={require('../../../assets/edit.png')}
                  mode="outlined"
                  size={30}
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </ScrollView>
      </DataTable>
      <View className="absolute self-end right-[2vh] top-[70vh]">
        <IconButton
          onPress={() => {
            setVisible(true);
          }}
          icon={require('../../../assets/add.png')}
          mode="outlined"
          size={40}
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
