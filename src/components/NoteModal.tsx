/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  Modal,
  DataTable,
  IconButton,
  TextInput,
  Portal,
} from 'react-native-paper';
import {View} from 'react-native';

const NoteModel = (props: any) => {
  return (
    <Portal>
      <Modal
        visible={props.show}
        onDismiss={props.notShow}
        contentContainerStyle={{
          height: 150,
          backgroundColor: 'white',
        }}>
        <DataTable className="-top-[1vh]">
          <DataTable.Header>
            <DataTable.Title>Exam's Name</DataTable.Title>
            <DataTable.Title className="left-[2vh]">Note</DataTable.Title>
            <DataTable.Title numeric>Confirm</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>
              <View className="w-[10vh]">
                <TextInput mode="outlined" />
              </View>
              ;
            </DataTable.Cell>
            <DataTable.Cell>
              <View className="w-[10vh]">
                <TextInput mode="outlined" />
              </View>
              ;
            </DataTable.Cell>
            <DataTable.Cell className="-right-[8vh]">
              <View>
                <IconButton
                  onPress={props.notShow}
                  icon={require('../../assets/add.png')}
                  mode="outlined"
                  size={30}
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Modal>
    </Portal>
  );
};

export default NoteModel;
