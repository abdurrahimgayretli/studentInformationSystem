import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';
import {useQuery, User} from '../../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Lesson} from '../../models/Lesson';
const SelectStudents = ({navigation}: any) => {
  const lecturers = useQuery<User>('Lecturer');
  const students = useQuery<User>('Student');
  const lessons = useQuery<Lesson>('Lesson');

  const [lecturer, setLecturer] = useState<User>(lecturers[0]);

  const getData = async () => {
    try {
      const tc = await AsyncStorage.getItem('@tc');
      setLecturer(
        lecturers.filter(val => {
          return val.tc === tc;
        })[0],
      );
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
            {students.map(student => {
              return student.lesson
                .filter((lesson: Lesson | any) => {
                  return lesson?.lecturer[0].tc === lecturer.tc;
                })
                .map((val, i) => (
                  <DataTable.Row
                    key={i}
                    onPress={() => {
                      navigation.navigate("Enter Exam's Note", {
                        studentTc: student.tc,
                        studentLesson: val.lessonName,
                      });
                    }}>
                    <DataTable.Cell>
                      <Text className="capitalize">
                        {student.name + ' ' + student.surName}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric>{val.lessonName}</DataTable.Cell>
                  </DataTable.Row>
                ));
            })}
            {/* {lecturer.lesson.map((val: Lesson) =>
              val.students.map((student, i) => (
                
              )),
            )} */}
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

export default SelectStudents;
