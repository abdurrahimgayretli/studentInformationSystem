import {View} from 'react-native';
import React from 'react';
import {Avatar, Card, DataTable} from 'react-native-paper';

const StudentInfo = () => {
  return (
    <View className="top-[10vh]">
      <Card className="bg-slate-100 pt-[3vh]">
        <Avatar.Image
          className="self-center"
          size={150}
          source={require('../../../assets/photo.png')}
        />

        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name-Surname</DataTable.Title>
              <DataTable.Title numeric>No</DataTable.Title>
            </DataTable.Header>
            <View className="top-[-2vh]">
              <DataTable.Row>
                <DataTable.Cell>Abdurrahim Gayretli</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
              </DataTable.Row>
            </View>
          </DataTable>
          <DataTable className="top-[-4vh]">
            <DataTable.Header>
              <DataTable.Title>Bölüm</DataTable.Title>
              <DataTable.Title numeric>Okuduğu Sınıf</DataTable.Title>
            </DataTable.Header>
            <View className="top-[-2vh]">
              <DataTable.Row>
                <DataTable.Cell>Bilgisayar Mühendisliği</DataTable.Cell>
                <DataTable.Cell numeric>4. Sınıf</DataTable.Cell>
              </DataTable.Row>
            </View>
          </DataTable>
        </Card.Content>
      </Card>
    </View>
  );
};

export default StudentInfo;
