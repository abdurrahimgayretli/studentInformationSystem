import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, IconButton, Paragraph, Title} from 'react-native-paper';
import {Text, Box} from 'native-base';
import {View} from 'react-native';

const MainPage = ({navigation, route}: any) => {
  const {user} = route.params;

  return (
    <Box>
      <View className="w-[100%]">
        <View className="h-[5vh] w-[5vh] absolute">
          <IconButton
            onPress={() => {
              navigation.openDrawer();
            }}
            icon={require('../../assets/menu.png')}
          />
        </View>
        <Text className="absolute font-bold self-center text-xl left-[8vh] top-[1.5vh]">
          Main Page
        </Text>
        <View className="absolute h-[5vh] w-[5vh] right-[2vh] self-end">
          <IconButton
            onPress={() => {
              navigation.navigate('Login');
            }}
            icon={require('../../assets/log-out.png')}
          />
        </View>
      </View>
      <View className="top-[5vh] self-center h-[95%] justify-center">
        <Card className="h-[35vh] self-center w-[40vh]">
          <Card.Content>
            <Title>Duyurular</Title>
            <View
              className={`h-[5vh] w-[5vh] rounded-lg m-[1vh] absolute self-end right-[1vh] ${
                user.title !== 'admin' ? 'hidden' : 'visible'
              }`}>
              <IconButton
                onPress={() => {
                  navigation.openDrawer();
                }}
                icon={require('../../assets/edit.png')}
              />
            </View>
            <ScrollView>
              <Paragraph>duyurular</Paragraph>
            </ScrollView>
          </Card.Content>
        </Card>
        <Card className="h-[35vh] mt-[5vh] self-center w-[40vh]">
          <Card.Content>
            <Title>Yemek Listesi</Title>
            <View
              className={`h-[5vh] w-[5vh] rounded-lg m-[1vh] absolute self-end right-[1vh] ${
                user.title !== 'admin' ? 'hidden' : 'visible'
              }`}>
              <IconButton
                onPress={() => {
                  navigation.openDrawer();
                }}
                icon={require('../../assets/edit.png')}
              />
            </View>
            <ScrollView>
              <Paragraph>yemekler</Paragraph>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </Box>
  );
};

export default MainPage;
