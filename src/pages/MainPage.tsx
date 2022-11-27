/* eslint-disable prettier/prettier */
import * as React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Paragraph, Title} from 'react-native-paper';

const MainPage = () => {
  return (
    <>
      <Card className="h-[35vh] mt-[5vh] self-center w-[40vh]">
        <Card.Content className="">
          <Title>Duyurular</Title>
          <ScrollView>
            <Paragraph>duyurular</Paragraph>
          </ScrollView>
        </Card.Content>
      </Card>
      <Card className="h-[35vh] mt-[5vh] self-center w-[40vh]">
        <Card.Content className="">
          <Title>Yemek Listesi</Title>
          <ScrollView>
            <Paragraph>yemekler</Paragraph>
          </ScrollView>
        </Card.Content>
      </Card>
    </>
  );
};

export default MainPage;
