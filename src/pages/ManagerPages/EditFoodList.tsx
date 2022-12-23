/* eslint-disable react-hooks/exhaustive-deps */
import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import AddFoodListModal from '../../components/AddFoodListModal';
import {useQuery, useRealm} from '../../models/User';
import {FoodList} from '../../models/FoodList';

const EditFoodList = ({navigation}: any) => {
  const [visible, setVisible] = React.useState(false);
  const hidden = () => setVisible(false);

  const [date, setDate] = React.useState(new Date());
  const [foodList, setfoodList] = useState('');
  const [id, setId] = useState('');

  const realm = useRealm();
  const foodLists = useQuery<FoodList>('FoodList');

  const handleAddFoodList = useCallback(
    (dateF: Date, foodListF: string): void => {
      if (!dateF) {
        return;
      }
      realm.write(() => {
        realm.create('FoodList', FoodList.generate(dateF, foodListF));
      });
    },
    [realm],
  );

  const handleDeleteFoodList = (val: any) => {
    realm.write(() => {
      realm.delete(
        realm.objects('FoodList').filter((listObj: any) => {
          return String(listObj._id) === String(val._id);
        }),
      );
    });
  };

  useEffect(() => {
    console.log(foodLists);
  }, [foodLists]);

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
        <Text className="font-bold self-center text-lg">Edit Food List</Text>
      </HStack>
      <View className="h-[100%] w-[100%] top-[8vh] absolute">
        <DataTable className="w-[90%] h-[90%] self-center ">
          <DataTable.Header>
            <DataTable.Title>Food List's Date</DataTable.Title>
            <DataTable.Title numeric>Select Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {foodLists.map((val, i) => (
              <HStack key={i}>
                <DataTable.Cell className="left-[4vh]">
                  <Text className="text-lg">
                    {String(val.date.toISOString().split('T')[0])}
                  </Text>
                </DataTable.Cell>
                <IconButton
                  onPress={() => {
                    setfoodList(val.list);
                    setDate(val.date);
                    setId(val._id.toHexString());
                    setVisible(true);
                  }}
                  className="h-[5vh] w-[5vh] rounded-lg m-[1vh]"
                  colorScheme="blue"
                  icon={<ThreeDotsIcon />}
                  variant="solid"
                />
                <IconButton
                  onPress={() => {
                    handleDeleteFoodList(val);
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
              setfoodList('');
              setDate(new Date());
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
      </View>
      {visible && (
        <View className="">
          <AddFoodListModal
            show={visible}
            notShow={hidden}
            foodList={foodList}
            date={date}
            addFoodList={handleAddFoodList}
            id={id}
          />
        </View>
      )}
    </>
  );
};

export default EditFoodList;
