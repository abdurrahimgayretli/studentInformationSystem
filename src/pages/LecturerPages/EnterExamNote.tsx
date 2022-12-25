/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import NoteModel from '../../components/NoteModal';
import {IconButton, AddIcon, DeleteIcon} from 'native-base';
import {User, useQuery, useRealm} from '../../models/User';
import {Lesson} from '../../models/Lesson';
import {Exam} from '../../models/Exam';

const EnterExamNote = ({route}: any) => {
  const [visible, setVisible] = React.useState(false);
  const hidden = () => setVisible(false);

  const {studentTc, studentLesson}: {studentTc: Number; studentLesson: String} =
    route.params;

  const realm = useRealm();
  const students = useQuery<User>('Student');
  const [student] = useState<User>(
    students.filter((stud: User) => {
      return stud.tc === Number(studentTc);
    })[0],
  );
  const [lesson] = useState<Lesson>(
    student.lesson.filter((les: Lesson) => {
      return les.lessonName === studentLesson;
    })[0],
  );

  const handleAddExam = useCallback(
    (tc: number, examName: string, note: number): void => {
      if (!examName && !note) {
        return;
      }
      realm.write(() => {
        const exam: Exam = realm.create(
          'Exam',
          Exam.addNote(tc, examName, note),
        );
        lesson.exam.push(exam);
      });
    },
    [realm, lesson],
  );

  const handleDeleteExam = (val: Exam) => {
    realm.write(() => {
      realm.delete(
        realm.objects('Exam').filter((listObj: any) => {
          return String(listObj._id) === String(val._id);
        }),
      );
    });
  };

  return (
    <View className="h-[100%] w-[100%] top-[1vh] absolute">
      <DataTable className="w-[90%] h-[90%] self-center ">
        <DataTable.Header>
          <DataTable.Title>Exam's Name</DataTable.Title>
          <DataTable.Title numeric>Note</DataTable.Title>
          <DataTable.Title numeric>Confirm</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {lesson.exam
            .filter((ex: Exam) => {
              return ex.tc === studentTc;
            })
            .map((exam: Exam, i) => (
              <DataTable.Row key={i}>
                <DataTable.Cell>{exam.examName}</DataTable.Cell>
                <DataTable.Cell className="left-[10vh]">
                  {exam.note}
                </DataTable.Cell>
                <DataTable.Cell className="-right-[6.5vh]">
                  <View>
                    <IconButton
                      onPress={() => {
                        handleDeleteExam(exam);
                      }}
                      className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      variant="solid"
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </ScrollView>
      </DataTable>
      <View className="absolute self-end right-[2vh] bottom-[5vh]">
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
        <View>
          <NoteModel
            show={visible}
            notShow={hidden}
            userTC={studentTc}
            AddExam={handleAddExam}
          />
        </View>
      )}
    </View>
  );
};

export default EnterExamNote;
