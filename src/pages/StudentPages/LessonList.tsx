import React from 'react';
import {ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';

const StudentPage = () => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Lesson Name</DataTable.Title>
        <DataTable.Title numeric>Lecturer's Name</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        <DataTable.Row>
          <DataTable.Cell>Mobil Programlama</DataTable.Cell>
          <DataTable.Cell numeric>Ferhat Bozkurt</DataTable.Cell>
        </DataTable.Row>
      </ScrollView>
    </DataTable>
  );
};

export default StudentPage;
