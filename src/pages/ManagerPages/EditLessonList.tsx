import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IconButton,
  AddIcon,
  DeleteIcon,
  HStack,
  VStack,
  Text,
  HamburgerIcon,
  ThreeDotsIcon,
} from 'native-base';
import AddLessonModal from '../../components/AddLessonModal';
import {Lesson} from '../../models/Lesson';
import {useQuery, useRealm} from '../../models/User';
import AddStudentToLesson from '../../components/AddStudentToLesson';

const EditLessonList = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);
  const hidden = () => setVisible(false);

  const [visibleStudent, setVisibleStudent] = useState(false);
  const hiddenStudent = () => setVisibleStudent(false);

  const [lessonName, setLessonName] = useState('');

  const lecturer = useQuery<any>('Lecturer');
  const [lecturerName, setLecturerName] = useState('');
  const setLecturer = (name: string) => setLecturerName(name);

  const students = useQuery<any>('Student');
  const [studentName, setStudentName] = useState('');
  const setStudent = (name: string) => setStudentName(name);

  const realm = useRealm();
  const lessons = useQuery<any>('Lesson');

  const handleAddLesson = useCallback(
    (lesson: string): void => {
      if (!lesson) {
        return;
      }
      realm.write(() => {
        const newLesson = realm.create('Lesson', Lesson.addLesson(lesson));
        lecturer
          .find(val => {
            return val.name === lecturerName;
          })
          .lesson.push(newLesson);
      });
    },
    [lecturer, lecturerName, realm],
  );

  const handleAddStudent = () => {
    const lesson = lessons.find(val => {
      return val.lessonName === lessonName;
    });
    realm.write(() => {
      students
        .find(val => {
          return val.name === studentName;
        })
        .lesson.push(lesson);
    });
  };

  const handleDeleteLesson = (val: any) => {
    realm.write(() => {
      realm.delete(
        realm.objects('Lesson').filter((listObj: any) => {
          return String(listObj._id) === String(val._id);
        }),
      );
    });
  };

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
        <Text className="font-bold self-center text-lg">
          Edit and Add Lesson
        </Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
          <DataTable.Header>
            <DataTable.Title>Lesson's Name</DataTable.Title>
            <DataTable.Title numeric>Select Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {lessons.map((elem, i) => (
              <View key={i} className="mt-[1vh]">
                <VStack space={3}>
                  <Text className="text-sm truncate max-w-[20vh] h-[5vh] top-[1vh]">
                    {elem.lessonName}
                  </Text>
                </VStack>
                <View className="absolute self-end">
                  <HStack space={4}>
                    <IconButton
                      onPress={() => {
                        setVisibleStudent(true);
                        setLessonName(elem.lessonName);
                      }}
                      className="h-[5vh] w-[5vh] rounded-lg"
                      colorScheme="blue"
                      icon={<ThreeDotsIcon />}
                      variant="solid"
                    />
                    <IconButton
                      onPress={() => {
                        handleDeleteLesson(elem);
                      }}
                      className="h-[5vh] w-[5vh] rounded-lg"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      variant="solid"
                    />
                  </HStack>
                </View>
              </View>
            ))}
          </ScrollView>
        </DataTable>
        <View className="absolute self-end right-[2vh] bottom-[10vh]">
          <IconButton
            onPress={() => {
              setVisible(true);
            }}
            className=" rounded-full m-[1vh]"
            colorScheme="blue"
            size={16}
            icon={<AddIcon />}
            _icon={{size: '2xl'}}
            variant="solid"
          />
        </View>
        {visible && (
          <View className="">
            <AddLessonModal
              lecturer={setLecturer}
              addLesson={handleAddLesson}
              show={visible}
              notShow={hidden}
            />
          </View>
        )}
        {visibleStudent && (
          <View className="">
            <AddStudentToLesson
              lessonName={lessonName}
              student={setStudent}
              addLesson={handleAddStudent}
              show={visibleStudent}
              notShow={hiddenStudent}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default EditLessonList;
