import Promise from 'bluebird';
import _ from 'lodash';
import azureStorage from 'azure-storage'
import log from 'utils/Log';

// holders
var blobService = null;

const bootstrap = () => {
  blobService = azureStorage.createBlobService(process.env.APP_AZURE_STORAGE_ACCOUNT, process.env.APP_AZURE_STORAGE_ACCESS_KEY);
}

const getContent = (file) => new Promise((resolve, reject) => {
  blobService.getBlobToText(process.env.APP_AZURE_STORAGE_CONFIGS_CONTAINER, file, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  })
})

const setContent = (file, json) => new Promise((resolve, reject) => {
  blobService.createBlockBlobFromText(process.env.APP_AZURE_STORAGE_CONFIGS_CONTAINER, file, json, {
    contentSettings: {
      contentType: 'application/json'
    }
  }, (error, result) => {
    if (error) return reject(error);
    return resolve(true);
  })
})


export { bootstrap, getContent, setContent };
