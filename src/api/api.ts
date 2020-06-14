import * as C from '../constants';
import { ApiDataRow } from '../types';

class Api {
  constructor() {

  }

  async getList(): Promise<boolean | ApiDataRow[]> {
    const response = await fetch(`${C.API_ENDPOINT}/${C.API_GET_LIST}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .catch((e) => {
        return false;
      })
    ;

    if (response instanceof Response) {
      return await response.json();
    }

    return false;
  }

  async addItem(data: ApiDataRow) {
    return await fetch(`${C.API_ENDPOINT}/${C.API_ADD_ITEM}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  async updateItem(data: ApiDataRow, id: number) {
    return await fetch(`${C.API_ENDPOINT}/${C.API_UPDATE_ITEM}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  async deleteItem(id: number) {
    return await fetch(`${C.API_ENDPOINT}/${C.API_REMOVE_ITEM}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}

export const api = new Api();