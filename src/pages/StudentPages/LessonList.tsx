import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';
import {User, useQuery} from '../../models/User';
import {Lesson} from '../../models/Lesson';

const StudentPage = ({navigation, route}: any) => {
  const {user} = route.params;

  const students = useQuery<User>('Student');
  const [student] = useState<User>(
    students.filter(stud => {
      return stud.tc === user.tc;
    })[0],
  );

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
            {student?.lesson.map((les: Lesson, k) => (
              <View key={k}>
                {les.lecturer.map((lec: User, i) => (
                  <DataTable.Row key={i}>
                    <DataTable.Cell>{les.lessonName}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {lec.name + ' ' + lec.surName}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </View>
            ))}
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

export default StudentPage;
