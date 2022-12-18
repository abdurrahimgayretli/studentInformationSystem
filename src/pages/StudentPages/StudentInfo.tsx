import {View} from 'react-native';
import React from 'react';
import {Avatar, Card, DataTable} from 'react-native-paper';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';

const StudentInfo = ({navigation, route}: any) => {
  const {user} = route.params;

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
                <DataTable.Title numeric>Tc</DataTable.Title>
              </DataTable.Header>
              <View className="top-[-2vh]">
                <DataTable.Row>
                  <DataTable.Cell>
                    <Text className="capitalize">
                      {user.name + ' ' + user.surName}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{user.tc}</DataTable.Cell>
                </DataTable.Row>
              </View>
            </DataTable>
            <DataTable className="top-[-4vh]">
              <DataTable.Header>
                <DataTable.Title>Telephone Number</DataTable.Title>
                <DataTable.Title numeric>Mail</DataTable.Title>
              </DataTable.Header>
              <View className="top-[-2vh]">
                <DataTable.Row>
                  <DataTable.Cell>{user.telNo}</DataTable.Cell>
                  <DataTable.Cell numeric>{user.mail}</DataTable.Cell>
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
