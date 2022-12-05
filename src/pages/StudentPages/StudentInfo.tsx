import {View} from 'react-native';
import React from 'react';
import {Avatar, Card, DataTable} from 'react-native-paper';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';

const StudentInfo = ({navigation}: any) => {
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
        <Text className="font-bold self-center text-lg">Student Info</Text>
      </HStack>
      <View className="h-[100%] absolute top-[20vh] w-[100%]">
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
    </>
  );
};

export default StudentInfo;
