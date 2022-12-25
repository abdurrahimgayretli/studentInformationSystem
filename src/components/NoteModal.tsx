/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Modal, Portal} from 'react-native-paper';
import {
  HStack,
  Input,
  NativeBaseProvider,
  Text,
  IconButton,
  CheckIcon,
  VStack,
} from 'native-base';

const NoteModel = (props: any) => {
  const [examName, setExamName] = useState('');
  const [examNote, setExamNote] = useState('');

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
            height: 150,
            backgroundColor: 'white',
          }}>
          <HStack className="space-x-[50vh] self-center">
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Exam's Name</Text>
              <Input
                placeholder="Final"
                onChangeText={setExamName}
                value={examName}
              />
            </VStack>
            <VStack space={4}>
              <Text className="text-gray-500 w-[6vh] text-xs">Note</Text>
              <Input
                keyboardType="numeric"
                placeholder="50"
                onChangeText={setExamNote}
                value={examNote}
              />
            </VStack>
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Confirm</Text>
              <IconButton
                onPress={() => {
                  props.AddExam(
                    Number(props.userTC),
                    examName,
                    Number(examNote),
                  );
                  props.notShow();
                }}
                className="h-[6vh] w-[6vh] rounded-lg"
                colorScheme="green"
                icon={<CheckIcon />}
                variant="solid"
              />
            </VStack>
          </HStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default NoteModel;
