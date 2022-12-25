/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, IconButton, Paragraph, Title} from 'react-native-paper';
import {Text, Box} from 'native-base';
import {View} from 'react-native';
import {User, useQuery, useRealm} from '../models/User';
import {Announcement} from '../models/Announcement';
import {FoodList} from '../models/FoodList';
import ChangePassModal from '../components/ChangePassModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainPage = ({navigation}: any) => {
  const date = new Date();
  const [visible, setVisible] = useState(false);

  const realm = useRealm();
  const announcements = useQuery<Announcement>('Announcement');
  const foodList = useQuery<FoodList>('FoodList');
  const users = useQuery<User>('User');
  const [user, setUser] = useState<User>(users[0]);

  const getData = async () => {
    try {
      const tc = await AsyncStorage.getItem('@tc');
      setUser(
        users.filter(val => {
          return val.tc === Number(tc);
        })[0],
      );
    } catch (e) {
      // error reading value
    }
  };

  const changePass = () => {
    if (String(user.tc) === String(user.password)) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    foodList.sorted('date').every((food: FoodList) => {
      if (
        food.date.toDateString() !== date.toDateString() &&
        food.date.getTime() < date.getTime()
      ) {
        realm.write(() => {
          realm.delete(
            realm.objects<FoodList>('FoodList').filter((val: FoodList) => {
              return String(val._id) === String(food._id);
            }),
          );
        });
      } else {
        return true;
      }
    });
  }, [foodList]);

  useEffect(() => {
    getData();
    changePass();
  }, [user?.password]);

  useEffect(() => {
    getData();
    changePass();
  }, [AsyncStorage.getItem('@tc')]);

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
          <Card.Content className="h-[35vh]">
            <Title className="font-bold">Announcement</Title>
            <View
              className={`h-[5vh] w-[5vh] rounded-lg m-[1vh] absolute self-end right-[1vh] ${
                user?.title !== 'Admin' ? 'hidden' : 'visible'
              }`}>
              <IconButton
                onPress={() => {
                  navigation.navigate('Edit Announcement');
                }}
                icon={require('../../assets/edit.png')}
              />
            </View>
            <ScrollView className="pl-[1vh]">
              {announcements.map((announc: Announcement) => (
                <View>
                  <Text className="font-semibold">{announc.title}</Text>
                  <Paragraph className="pl-[1vh]">{announc.content}</Paragraph>
                </View>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
        <Card className="h-[35vh] mt-[5vh] self-center w-[40vh]">
          <Card.Content className="h-[35vh]">
            <Title className="font-bold">Food List</Title>
            <View
              className={`h-[5vh] w-[5vh] rounded-lg m-[1vh] absolute self-end right-[1vh] ${
                user?.title !== 'Admin' ? 'hidden' : 'visible'
              }`}>
              <IconButton
                onPress={() => {
                  navigation.navigate('Edit Food List');
                }}
                icon={require('../../assets/edit.png')}
              />
            </View>
            <ScrollView>
              {foodList.sorted('date').map((food: FoodList) => (
                <View>
                  <Text
                    className={`self-end ${
                      food.date.toDateString() === date.toDateString()
                        ? 'text-black'
                        : 'text-slate-400'
                    } `}>
                    {food.date.toDateString()}
                  </Text>
                  <Paragraph className="pl-[1vh]">{food.list}</Paragraph>
                </View>
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
      {visible && <ChangePassModal />}
    </Box>
  );
};

export default MainPage;
