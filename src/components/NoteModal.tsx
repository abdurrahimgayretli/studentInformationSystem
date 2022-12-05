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
} from 'native-base';

const NoteModel = (props: any) => {
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
              <Input placeholder="Final" />
            </VStack>
            <VStack space={4}>
              <Text className="text-gray-500 w-[6vh] text-xs">Note</Text>
              <Input placeholder="50" />
            </VStack>
            <VStack space={4}>
              <Text className="text-gray-500 text-xs">Confirm</Text>
              <IconButton
                onPress={props.notShow}
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
