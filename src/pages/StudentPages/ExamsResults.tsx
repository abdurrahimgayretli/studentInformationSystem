import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {DataTable} from 'react-native-paper';
import {IconButton, HamburgerIcon, HStack, Text} from 'native-base';
import {User, useQuery} from '../../models/User';
import {Lesson} from '../../models/Lesson';
import {Exam} from '../../models/Exam';

const ExamsResults = ({navigation, route}: any) => {
  const userInfo = route.params;

  const students = useQuery<User>('Student');
  const [student] = useState<User>(
    students.filter((stud: User) => {
      return stud.tc === String(userInfo.user.tc);
    })[0],
  );

  const calculateLetterGrade = (lessonName: string) => {
    var letterGrade = '';
    var note = 0;
    var finalCont = 0;
    student.lesson
      .filter((les: Lesson) => {
        return les.lessonName === lessonName;
      })[0]
      .exam.filter((ex: Exam) => {
        return ex.tc === String(userInfo.user.tc);
      })
      .map((eNote, i) => {
        note += Number(eNote.note);
        if (eNote.examName === 'Final') {
          finalCont++;
        }
        if (eNote.examName === 'Final' && Number(eNote.note) < 40) {
          return (letterGrade = 'FF');
        } else {
          letterGrade =
            note / (i + 1) > 85
              ? 'AA'
              : note / (i + 1) > 75
              ? 'BA'
              : note / (i + 1) > 65
              ? 'BB'
              : note / (i + 1) > 55
              ? 'CB'
              : note / (i + 1) > 50
              ? 'CC'
              : note / (i + 1) > 45
              ? 'DC'
              : note / (i + 1) > 40
              ? 'DD'
              : 'FF';
        }
      });
    if (finalCont === 0) {
      return '';
    } else {
      return letterGrade;
    }
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
            {student.lesson.map((les: Lesson) => (
              <>
                {les.exam
                  .filter(ex => {
                    return ex.tc === String(userInfo.user.tc);
                  })
                  .map((val, i) => (
                    <DataTable.Row key={i}>
                      <DataTable.Cell className="right-[1vh]">
                        {les.lessonName}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>{val.examName}</DataTable.Cell>
                      <DataTable.Cell numeric>{val.note}</DataTable.Cell>
                      <DataTable.Cell numeric>
                        {calculateLetterGrade(les.lessonName)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </>
            ))}
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

export default ExamsResults;
