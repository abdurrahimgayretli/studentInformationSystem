import {View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const SelectStudents = ({navigation}: any) => {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Student's Name</DataTable.Title>
          <DataTable.Title numeric>Lesson's Name</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          <DataTable.Row
            onPress={() => {
              navigation.navigate("Enter Exam's Note");
            }}>
            <DataTable.Cell>Abdurrahim Gayretli</DataTable.Cell>
            <DataTable.Cell numeric>Mobil Programlama</DataTable.Cell>
          </DataTable.Row>
        </ScrollView>
      </DataTable>
    </View>
  );
};

export default SelectStudents;
