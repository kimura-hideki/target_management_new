import React from "react"
import { Controller } from "react-hook-form";
import { any, bool, string } from "prop-types";
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@material-ui/core";

const MakerSelectControl = (props) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const readOnly = props.readOnly;
  const type = props.type;
  const error = props.error;
  const helperText = props.helperText;
  const value = props.value;

  /*
  * RHF(React Hook Form)のControllerコンポーネント(wapper)
  * 使用してMaterial-UIのSelectを使用している
  * かなりカオス
  */
  return (
    <FormControl
    error={error}
    style={{minWidth:150}}
    disabled={readOnly}
    >
    <InputLabel id="demo-simple-select-label">メーカー</InputLabel>
    <Controller
      name={name}
      control={control}
      style={{minWidth:200}}
      disabled={readOnly}
      defaultValue={value}
      helperText={helperText}
      render={
        function render ({ field:{ value, ref, onChange} }) {
          return (
            <Select
              label={label}
              variant="outlined"
              onChange={onChange}
              inputRef={ref}
              defaultValue={value}
              type={type}
              helperText={helperText}
              >
              <MenuItem value={""}>　</MenuItem>
              <MenuItem value={"トヨタ"}>トヨタ</MenuItem>
              <MenuItem value={"ニッサン"}>日産</MenuItem>
              <MenuItem value={"ホンダ"}>ホンダ</MenuItem>
              <MenuItem value={"ミツビシ"}>三菱</MenuItem>
              <MenuItem value={"マツダ"}>マツダ</MenuItem>
              <MenuItem value={"スバル"}>スバル</MenuItem>
              <MenuItem value={"スズキ"}>スズキ</MenuItem>
              <MenuItem value={"ダイハツ"}>ダイハツ</MenuItem>
            </Select>
          );             
        }
      }
    />
    <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
// 何故かTSが邪魔しているので
MakerSelectControl.propTypes = {
  name: string,
  control: any,
  label: string,
  value: any,
  readOnly: bool,
  type: string,
  helperText: string,
  error: bool
};

export default React.memo(MakerSelectControl);
