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
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {useQuery, useRealm} from '../models/User';
import {FoodList} from '../models/FoodList';

const AddFoodListModal = (props: any) => {
  const [date, setDate] = React.useState<Date>(props.date);
  const [foodList, setFoodList] = React.useState(props.foodList);

  const realm = useRealm();
  const foodlists = useQuery<FoodList>('FoodList');

  const handleUpdateFoodList = (id: string, dateF: Date, foodListF: string) => {
    realm.write(() => {
      const obj = foodlists.filter((listObj: any) => {
        return String(listObj._id) === String(id);
      });
      obj[0].date = dateF;
      obj[0].list = foodListF;
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
            <DatePicker
              className="h-[10vh]"
              onDateChange={setDate}
              date={date}
              mode={'date'}
            />
            <View className="w-[40vh]">
              <TextArea
                h={'200'}
                autoCompleteType={undefined}
                onChangeText={setFoodList}
                value={foodList}
                placeholder="Enter food list"
              />
            </View>

            <IconButton
              onPress={() => {
                props.id === ''
                  ? props.addFoodList(date, foodList)
                  : handleUpdateFoodList(props.id, date, foodList);
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

export default AddFoodListModal;
