import update from 'immutability-helper';
import TERIMA_PESANAN, {
  UPDATE_LOCATION,
  LOGIN_SUCCESS,
  UPDATE_CURRENT_PID,
  TOGGLE_AKTIF,
  UPDATE_ORDER_STATE,
  UPDATE_PESANAN,
  TERIMA_PESANAN_SUCCESS,
} from '../../constants/ActionTypes';


const initialData = {
  partner_id: null,
  current_location: null,
  status_aktif: false,
  order_state: 'idle',
  current_pesanan: null,
  current_client: {
    nama: 'system',
    alamat: 'system',
    no_kontak: 'system',
  },
};

function rootReducer(state = initialData, action) {
  switch (action.type) {
    case UPDATE_ORDER_STATE: {
      const data = action.payload;
      const new_state = update(state, {
        order_state: { $set: data },
      });
      return new_state;
    }

    case TOGGLE_AKTIF: {
      const data = action.payload;
      const new_state = update(state, {
        status_aktif: { $set: data },
      });
      return new_state;
    }

    case UPDATE_CURRENT_PID: {
      const data = action.payload;
      const new_state = update(state, {
        partner_id: { $set: data },
      });
      return new_state;
    }

    case LOGIN_SUCCESS: {
      /**
        * @typedef {Object} data_login
        * @property {*} data - "". {"id": "p4"},
        * @property {*} status - "".
      */

      /**
       * @type {data_login} data
       */
      const data = action.payload;
      const new_state = update(state, {
        partner_id: { $set: data.data.id },
      });
      return new_state;
    }

    case TERIMA_PESANAN: {
      const new_state = update(state, {
        order_state: { $set: 'go_to_pelanggan' },
      });
      return new_state;
    }

    case TERIMA_PESANAN_SUCCESS: {
      /**
      * @typedef {Object} Geopoint
      * @property {number} longitude
      * @property {number} latitude
      */

      /**
        * wadaw
        * @typedef {Object} data_pesanan
        * @property {Geopoint} lokasi_client - "".
        * @property {*} response
      */

      /**
       * @type {data_pesanan} data
       */
      const data = action.payload;

      const new_state = update(state, {
        order_state: { $set: 'go_to_pelanggan' },
        current_client: {
          alamat: { $set: data.lokasi_client },
        },
      });
      return new_state;
    }

    case UPDATE_PESANAN: {
      const data = action.payload;
      const new_state = update(state, {
        current_pesanan: { $set: data },
      });
      return new_state;
    }

    case UPDATE_LOCATION: {
      /**
      * @typedef {Object} coords
      * @property {*} accuracy - 87.5999984741211.
      * @property {*} altitude - 0.
      * @property {*} heading - 0.
      * @property {*} latitude - -6.8116553.
      * @property {*} longitude - 107.9185063.
      * @property {*} speed - 0.
      */

      /**
      * @typedef {Object} location
      * @property {coords} coords -
      * @property {*} mocked - false.
      * @property {*} timestamp - 1572669469270.
      */

      /**
     * @type {location} location
     */
      const location = action.payload;
      const new_state = update(state, {
        current_location: {
          $set: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      });
      return new_state;
    }

    default:
      return state;
  }
}


export default rootReducer;
