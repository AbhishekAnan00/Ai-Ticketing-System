export const sendResponse = (res, data, status = 200) => {
    res.status(status).json(data);
  };
  