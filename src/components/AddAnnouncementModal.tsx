/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {
  NativeBaseProvider,
  TextArea,
  IconButton,
  CheckIcon,
  VStack,
  View,
  Input,
} from 'native-base';

const AddAnnouncementModal = (props: any) => {
  return (
    <Portal>
      <NativeBaseProvider>
        <Modal
          visible={props.show}
          onDismiss={props.notShow}
          contentContainerStyle={{
            alignSelf: 'center',
            width: 350,
            borderRadius: 8,
            height: 400,
            backgroundColor: 'white',
          }}>
          <VStack className="space-y-[10vh] self-center">
            <Input placeholder="Enter Tittle" />
            <View className="w-[40vh]">
              <TextArea
                h={'200'}
                autoCompleteType={undefined}
                placeholder="Enter announcement"
              />
            </View>

            <IconButton
              onPress={props.notShow}
              className="h-[6vh] w-[20vh] self-center rounded-lg"
              colorScheme="green"
              icon={<CheckIcon />}
              variant="solid"
            />
          </VStack>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default AddAnnouncementModal;
