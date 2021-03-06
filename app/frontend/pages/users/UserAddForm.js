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
	//const [dummy, setDummy] = useState(false); // Material-UI???TextField?????????????????????useState

  // user ??????????????????
  const doConfirm = async (data) => {
    const url = `/api/users/new/valid`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "create"}`

    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        // ??????????????????????????????
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
          // ???????????????????????????????????????????????????????????????
          alert("???????????????????????????????????????");
          history.push("/users");
        } else {
          // ????????????????????????????????????????????????????????????
          history.push('/');
        }
      }
    );
  }

  // user ??????
  const doPost = async (data) => {
    const url = `/api/users/create`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "create"}`

    axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        // ??????????????????????????????????????????
        // history.push(`/users/${id}`);
        // setPageMode("show");
        alert("????????????????????????????????????????????????????????????????????????");
        history.push(`/users`);
      }
      
    ).catch(

    );
  }

  // ???????????????????????????????????????
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
      <InputLabel id="demo-simple-select-label">??????</InputLabel>
      <Controller
        render={
          // eslint-disable-next-line react/display-name
          ({ field }) => <Select {...field}>
            <MenuItem value={""}>???</MenuItem>
            <MenuItem value={"administrator"} selected={state.authority === "administrator" ? "selected" : ""}>?????????</MenuItem>
            <MenuItem value={"member"} selected={state.authority === "administrator" ? "selected" : ""}>????????????</MenuItem>
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
      <h1>?????????</h1>
      <LogoutButton />
      <br/>
      <div><br/><label>{pageMode === "confirm" ? "????????????????????????????????????????????????????????????" : "????????????????????????????????????????????????????????????????????????????????????"}</label></div>
      <form onSubmit={handleSubmit(
        pageMode === "confirm" ? doPost : doConfirm
      )}>
        <br/>
        <TextControl
          control={control}
          name="login_id"
          label="????????????ID"
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
          label="???????????????"
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
          label="????????????"
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
          label="E?????????"
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
          {"??????"}
        </Button>

        <Button 
          type="submit"
          variant="contained" 
          color={pageMode === "confirm" ? "secondary" : "primary"}
        >
          {pageMode === "confirm" ? "??????" : "??????"}
        </Button>
        </div>
      </form>
    </main>
  );
}

// ?????????TS???????????????????????????
UserAddForm.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(UserAddForm);
