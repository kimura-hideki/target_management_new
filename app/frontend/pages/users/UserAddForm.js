import { any } from "prop-types";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import TextControl from "../../components/form/TextControl";
import LogoutButton from "../../components/LogoutButton";
import axios from "axios";
import { getErrorCondition, getErroMessage} from "../../common/error"
import Button from "@material-ui/core/Button";
import { InputLabel, FormControl, FormHelperText, Select, MenuItem } from "@material-ui/core";

// user initialState
const initialState = {
  id: undefined,
  login_id: undefined,
  password: undefined,
  user_name: undefined,
  email: undefined,
  authority: undefined,
  errors: {}
}

// user reducer
const reducer = (state, action) => {
	console.log(action);

  switch(action.type) {
    case "NEW_USER":
      console.log("NEW_USER");
      return {...state,
        id: "",
        login_id: "",
        password: "",
        user_name: "",
        email: "",
        authority: "",
        errors: {},
      };
    case "GET_USER":
      return {...state,
        id: action.payload.id,
        login_id: action.payload.login_id,
        password: action.payload.password,
        user_name: action.payload.user_name,
        email: action.payload.email,
        authority: action.payload.authority,
        errors: {},
      };
    case "CONFIRM":
      return {...state,
        id: action.payload.id,
        login_id: action.payload.login_id,
        password: action.payload.password,
        user_name: action.payload.user_name,
        email: action.payload.email,
        authority: action.payload.authority,
        errors: action.payload,
      };
    case "ERROR_CLEAR":
      return {...state,
        errors: {},
      };
  }
  return state;
}

const UserAddForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const [pageMode, setPageMode] = useState(props.pageMode);
  const readOnly = pageMode === "new" ? false : true;
  const {control, handleSubmit} = useForm({
    shouldUnregister: false
  });
	//const [dummy, setDummy] = useState(false); // Material-UIのTextFieldリフレッシュ用useState

  // user 入力チェック
  const doConfirm = async (data) => {
    const url = `/api/users/new/valid`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "create"}`

    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        // エラーをリフレッシュ
        // const user = data;
				// console.log("user");
				// console.log(user);
        // dispatch ({type: 'CONFIRM', payload: user})
        setPageMode("confirm");
      }
    ).catch(
      (error) => {
				console.log(error);
        if (error.response.status === 400) {
          const errors = error.response.data;
          dispatch ({type: 'CONFIRM', payload: errors})
        }
        else if (error.response.status === 404) {
          // 一旦アラート表示して検索画面に逃してしまう
          alert("該当ユーザが存在しないよ。");
          history.push("/users");
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // user 登録
  const doPost = async (data) => {
    const url = `/api/users/create`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "create"}`

    axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        // 更新できたら詳細画面に飛ばす
        // history.push(`/users/${id}`);
        // setPageMode("show");
        alert("ユーザー登録が完了しました。検索画面へ戻ります。");
        history.push(`/users`);
      }
      
    ).catch(

    );
  }

  // 確認→入力画面→検索へ戻る
  const returnForrm = async (data) => {
    if( pageMode === "new" ){
      history.push(`/users`);
    }else{
      const user = data;
      dispatch ({type: 'NEW_USER', payload: user})
      setPageMode("new");
    }
  }

  const authoritySelect = (
    <FormControl
      error={getErrorCondition(state.errors, "authority")}
      style={{minWidth:150}}
      disabled={readOnly}
    >        
      <InputLabel id="demo-simple-select-label">権限</InputLabel>
      <Controller
        render={
          // eslint-disable-next-line react/display-name
          ({ field }) => <Select {...field}>
            <MenuItem value={""}>　</MenuItem>
            <MenuItem value={"administrator"} selected={state.authority === "administrator" ? "selected" : ""}>管理者</MenuItem>
            <MenuItem value={"member"} selected={state.authority === "administrator" ? "selected" : ""}>メンバー</MenuItem>
          </Select>
        }
        control={control}
        name="authority"
        defaultValue={state.authority}
      />
      <FormHelperText>{getErroMessage(state.errors, "authority")}</FormHelperText>
    </FormControl>
  );



  return (
    <main>
      <h1>ユーザ</h1>
      <LogoutButton />
      <br/>
      <div><br/><label>{pageMode === "confirm" ? "内容を確認し登録ボタンを押してください。" : "登録するユーザー情報を入力し確認ボタンを押してください。"}</label></div>
      <form onSubmit={handleSubmit(
        pageMode === "confirm" ? doPost : doConfirm
      )}>
        <br/>
        <TextControl
          control={control}
          name="login_id"
          label="ログインID"
          value={state.login_id}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "login_id")}
          helperText={getErroMessage(state.errors, "login_id")}            
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="password"
          label="パスワード"
          value={state.password}
          readOnly={readOnly}
          type="password"
          error={getErrorCondition(state.errors, "password")}
          helperText={getErroMessage(state.errors, "password")}            
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="user_name"
          label="ユーザ名"
          value={state.user_name}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "user_name")}
          helperText={getErroMessage(state.errors, "user_name")}            
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="email"
          label="Eメール"
          value={state.email}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "email")}
          helperText={getErroMessage(state.errors, "email")}            
        />
        <br/>
        <div style={{marginTop:10}}>
        {authoritySelect}
        </div>
        <br/>
        <div style={{marginTop:10}}>
        <Button 
          type="button"
          variant="contained"
          style={{marginRight:10}}
          onClick={returnForrm}
        >
          {"戻る"}
        </Button>

        <Button 
          type="submit"
          variant="contained" 
          color={pageMode === "confirm" ? "secondary" : "primary"}
        >
          {pageMode === "confirm" ? "登録" : "確認"}
        </Button>
        </div>
      </form>
    </main>
  );
}

// 何故かTSが邪魔しているので
UserAddForm.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(UserAddForm);
