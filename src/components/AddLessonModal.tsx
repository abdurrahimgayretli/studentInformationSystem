/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  IconButton,
  CheckIcon,
  VStack,
  Select,
} from 'native-base';
import {User, useQuery} from '../models/User';

const AddLessonModal = (props: any) => {
  const [text, onChangeText] = React.useState(props.lesson);
  const [selectLecturer, setSelectLecturer] = React.useState(
    props.lecturerName,
  );

  const lecturers = useQuery<User>('Lecturer');
  const [lecturerArray, setLecturerArray] = React.useState<String[]>([]);

  const addLessontoLecturer = (lecturerName: string) => {
    return props.lecturer(
      lecturers.find(val => {
        return val.name === String(lecturerName.split(' ')[0]);
      })?.name,
    );
  };

  React.useEffect(() => {
    lecturers.forEach(val => {
      return setLecturerArray(oldArray => [
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
            height: 200,
            backgroundColor: 'white',
          }}>
          <VStack className="space-y-[20vh] self-center">
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Lesson's Name</Text>
              <Input
                onChangeText={onChangeText}
                value={text}
                placeholder="Matematik"
              />
            </VStack>
            <HStack space={4}>
              <VStack className="self-end" space={4}>
                <Text className="text-gray-500 text-xs w-[25vh]">
                  Lecturer's Name
                </Text>
                <Select
                  selectedValue={selectLecturer}
                  placeholder={'Choose Title'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={'2'} />,
                  }}
                  onValueChange={itemValue => {
                    setSelectLecturer(itemValue);
                    addLessontoLecturer(itemValue);
                  }}>
                  {lecturerArray.map((elem, i) => {
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
                    props.addLesson(text);
                    props.notShow();
                  }}
                  className="h-[6vh] w-[6vh] rounded-lg"
                  colorScheme="green"
                  icon={<CheckIcon />}
                  variant="solid"
                />
              </VStack>
            </HStack>
          </VStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default AddLessonModal;
