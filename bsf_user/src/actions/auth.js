import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_TOKEN,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  BLOCK_SUCCESS,
  BLOCK_FAIL,
  OVERRIDE_RESULT_SUCCESS,
  OVERRIDE_RESULT_FAIL,
  SETTLE_SUCCESS,
  SETTLE_FAIL,
  APPROVE_RECHARGE_SUCCESS,
  APPROVE_RECHARGE_FAIL,
  DEPOSIT_SUCCESS,
  DEPOSIT_FAIL,
  WITHDRAW_SUCCESS,
  WITHDRAW_FAIL,
  APPROVE_WITHDRAW_SUCCESS,
  APPROVE_WITHDRAW_FAIL,
  ADD_UPI_SUCCESS,
  ADD_UPI_FAIL,
  DELETE_UPI_SUCCESS,
  DELETE_UPI_FAIL,
  NOTIFY_ALL_USERS_SUCCESS,
  NOTIFY_ALL_USERS_FAIL,
  NOTIFY_USER_SUCCESS,
  NOTIFY_USER_FAIL,
  UPDATE_BALANCE_SUCCESS,
  UPDATE_BALANCE_FAIL
} from "./types";

import AuthServices from "../services/auth-services";
export const fetchState = () => {
  return { type: 'FETCH_STATE' }
}
export const registerReferred = (name, email, userName, agentCode, password, otp, url) => (dispatch) => {
  return AuthServices.registerReferred(name, email, userName, agentCode, password, otp, url).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("deposit");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.status,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
      });

      return error.response;
    }

  )
}
export const deposit = (agentName, balance, password, role) => (dispatch) => {
  return AuthServices.deposit(agentName, balance, password, role).then(
    (response) => {
      dispatch({
        type: DEPOSIT_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("deposit");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: DEPOSIT_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const withdraw = (agentName, balance, password, role) => (dispatch) => {
  return AuthServices.withdraw(agentName, balance, password, role).then(
    (response) => {
      dispatch({
        type: WITHDRAW_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("withdraw");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: WITHDRAW_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const register = (name, fixLimit, myMatchShare, othersMatchShare,
  othersMatchCommission, sessionCommission, password, registerType, registerBy, role) => (dispatch) => {
    return AuthServices.register(name, fixLimit, myMatchShare, othersMatchShare,
      othersMatchCommission, sessionCommission, password, registerType, registerBy).then(
        (response) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: response,
            role: role
          });

          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
            role: role
          });

          return response;
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message &&
              error.response.headers) ||
            error.message ||
            error.toString();
          console.log("register");
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.data.message);
          console.log(error.message);
          console.log(error.response.headers);

          dispatch({
            type: REGISTER_FAIL,
            payload: error.response.status,
            role: role
          });
          dispatch({
            type: SET_MESSAGE,
            payload: error.response.data,
            role: role
          });

          return error.response;
        }
      );
  };

export const block = (userName, accountStatus, password, role) => (dispatch) => {
  return AuthServices.block(userName, accountStatus, password, role).then(
    (response) => {
      dispatch({
        type: BLOCK_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      dispatch({
        type: BLOCK_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const login = (username, password, role) => (dispatch) => {
  return AuthServices.login(username, password, role).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
        role: role
      });

      return data;
    },
    (error) => {
      // console.log("1");
      // console.log(error.response);
      // console.log(error.response.data);
      // console.log(error.response.data.message);
      // console.log(error.message);
      // console.log(error.response.headers);
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.status,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const logout = (message, role) => (dispatch) => {
  AuthServices.logout(role);

  dispatch({
    type: LOGOUT,
    role: role
  });

  dispatch({
    type: SET_MESSAGE,
    payload: message,
    role: role
  });
};

export const changePassword = (oldpassword, newPassword, userId, role) => (dispatch) => {
  return AuthServices.changePassword(oldpassword, newPassword, userId, role).then(
    (response) => {
      console.log("1", response);
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: { user: response },
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const changePasswordProfile = (oldpassword, newPassword, role) => (dispatch) => {
  return AuthServices.changePasswordProfile(oldpassword, newPassword, role).then(
    (response) => {
      console.log("cp prof", response);
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: { user: response },
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const placeBet = (userId, gameId, amount, rate, betType, betCandidate) => (dispatch) => {
  const role = "user";
  return AuthServices.placeBet(userId, gameId, amount, rate, betType, betCandidate).then(
    (response) => {
      console.log("place bet 1", response);
      // dispatch({
      //   type: PLACE_BET_SUCCESS,
      //   payload: { user: response },
      //   role: role
      // });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      // dispatch({
      //   type: PLACE_BET_FAIL,
      //   payload: error.response.status,
      //   role: role
      // });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const placeCricBet = (marketId, betCandidate, amount, betType, rate, sessionYesValue, sessionNoValue) => (dispatch) => {
  const role = "user";
  return AuthServices.placeCricBet(marketId, betCandidate, amount, betType, rate, sessionYesValue, sessionNoValue).then(
    (response) => {
      console.log("place bet 1", response);
      // dispatch({
      //   type: PLACE_BET_SUCCESS,
      //   payload: { user: response },
      //   role: role
      // });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      // dispatch({
      //   type: PLACE_BET_FAIL,
      //   payload: error.response.status,
      //   role: role
      // });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const savePreBetPreferencesOnServer = (pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8) => (dispatch) => {
  const role = "user";
  return AuthServices.savePreBetPreferencesOnServer(pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8).then(
    (response) => {
      console.log("pre bet 1", response);

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const overrideResult = (gameId, winner, role) => (dispatch) => {
  return AuthServices.overrideResult(gameId, winner, role).then(
    (response) => {
      dispatch({
        type: OVERRIDE_RESULT_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("overrideResult");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: OVERRIDE_RESULT_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const settle = (userName, upiId, amount, role) => (dispatch) => {
  return AuthServices.settle(userName, upiId, amount, role).then(
    (response) => {
      dispatch({
        type: SETTLE_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("settle");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: SETTLE_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const approveRecharge = (id, rechargeStatus, role) => (dispatch) => {
  return AuthServices.approveRecharge(id, rechargeStatus, role).then(
    (response) => {
      dispatch({
        type: APPROVE_RECHARGE_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("approve recharge");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: APPROVE_RECHARGE_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const approveWithdraw = (id, withdrawStatus, role, utrCode, message) => (dispatch) => {
  return AuthServices.approveWithdraw(id, withdrawStatus, role, utrCode, message).then(
    (response) => {
      dispatch({
        type: APPROVE_WITHDRAW_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("approve withdraw");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: APPROVE_WITHDRAW_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const addMyUpi = (userName, upiId, description, password, qrCode, role) => (dispatch) => {
  return AuthServices.addMyUpi(userName, upiId, description, password, qrCode, role).then(
    (response) => {
      dispatch({
        type: ADD_UPI_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("add myupi");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: ADD_UPI_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const deleteMyUpi = (id, password, role) => (dispatch) => {
  return AuthServices.deleteMyUpi(id, password, role).then(
    (response) => {
      dispatch({
        type: DELETE_UPI_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("delete myupi");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: DELETE_UPI_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const notifyAllUsers = (agentName, message, password, emailUser, role) => (dispatch) => {
  return AuthServices.notifyAllUsers(agentName, message, password, emailUser, role).then(
    (response) => {
      dispatch({
        type: NOTIFY_ALL_USERS_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("notify all users");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: NOTIFY_ALL_USERS_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const notifyUser = (agentName, userName, message, password, emailUser, role) => (dispatch) => {
  return AuthServices.notifyUser(agentName, userName, message, password, emailUser, role).then(
    (response) => {
      dispatch({
        type: NOTIFY_USER_SUCCESS,
        payload: response,
        role: role
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
        role: role
      });

      return response;
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.headers) ||
        error.message ||
        error.toString();
      console.log("notify user");
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.data.message);
      console.log(error.message);
      console.log(error.response.headers);

      dispatch({
        type: NOTIFY_USER_FAIL,
        payload: error.response.status,
        role: role
      });
      dispatch({
        type: SET_MESSAGE,
        payload: error.response.data,
        role: role
      });

      return error.response;
    }
  );
};

export const refreshToken = (accessToken, role) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
    role: role
  })
}