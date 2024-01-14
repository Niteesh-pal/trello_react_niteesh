import api from '../ApiConfig/axiosConfig';
import { action } from '../ReducerFunction/stateActionType';

const getApiData = async (url, setData, setLoading, setError) => {
  try {
    setLoading(true);
    setError(false);
    const response = await api.get(url);
    setData(response.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
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
const deleteApiData = async (url) => {
  try {
    const response = await api.delete(url);
    // console.log(response)
    return response
    // if (response) {
    //   setData((data) => {
    //     const newdata = data.filter(({ id }) => id !== checkListId);
    //     return newdata;
    //   });
    // }
  } catch (error) {
    alert('error occurred');
  }
};

const fetchApiData = async(url,dispatch)=>{
  try {
    const response = await api.get(url)
    dispatch({type:action.FETCH_DATA, payload:response.data})
  } catch (error) {
    console.log(error.message)
    dispatch({type:action.ERROR})
  }
}

export { getApiData, postApiData, archiveApiData, deleteApiData, fetchApiData };
