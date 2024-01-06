import {Item} from '../interface';
import axios from 'axios';
// import {itemData} from './data';
import {itemData2} from './data copy';

export const getItems = async (): Promise<Item[]> => {
  // const url = `https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-omqnz/endpoint/items?secret=algopos`;
  // const result = await axios(url);
  // console.log(result.data);
  return itemData2;
};
