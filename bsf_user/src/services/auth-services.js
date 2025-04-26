
import api from "./api";
import TokenService from "./token-service";

class AuthServices {
  login(userId, password) {
    return api
      .post("login/gamma/authenticate", JSON.stringify({
        userId,
        password
      }))
      .then(response => {
        console.log("login for user is ", response);
        TokenService.setUser(response.data);
        console.log("data saved is " + localStorage.getItem("user"));

        return response;
      });
  }

  logout(role) {
    TokenService.removeUser(role);
  }

  register(name, fixLimit, myMatchShare, othersMatchShare,
    othersMatchCommission, sessionCommission, password, registerType, registerBy) {
    console.log("register agent 2");
    let tailURL = "alpha/addAgent";
    console.log("add", tailURL);
    return api.post(tailURL, {
      name,
      fixLimit,
      myMatchShare,
      othersMatchShare,
      othersMatchCommission,
      sessionCommission,
      password,
      registerType,
      registerBy
    }).then(response => {
      return response;
    });
  }

  deposit(agentName, balance, password, role) {
    let tailURL = "alpha/depositAmount"
    if (role === "agent") {
      tailURL = "beta/depositAmount";
    }
    console.log("deposit", tailURL);
    return api.post(tailURL, {
      agentName,
      balance,
      password
    }).then(response => {
      return response;
    });
  }

  withdraw(agentName, balance, password, role) {
    let tailURL = "alpha/withdrawAmount"
    if (role === "agent") {
      tailURL = "beta/withdrawAmount";
    }
    console.log("withdraw", tailURL);
    return api.post(tailURL, {
      agentName,
      balance,
      password
    }).then(response => {
      return response;
    });
  }

  changePassword(oldPassword, newPassword, userId, role) {
    return api.post("login/gamma/setFirstPassword", {
      oldPassword,
      newPassword,
      userId
    }, { role }).then((response) => {
      console.log("cp resp", response);
      TokenService.setUser(response.data);

      return response;
    });
  };

  changePasswordProfile(oldPassword, newPassword, role) {
    let tailURL = "login/gamma/changePassword";
    return api.post(tailURL, {
      oldPassword,
      newPassword
    }).then((response) => {
      console.log("cp profile resp", response);
      // TokenService.setUser(response.data, role);

      return response;
    });
  };

  placeBet(userId, gameId, amount, rate, betType, betCandidate) {
    const role = "user";
    return api.post("gamma/placeBet", {
      userId,
      gameId,
      amount,
      rate,
      betType,
      betCandidate
    }, { role }).then((response) => {
      console.log("place bet", response);
      return response;
    });
  };

  placeCricBet(marketId, betCandidate, amount, betType, rate, sessionYesValue, sessionNoValue) {
    const role = "user";
    return api.post("gamma/placeBet", {
      marketId,
      betCandidate,
      amount,
      betType,
      rate,
      sessionYesValue,
      sessionNoValue
    }, { role }).then((response) => {
      console.log("place bet", response);
      return response;
    });
  };

  savePreBetPreferencesOnServer(pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8) {
    const userId = TokenService.getUserId();
    const role = "user";
    return api.post("gamma/savePreBetPreference", {
      userId,
      pb1,
      pb2,
      pb3,
      pb4,
      pb5,
      pb6,
      pb7,
      pb8
    }, { role }).then((response) => {
      console.log("pre bet", response);
      return response;
    });
  };

  block = (userName, accountStatus, password, role) => {
    let tailURL = "alpha/blockAgent";
    if (accountStatus === "BLOCKED") {
      tailURL = "alpha/unblockAgent";
      if (role === "agent") {
        tailURL = "beta/unblockUser";
      }
    } else {
      if (role === "agent") {
        tailURL = "beta/blockUser";
      }
    }

    return api.post(tailURL, {
      userName,
      password
    }).then((response) => {
      console.log("block resp", response)
      return response;
    });
  };

  overrideResult = (gameId, winner) => {
    const user = TokenService.getUser('admin');
    const adminName = user.userName;
    const tailURL = "alpha/override/result";

    return api.post(tailURL, {
      gameId,
      adminName,
      winner
    }).then((response) => {
      console.log("block resp", response)
      return response;
    });
  };

  settle(userName, upiId, amount, role) {
    let tailURL = "alpha/settleTransaction";
    if (role === "agent") {
      tailURL = "beta/settleTransaction";
    }
    console.log("settle", tailURL);
    return api.post(tailURL, {
      userName,
      upiId,
      amount
    }).then(response => {
      return response;
    });
  }

  approveRecharge(id, rechargeState, role) {
    let tailURL = "alpha/updateRechargeRequest";
    if (role === "agent") {
      tailURL = "beta/updateRechargeRequest";
    }
    console.log("approve recharge", tailURL);
    return api.post(tailURL, {
      id,
      rechargeState
    }).then(response => {
      return response;
    });
  }

  approveWithdraw(id, rechargeState, role, transactionNumber, message) {
    let tailURL = "alpha/updateWithdrawRequest";
    if (role === "agent") {
      tailURL = "beta/updateWithdrawRequest";
    }
    console.log("approve withdraw", tailURL);
    return api.post(tailURL, {
      id,
      rechargeState,
      transactionNumber,
      message
    }).then(response => {
      return response;
    });
  }

  addMyUpi(name, upi, description, password, image, role) {
    let tailURL = "alpha/addUpi";
    if (role === "agent") {
      tailURL = "beta/addUpi";
    }
    console.log("add upi", tailURL);
    return api.post(tailURL, {
      name,
      upi,
      description,
      password,
      image
    }).then(response => {
      return response;
    });
  }

  registerReferred(name, email, userName, agentCode, password, otp, tailURL) {

    console.log("add upi", tailURL);
    return api.post(tailURL, {
      name,
      email,
      userName,
      agentCode,
      password,
      otp
    }).then(response => {
      return response;
    });
  }

  deleteMyUpi(id, password, role) {
    let tailURL = "alpha/deleteUpi";
    if (role === "agent") {
      tailURL = "beta/deleteUpi";
    }
    console.log("delete upi", tailURL);
    return api.post(tailURL, {
      id,
      password
    }).then(response => {
      return response;
    });
  }

  notifyAllUsers(agentName, message, password, emailUser, role) {
    let tailURL = "alpha/notifyAllUsers"
    if (role === "agent") {
      tailURL = "beta/notifyAllUsers";
    }
    console.log("notify all users", tailURL);
    return api.post(tailURL, {
      agentName,
      message,
      emailUser,
      password
    }).then(response => {
      return response;
    });
  }

  notifyUser(agentName, userName, message, password, emailUser, role) {
    let tailURL = "alpha/notifyUser"
    if (role === "agent") {
      tailURL = "beta/notifyUser";
    }
    console.log("notify user", tailURL);
    return api.post(tailURL, {
      agentName,
      userName,
      message,
      emailUser,
      password
    }).then(response => {
      return response;
    });
  }

  //   getCurrentUser() {
  //     return TokenService.getUser();
  //   }
}

export default new AuthServices();