class TransformService {
  fbObjectToArray(fbData) {
    return Object.keys(fbData).map(key => ({
      id: key,
      ...fbData[key]
    }));
  }
};

export const transformService = new TransformService();