
import request from './axios';
import { requestMethods } from '../enums/request.methods';

const sendPromptToBackend = async (prompt) => {
  try {
    
    const response = await request({
      method:requestMethods.POST,
      route:'chatbot/ask',
      body:{ prompt }
    })
    console.log(response.data); 

    return response;
  } catch (error) {
    console.error('Error sending prompt:', error);
    return null;
  }
};
export default sendPromptToBackend
