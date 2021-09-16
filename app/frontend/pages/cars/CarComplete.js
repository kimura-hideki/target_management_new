import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { any } from "prop-types";
import { useHistory } from "react-router";

const CarsComplete = (props) => {
    const status = useState(props.status);
    const history = useHistory();

  // 検索項目などはいっぱいあったりするかもなので
  // formでまとめてやる(React Hook Form)
  return (
    <main>
        <h1>車両情報の{status === "complete" ? '登録' : '更新'}が完了しました。</h1>
        <Button 
            type="button"
            variant="contained" 
            color="secondary"
            onClick={() => { history.push("/cars") }}
          >
            検索へ戻る
          </Button>
          <Button 
            type="button"
            variant="contained" 
            color="secondary"
            onClick={() => { history.push("/cars/new") }}
          >
            続けて登録する
          </Button>

      <br/>
    </main>
  );
}
// 何故かTSが邪魔しているので
CarsComplete.propTypes = {
  status: any
}

export default React.memo(CarsComplete);
