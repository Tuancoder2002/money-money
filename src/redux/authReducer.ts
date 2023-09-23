import { LOGIN_SUCCESS } from './actionTypes';

// Định rõ kiểu dữ liệu cho action
interface AuthAction {
  type: string;
  // Thêm các thuộc tính khác của action nếu cần
}

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default authReducer;
