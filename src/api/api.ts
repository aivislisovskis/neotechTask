import * as C from '../constants';
import { ApiDataRow } from '../types';

class Api {
  constructor() {

  }

  async getList(): Promise<ApiDataRow[]> {
    const response = await fetch(`${C.API_ENDPOINT}/${C.API_GET_LIST}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .catch((e) => {
        return [];
      })
    ;

    if (response instanceof Response && response.status === 200) {
      return await response.json();
    }

    return [];
  }

  async getItem(id: string): Promise<null | ApiDataRow> {
    const response = await fetch(`${C.API_ENDPOINT}/${C.API_GET_ITEM}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch((e) => {
          return null;
        })
    ;

    if (response instanceof Response && response.status === 200) {
      return await response.json();
    }

    return null;
  }

  async addItem(data: ApiDataRow): Promise<null | ApiDataRow> {
    const response = await fetch(`${C.API_ENDPOINT}/${C.API_ADD_ITEM}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .catch((e) => {
        return null;
      })

    return response?.status === 200 ? await response.json() : null;
  }

  async updateItem(data: ApiDataRow, id: string) {
    const response = await fetch(`${C.API_ENDPOINT}/${C.API_UPDATE_ITEM}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .catch((e): null => {
        return null;
      });

    return response?.status === 200 ? await response.json() : null;
  }

  async deleteItem(id: number | string): Promise<boolean> {
    const response: Response | null = await fetch(`${C.API_ENDPOINT}/${C.API_REMOVE_ITEM}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .catch((e): null => {
        return null;
      });

    return response?.status === 200;
  }
}

export const api = new Api();