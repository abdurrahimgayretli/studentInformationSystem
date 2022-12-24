/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {
  IconButton,
  HamburgerIcon,
  HStack,
  Text,
  ThreeDotsIcon,
  DeleteIcon,
  AddIcon,
} from 'native-base';
import AddAnnouncementModal from '../../components/AddAnnouncementModal';
import {useQuery, useRealm} from '../../models/User';
import {Announcement} from '../../models/Announcement';

const EditAnnouncement = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);
  const hidden = () => setVisible(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState('');

  const realm = useRealm();
  const announcements = useQuery<Announcement>('Announcement');

  const handleAddAnnouncement = useCallback(
    (titleA: string, contentA: string): void => {
      if (!titleA) {
        return;
      }
      realm.write(() => {
        realm.create('Announcement', Announcement.generate(titleA, contentA));
      });
    },
    [realm],
  );

  const handleDeleteAnnouncement = (val: any) => {
    realm.write(() => {
      realm.delete(
        realm.objects('Announcement').filter((listObj: any) => {
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
        <Text className="font-bold self-center text-lg">Edit Announcement</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
          <DataTable.Header>
            <DataTable.Title>Announcement's Name</DataTable.Title>
            <DataTable.Title numeric>Select Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {announcements.map((val, i) => (
              <HStack key={i}>
                <DataTable.Cell>{val.title}</DataTable.Cell>
                <IconButton
                  onPress={() => {
                    setContent(val.content);
                    setTitle(val.title);
                    setId(String(val._id));
                    setVisible(true);
                  }}
                  className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                  colorScheme="blue"
                  icon={<ThreeDotsIcon />}
                  variant="solid"
                />
                <IconButton
                  onPress={() => {
                    handleDeleteAnnouncement(val);
                  }}
                  className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  variant="solid"
                />
              </HStack>
            ))}
          </ScrollView>
        </DataTable>
        <View className="absolute self-end right-[2vh] bottom-[10vh]">
          <IconButton
            onPress={() => {
              setContent('');
              setTitle('');
              setId('');
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
            <AddAnnouncementModal
              show={visible}
              notShow={hidden}
              title={title}
              content={content}
              addAnnouncement={handleAddAnnouncement}
              id={id}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default EditAnnouncement;
