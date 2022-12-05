import * as React from 'react';
import {Avatar, Card, Modal, Portal} from 'react-native-paper';
import {
  HStack,
  IconButton,
  NativeBaseProvider,
  Text,
  VStack,
  CloseIcon,
} from 'native-base';

const ConfirmStudentModal = (props: any) => {
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
          <Card className="bg-slate-100 pt-[3vh]">
            <IconButton
              onPress={props.notShow}
              className="h-[5vh] w-[5vh] rounded-lg right-[1vh] -top-[2vh] self-end absolute"
              colorScheme="gray"
              icon={<CloseIcon />}
              variant="solid"
            />
            <Avatar.Image
              className="self-center"
              size={150}
              source={require('../../assets/photo.png')}
            />

            <Card.Content>
              <HStack className="pt-[1vh] space-x-[60vh] self-center">
                <VStack space={4}>
                  <Text className="text-gray-500 text-xs">Name-Surname</Text>
                  <Text className="text-sm truncate max-w-[20vh] -top-[1vh]">
                    Abdurrahim Gayretli
                  </Text>
                  <Text className="text-gray-500 text-xs">Bölüm</Text>
                  <Text className="text-sm truncate max-w-[20vh] -top-[1vh]">
                    Bilgisayar Mühendisliği
                  </Text>
                </VStack>
                <VStack space={4}>
                  <Text className="text-gray-500 text-xs">No</Text>
                  <Text className="text-sm -top-[1vh]">159</Text>
                  <Text className="text-gray-500 text-xs">Okuduğu Sınıf</Text>
                  <Text className="text-sm -top-[1vh]">4. Sınıf</Text>
                </VStack>
              </HStack>
            </Card.Content>
          </Card>
        </Modal>
      </NativeBaseProvider>
    </Portal>
  );
};

export default ConfirmStudentModal;
