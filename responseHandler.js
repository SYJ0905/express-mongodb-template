const { headers, message, statusCodes } = require('./libs');

const successHandler = (res, data) => {
  res.writeHead(statusCodes.requestSuccess, headers);
  res.write(JSON.stringify({
    code: statusCodes.requestSuccess,
    status: 'success',
    data,
  }));
  res.end();
};

const errorHandler = (res, statusCode, messageContent, customStatusCode) => {
  const { wrongKey, wrongValue } = message;

  res.writeHead(statusCode, headers);
  let newMessage;

  if (typeof (messageContent) === 'string') {
    newMessage = messageContent;
  } else if (typeof (messageContent) === 'object') {
    const errorText = [];
    Object.keys(messageContent.errors).forEach((item) => {
      /** 錯誤訊息 自訂 => payload 中的 key 不存在 schema 內 */
      if (Object.prototype.hasOwnProperty.call(messageContent, 'status') && customStatusCode === statusCodes.requestPayloadKeyError) {
        errorText.push(`${messageContent.errors[item]} ${wrongKey}`);
      }
      /** 錯誤訊息 自訂 => patch 更新時 payload 中的 key 為 required 的值不得為空 */
      if (Object.prototype.hasOwnProperty.call(messageContent, 'errors') && customStatusCode === statusCodes.requestPayloadKeyRequired) {
        errorText.push(`${messageContent.errors[item]}${wrongValue}`);
      }
      /** 錯誤訊息 Mongoose => post 新增時 schema key required 的值不得為空 */
      if (Object.prototype.hasOwnProperty.call(messageContent.errors[item], 'properties')) {
        errorText.push(`${messageContent.errors[item].properties.message}${wrongValue}`);
      }
    });
    newMessage = errorText;
  }

  res.write(JSON.stringify({
    code: customStatusCode || statusCode,
    status: 'fail',
    message: newMessage,
  }));
  res.end();
};

module.exports = {
  successHandler,
  errorHandler,
};
