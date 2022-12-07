import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Paragraph, Title} from 'react-native-paper';
import {
  IconButton,
  HamburgerIcon,
  HStack,
  Text,
  ThreeDotsIcon,
} from 'native-base';
import {View} from 'react-native';
import {} from 'react-native-svg';

const MainPage = ({navigation}: any) => {
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
        <Text className="font-bold self-center text-lg">Main Page</Text>
      </HStack>
      <View className="absolute justify-center self-center h-[100%]">
        <Card className="h-[35vh] self-center w-[40vh]">
          <Card.Content>
            <Title>Duyurular</Title>
            <IconButton
              onPress={() => {
                navigation.openDrawer();
              }}
              className="h-[5vh] w-[5vh] rounded-lg m-[1vh] absolute self-end top-[1vh] right-[1vh]"
              icon={<ThreeDotsIcon />}
              name="edit"
              variant="solid"
            />
            <ScrollView>
              <Paragraph>duyurular</Paragraph>
            </ScrollView>
          </Card.Content>
        </Card>
        <Card className="h-[35vh] mt-[5vh] self-center w-[40vh]">
          <Card.Content>
            <Title>Yemek Listesi</Title>
            <IconButton
              onPress={() => {
                navigation.openDrawer();
              }}
              className="h-[5vh] w-[5vh] rounded-lg m-[1vh] absolute self-end top-[1vh] right-[1vh]"
              icon={<ThreeDotsIcon />}
              name="edit"
              variant="solid"
            />
            <ScrollView>
              <Paragraph>yemekler</Paragraph>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default MainPage;
