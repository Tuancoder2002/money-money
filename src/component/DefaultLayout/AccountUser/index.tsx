import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../redux/authReducer';

function AccountUser() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
 ;

    return ( 
        <div>
          {user && (
             <div className="d-flex justify-content-center align-items-center">
            <img
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/370268855_1695003577662262_8933963674553939351_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=K1Gv9wIxRg8AX99qBn-&_nc_oc=AQmb9UTWD_2WYnczZNempbTrIZo1VEcIqrRqPIsEmoqg4AYL55BZUtllNT4SToBvHdzyIhL0XrzTsqbcEmR669BI&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBr3MX8bJ2PIpMla6nZeAqETfMrVkFhBSjnpBUd7DEQZw&oe=65086372"
              alt="Avatar"
              className="rounded-circle m-2"
              style={{ width: "80px", height: "80px" }}
            />
            <div className="d-flex flex-column m-3">
              <span className="m-0" style={{ fontSize: "16px" }}>
                Thevinh.It.Kh.1997
              </span>
              <span className="m-0" style={{ fontSize: "12px" }}>
              {user.email}
              </span>
            </div>
          </div>
           )}
          <div className="d-flex align-items-center">
            <span className="m-0 mr-auto">Thiết bị (3/5)</span>
          </div>

          <div className="d-flex align-items-center m-2" >
            <img
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/370268855_1695003577662262_8933963674553939351_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=K1Gv9wIxRg8AX99qBn-&_nc_oc=AQmb9UTWD_2WYnczZNempbTrIZo1VEcIqrRqPIsEmoqg4AYL55BZUtllNT4SToBvHdzyIhL0XrzTsqbcEmR669BI&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBr3MX8bJ2PIpMla6nZeAqETfMrVkFhBSjnpBUd7DEQZw&oe=65086372"
              alt="Avatar"
              className="rounded-circle m-2"
              style={{ width: "36px", height: "36px" }}
            />
            <div className="d-flex flex-column m-0">
              <span className="m-0" style={{ fontSize: "16px" }}>
                Web Browser
              </span>
              <span className="m-0" style={{ fontSize: "12px" }}>
                Thiết bị này
              </span>
            </div>
          </div>
          <hr className="text-dark d-none d-sm-block" />

          <div className="d-flex align-items-center m-2">
            <img
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/370268855_1695003577662262_8933963674553939351_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=K1Gv9wIxRg8AX99qBn-&_nc_oc=AQmb9UTWD_2WYnczZNempbTrIZo1VEcIqrRqPIsEmoqg4AYL55BZUtllNT4SToBvHdzyIhL0XrzTsqbcEmR669BI&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBr3MX8bJ2PIpMla6nZeAqETfMrVkFhBSjnpBUd7DEQZw&oe=65086372"
              alt="Avatar"
              className="rounded-circle m-2"
              style={{ width: "36px", height: "36px" }}
            />
            <div className="d-flex flex-column m-0">
              <span className="m-0" style={{ fontSize: "16px" }}>
                Iphone
              </span>
              <span className="m-0" style={{ fontSize: "12px" }}>
                Vào 10 ngày sước
              </span>
            </div>
          </div>
          <hr className="text-dark d-none d-sm-block" />

          <div className="d-flex align-items-center m-2">
            <img
              src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/370268855_1695003577662262_8933963674553939351_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=K1Gv9wIxRg8AX99qBn-&_nc_oc=AQmb9UTWD_2WYnczZNempbTrIZo1VEcIqrRqPIsEmoqg4AYL55BZUtllNT4SToBvHdzyIhL0XrzTsqbcEmR669BI&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfBr3MX8bJ2PIpMla6nZeAqETfMrVkFhBSjnpBUd7DEQZw&oe=65086372"
              alt="Avatar"
              className="rounded-circle m-2"
              style={{ width: "36px", height: "36px" }}
            />
            <div className="d-flex flex-column m-0">
              <span className="m-0" style={{ fontSize: "16px" }}>
                Android
              </span>
              <span className="m-0" style={{ fontSize: "12px" }}>
                Thiết bị này
              </span>
            </div>
          </div>
        </div>
     );
}

export default AccountUser;