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
import {useQuery, useRealm} from '../models/User';
import {Announcement} from '../models/Announcement';

const AddAnnouncementModal = (props: any) => {
  const [title, setTitle] = React.useState(props.title);
  const [content, setContent] = React.useState(props.content);

  const realm = useRealm();
  const announcements = useQuery<Announcement>('Announcement');

  const handleUpdateAnnouncement = (
    id: string,
    titleA: string,
    contentA: string,
  ) => {
    realm.write(() => {
      const obj = announcements.filter((listObj: any) => {
        return String(listObj._id) === String(id);
      });
      obj[0].title = titleA;
      obj[0].content = contentA;
    });
  };
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
            <Input
              placeholder="Enter Tittle"
              onChangeText={setTitle}
              value={title}
            />
            <View className="w-[40vh]">
              <TextArea
                h={'200'}
                autoCompleteType={undefined}
                value={content}
                onChangeText={setContent}
                placeholder="Enter announcement"
              />
            </View>

            <IconButton
              onPress={() => {
                props.id === ''
                  ? props.addAnnouncement(title, content)
                  : handleUpdateAnnouncement(props.id, title, content);
                props.notShow();
              }}
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
