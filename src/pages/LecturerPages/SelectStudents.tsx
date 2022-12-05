import {View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';

const SelectStudents = ({navigation}: any) => {
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
        <Text className="font-bold self-center text-lg">Select Students</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
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
    </>
  );
};

export default SelectStudents;
