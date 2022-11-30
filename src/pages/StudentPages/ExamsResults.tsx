import {ScrollView, View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';

const ExamsResults = () => {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Lesson Name</DataTable.Title>
          <DataTable.Title numeric>Exam's Name</DataTable.Title>
          <DataTable.Title numeric>Note</DataTable.Title>
          <DataTable.Title numeric>Letter Grade</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          <DataTable.Row>
            <DataTable.Cell>Mobil Programlama</DataTable.Cell>
            <DataTable.Cell numeric>Vize</DataTable.Cell>
            <DataTable.Cell numeric>50</DataTable.Cell>
            <DataTable.Cell numeric>AA</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Mobil Programlama</DataTable.Cell>
            <DataTable.Cell numeric>Vize</DataTable.Cell>
            <DataTable.Cell numeric>60</DataTable.Cell>
            <DataTable.Cell numeric>AA</DataTable.Cell>
          </DataTable.Row>
        </ScrollView>
      </DataTable>
    </View>
  );
};

export default ExamsResults;
