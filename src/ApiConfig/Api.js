import api from '../ApiConfig/axiosConfig';

const getApiData =(url) => {
  // try {
  //   setLoading(true);
  //   setError(false);
  //   const response = await api.get(url);
  //   setData(response.data);
  //   setLoading(false);
  // } catch (error) {
  //   setError(error);
  //   setLoading(false);
  // }

  return api.get(url)
};

const postApiData = async (url) => {
  try {
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    alert("something went Wrong")
  }
};

const archiveApiData = async (url) => {
  try {
    const response = await api.put(url);
    return response.data;
  } catch (error) {
    alert("Something went wrong")
  }
};
const deleteApiData = async (url, setData, checkListId) => {
  try {
    const response = await api.delete(url);
    // console.log(response)
    if (response) {
      setData((data) => {
        const newdata = data.filter(({ id }) => id !== checkListId);
        return newdata;
      });
    }
  } catch (error) {
    alert('error occurred');
  }
};

export { getApiData, postApiData, archiveApiData, deleteApiData };
