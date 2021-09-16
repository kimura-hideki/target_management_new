import React from "react"
import { Controller } from "react-hook-form";
import { any, bool, string } from "prop-types";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckBoxControl = (props) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const value = props.value;
  const defaultValue = props.defaultValue;
  const readOnly = props.readOnly;


  /*
  * RHF(React Hook Form)のControllerコンポーネント(wapper)
  * 使用してMaterial-UIのCheckboxを使用している
  * かなりカオス
  */
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            value={value}
            render={function render ({ field:{ value, onChange} }) {
                return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={value}
                            name={name}
                            disabled={readOnly}
                            onChange={onChange}
                            value="1"
                            />
                    }
                    label={label}
                />
                );
            }}
        />
    );
}
// 何故かTSが邪魔しているので
CheckBoxControl.propTypes = {
  name: string,
  control: any,
  label: string,
  value: any,
  defaultValue: any,
  readOnly: bool,
  type: string,
  error: bool,
  checked: bool
};

export default React.memo(CheckBoxControl);
