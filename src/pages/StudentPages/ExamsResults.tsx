import {ScrollView, View} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';

const ExamsResults = ({navigation}: any) => {
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
        <Text className="font-bold self-center text-lg">Exam's Results</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
          <HStack className="mt-[1vh] space-x-7">
            <Text className="text-gray-500 text-xs">Lesson Name</Text>
            <Text className="text-gray-500 text-xs">Exam's Name</Text>
            <Text className="text-gray-500 text-xs">Note</Text>
            <Text className="text-gray-500 text-xs">Letter Grade</Text>
          </HStack>
          <ScrollView>
            <DataTable.Row>
              <DataTable.Cell className="right-[1vh]">
                Mobil Programlama
              </DataTable.Cell>
              <DataTable.Cell numeric>Vize</DataTable.Cell>
              <DataTable.Cell numeric>50</DataTable.Cell>
              <DataTable.Cell numeric>AA</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell className="right-[1vh]">
                Mobil Programlama
              </DataTable.Cell>
              <DataTable.Cell numeric>Vize</DataTable.Cell>
              <DataTable.Cell numeric>60</DataTable.Cell>
              <DataTable.Cell numeric>AA</DataTable.Cell>
            </DataTable.Row>
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

export default ExamsResults;
