/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Modal, Portal} from 'react-native-paper';
import {
  HStack,
  NativeBaseProvider,
  Text,
  IconButton,
  CheckIcon,
  VStack,
  Select,
  ScrollView,
  Box,
  View,
  CloseIcon,
} from 'native-base';
import {useQuery, useRealm} from '../models/User';

const AddStudentToLesson = (props: any) => {
  const [selectStudent, setSelectStudent] = React.useState('');

  const realm = useRealm();

  const students = useQuery<any>('Student');
  const [studentArray, setStudentArray] = React.useState<String[]>([]);

  const lesson = useQuery<any>('Lesson');

  const addLessontoStudent = (studentName: string) => {
    return props.student(
      students.find(val => {
        return val.name === String(studentName.split(' ')[0]);
      }).name,
    );
  };

  const isThereLesson = () => {
    return Boolean(
      students
        .filter(val => {
          return String(val.name) === String(selectStudent.split(' ')[0]);
        })[0]
        ?.lesson.filter((elem: any) => {
          return elem.lessonName === props.lessonName;
        }).length === 0,
    );
  };

  useEffect(() => {
    selectStudent !== '' && console.log(isThereLesson());
  }, [selectStudent]);

  useEffect(() => {
    students.forEach(val => {
      return setStudentArray(oldArray => [
        ...oldArray,
        String(val.name) + ' ' + String(val.surName),
      ]);
    });
  }, []);

  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={props.show}
          onDismiss={props.notShow}
          contentContainerStyle={{
            alignSelf: 'center',
            width: 300,
            borderRadius: 8,
            height: 400,
            backgroundColor: 'white',
          }}>
          <VStack className="space-y-[20vh] self-center">
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Lesson's Name</Text>
              <Text>{props.lessonName}</Text>
            </VStack>
            <HStack space={4}>
              <VStack className="self-end" space={4}>
                <Text className="text-gray-500 text-xs w-[25vh]">
                  Select Student
                </Text>
                <Select
                  selectedValue={selectStudent}
                  placeholder={'Choose Title'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={'2'} />,
                  }}
                  onValueChange={itemValue => {
                    setSelectStudent(itemValue);
                    addLessontoStudent(itemValue);
                  }}>
                  {studentArray.map((elem, i) => {
                    return (
                      <Select.Item
                        key={i}
                        label={String(elem)}
                        value={String(elem)}
                      />
                    );
                  })}
                </Select>
              </VStack>
              <VStack space={4}>
                <Text className="text-gray-500 text-xs">Confirm</Text>
                <IconButton
                  onPress={() => {
                    props.addLesson();
                    props.notShow();
                  }}
                  disabled={!isThereLesson()}
                  className="h-[6vh] w-[6vh] rounded-lg"
                  colorScheme="green"
                  icon={<CheckIcon />}
                  variant="solid"
                />
              </VStack>
            </HStack>
          </VStack>
          <VStack className="w-[80%] self-center">
            <ScrollView>
              {lesson
                .filter(val => {
                  return val.lessonName === props.lessonName;
                })[0]
                .students.map((elem: any) => (
                  <Box key={elem._id} className="mt-[1vh] rounded-lg">
                    <View>
                      <Text className=" capitalize font-serif absolute">
                        {elem.name + ' ' + elem.surName}
                      </Text>
                    </View>
                    <IconButton
                      onPress={() => {
                        realm.write(() => {
                          console.log(
                            elem.lesson.splice(
                              elem.lesson.findIndex((val: any) => {
                                return val.lessonName === props.lessonName;
                              }),
                              1,
                            ),
                          );
                        });
                      }}
                      className="h-[4vh] w-[4vh] rounded-lg self-end"
                      colorScheme="red"
                      icon={<CloseIcon />}
                      variant="solid"
                    />
                  </Box>
                ))}
            </ScrollView>
          </VStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default AddStudentToLesson;
