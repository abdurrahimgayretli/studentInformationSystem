import React from 'react';
import {ScrollView, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';

const StudentPage = ({navigation, route}: any) => {
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
        <Text className="font-bold self-center text-lg">Lesson List</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center">
          <DataTable.Header>
            <DataTable.Title>Lesson Name</DataTable.Title>
            <DataTable.Title numeric>Lecturer's Name</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            <DataTable.Row>
              {user.lesson.map((val: any) => (
                <>
                  <DataTable.Cell>{val.lessonName}</DataTable.Cell>
                  <DataTable.Cell numeric>{val.lecturer.name}</DataTable.Cell>
                </>
              ))}
            </DataTable.Row>
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

export default StudentPage;
