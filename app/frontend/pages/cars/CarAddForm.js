import { any } from "prop-types";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import TextControl from "../../components/form/TextControl";
import MakerSeleCtcontrol from "../../components/form/MakerSeleCtcontrol";
import CheckBoxControl from "../../components/form/CheckBoxControl";
import LogoutButton from "../../components/LogoutButton";
import axios from "axios";
import { getErrorCondition, getErroMessage} from "../../common/error"
import Button from "@material-ui/core/Button";

// user initialState
const initialState = {
  carId: undefined,
  maker: undefined,
  model: undefined,
  grade: undefined,
  bodyColor: undefined,
  price: undefined,
  navi: undefined,
  kawa: undefined,
  sr: undefined,
  errors: {}
}

// user reducer
const reducer = (state, action) => {
	console.log(action);

  switch(action.type) {
    case "NEW_USER":
      console.log("NEW_USER");
      return {...state,
        carId: "",
        maker: "",
        model: "",
        grade: "",
        bodyColor: "",
        price: "",
        navi: "",
        kawa: "",
        sr: "",
        errors: {},
      };
    case "GET_USER":
      return {...state,
        carId: action.payload.carId,
        maker: action.payload.maker,
        model: action.payload.model,
        grade: action.payload.grade,
        bodyColor: action.payload.bodyColor,
        price: action.payload.price,
        navi: action.payload.navi,
        kawa: action.payload.kawa,
        sr: action.payload.sr,
        errors: {},
      };
    case "CONFIRM":
      return {...state,
        carId: action.payload.carId,
        maker: action.payload.maker,
        model: action.payload.model,
        grade: action.payload.grade,
        bodyColor: action.payload.bodyColor,
        price: action.payload.price,
        navi: action.payload.navi,
        kawa: action.payload.kawa,
        sr: action.payload.sr,
        errors: action.payload,
      };
      case "COMPLETE":
        return {...state,
          carId: "",
          maker: "",
          model: "",
          grade: "",
          bodyColor: "",
          price: "",
          navi: "",
          kawa: "",
          sr: "",
          errors: {},
        };
      case "ERROR_CLEAR":
      return {...state,
        errors: {},
      };
  }
  return state;
}

const CarAddForm = (props) => {
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
    const url = `/api/cars/new/valid`;
    const carJSON = `{"car": ${JSON.stringify(data)}, "mode": "create"}`

    await axios.post(url, JSON.parse(carJSON))
    .then(
      () => {
        // エラーをリフレッシュ
        dispatch ({type: 'CONFIRM', payload: {}})
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
          history.push("/cars");
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // 登録
  const doPost = async (data) => {
    console.log(data);
    const url = `/api/cars/create`;
    const carJSON = `{"car": ${JSON.stringify(data)}, "mode": "create"}`

    axios.post(url, JSON.parse(carJSON))
    .then(
      () => {
        // 更新できたら詳細画面に飛ばす
        // history.push(`/users/${id}`);
        // setPageMode("show");
        // alert("車種情報登録が完了しました。検索画面へ戻ります。");
        history.push(`/cars/new/complete`);
      }
      
    ).catch(

    );
  }

  // 確認→入力画面→検索へ戻る
  const returnForrm = async (data) => {
    if( pageMode === "new" ){
      history.push(`/cars`);
    }else{
      const user = data;
      dispatch ({type: 'NEW_USER', payload: user})
      setPageMode("new");
    }
  }

  return (
    <main>
      <h1>車種情報</h1>
      <LogoutButton />
      <br/>
      <div><br/><label>{pageMode === "confirm" ? "内容を確認し登録ボタンを押してください。" : "登録する車種情報情報を入力し確認ボタンを押してください。"}</label></div>
      <form onSubmit={handleSubmit(
        pageMode === "confirm" ? doPost : doConfirm
      )}>
        <br/>
        <MakerSeleCtcontrol
            control={control}
            name="maker"
            label="メーカー"
            value={state.maker}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, "maker")}
            helperText={getErroMessage(state.errors, "maker")}     
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="model"
          label="車種"
          value={state.model}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "model")}
          helperText={getErroMessage(state.errors, "model")}
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="grade"
          label="グレード"
          value={state.grade}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "grade")}
          helperText={getErroMessage(state.errors, "grade")}
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="bodyColor"
          label="ボディカラー"
          value={state.bodyColor}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "bodyColor")}
          helperText={getErroMessage(state.errors, "bodyColor")}
        />
        <br/>
        <br/>
        <TextControl
          control={control}
          name="price"
          label="金額"
          value={state.price}
          readOnly={readOnly}
          error={getErrorCondition(state.errors, "price")}
          helperText={getErroMessage(state.errors, "price")}
        />
        <br/>
        <br/>
        <CheckBoxControl
            control={control}
            name="navi"
            label="ナビ"
            readOnly={readOnly}
            defaultValue={state.navi == "1"}
            error={getErrorCondition(state.errors, "navi")}
            helperText={getErroMessage(state.errors, "navi")}
            />
          <br/>
          <br/>
        <CheckBoxControl
            control={control}
            name="kawa"
            label="革シート"
            readOnly={readOnly}
            defaultValue={state.kawa == "1"}
            error={getErrorCondition(state.errors, "kawa")}
            helperText={getErroMessage(state.errors, "kawa")}
          />
          <br/>
          <br/>
        <CheckBoxControl
            control={control}
            name="sr"
            label="サンルーフ"
            readOnly={readOnly}
            defaultValue={state.sr == "1"}
            error={getErrorCondition(state.errors, "sr")}
            helperText={getErroMessage(state.errors, "sr")}
          />
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
CarAddForm.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(CarAddForm);
