const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
  'Content-Type': 'application/json',
};

const message = {
  wrongKey: '欄位不存在',
  wrongValue: '欄位 未填寫正確',
  noData: '無此資料',
  formatFail: '格式錯誤',
};

const statusCodes = {
  requestSuccess: 200,
  requestError: 400,
  requestInexistence: 404,
  requestPayloadKeyError: 9998,
  requestPayloadKeyRequired: 9999,
};

const validateFieldKeyExist = (model, data) => {
  /** 驗證 payload 中的 key 是否存在 schema 內 start */
  const schemaData = model.prototype.schema.obj;
  const schemaKey = [];
  const obj = {
    status: true,
    errors: {},
  };

  Object.keys(schemaData).forEach((item) => {
    /** 避免取到 select = false 的 key 值 */
    if (!Object.prototype.hasOwnProperty.call(schemaData[item], 'select')) {
      schemaKey.push(item);
    }
  });

  Object.keys(data).forEach((item) => {
    if (obj.status) {
      if (schemaKey.indexOf(item) === -1) {
        obj.status = false;
        obj.errors[item] = item;
      }
    }
  });
  return obj;
  /** 驗證 payload 中的 key 是否存在 schema 內 end */
};

const validateFieldRequired = (model, data) => {
  /** 驗證 payload 中的 key 是否為空 start */
  const schemaData = model.prototype.schema.obj;
  const schemaKey = [];
  const obj = {
    status: true,
    errors: {},
  };

  Object.keys(schemaData).forEach((item) => {
    /** 避免取到 select = false 的 key 值 */
    if (!Object.prototype.hasOwnProperty.call(schemaData[item], 'select') && Object.prototype.hasOwnProperty.call(schemaData[item], 'required')) {
      schemaKey.push(item);
    }
  });

  Object.keys(data).forEach((item) => {
    if (obj.status) {
      if (schemaKey.indexOf(item) > -1) {
        if (data[item] === '') {
          obj.status = false;
          obj.errors[item] = item;
        }
      }
    }
  });
  return obj;
  /** 驗證 payload 中的 key 是否為空 start end */
};

module.exports = {
  headers,
  message,
  statusCodes,
  validateFieldKeyExist,
  validateFieldRequired,
};
