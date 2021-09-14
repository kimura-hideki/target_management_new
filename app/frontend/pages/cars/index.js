import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { any } from "prop-types";
import axios from "axios";
import CarsList from "./CarsList";
import { useHistory } from "react-router";
import MakerSeleCtcontrol from "../../components/form/MakerSeleCtcontrol";
import TextControl from "../../components/form/TextControl";
import CheckBoxControl from "../../components/form/CheckBoxControl";

const Cars = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const {control, handleSubmit} = useForm();
  const [carsResult, setCarsResult] = useState([]);
  const [searchResult, setSearchResult] = useState('検索してください。');
  const history = useHistory();

  // React側でもログイン状態かチェック
  // 管理者は別メニューが出るようにする
  const menuAuthCheck = async () => {
    const url = "/api/menu_auth"

    await axios.get(url)
    .then(
      (response) => {
        setIsAdmin(response.data.admin);
      }
    ).catch(
      () => {
        // 状態チェックでエラーになった場合も一旦ログイン画面へ
        history.push("/");
      }
    )
  }

  const doSearch = async (data) => {

    const url = "/api/cars";
    const searchJSON = `{"params": ${JSON.stringify(data)}}`
    await axios.get(url, JSON.parse(searchJSON))
    .then(
      (response) => {
        setCarsResult(response.data.cars);
      }
    ).catch(
      (error) => {
        if (error.response.status === 404 ) {
          // エラーメッセージを取得
          setSearchResult('検索結果がありませんでした。');
          setCarsResult([]);
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // ランディング(最初の描画時のみ)実施
  useEffect(() => {
    menuAuthCheck();
  },[]);

  // 検索項目などはいっぱいあったりするかもなので
  // formでまとめてやる(React Hook Form)
  return (
    <main>
      <h1>車両情報一覧</h1>
      <form onSubmit={handleSubmit(doSearch)}>
        <MakerSeleCtcontrol
            control={control}
            name="maker"
            label="メーカー"
            value=""
        />
        <br/>
        <TextControl
            control={control}
            name="model"
            label="車種"
            value=""
          />
        <br/>
        <TextControl
            control={control}
            name="grade"
            label="グレード"
            value=""
          />
        <br/>
        <TextControl
            control={control}
            name="bodyColor"
            label="ボディカラー"
            value=""
          />
        <TextControl
            control={control}
            name="price_min"
            label="価格下限"
            value=""
          />
        <TextControl
            control={control}
            name="price_max"
            label="価格上限"
            value=""
          />
          <br/>
        <CheckBoxControl
            control={control}
            name="navi"
            label="ナビ"
            value=""
          />
        <CheckBoxControl
            control={control}
            name="kawa"
            label="革シート"
            value=""
          />
        <CheckBoxControl
            control={control}
            name="sr"
            label="サンルーフ"
            value=""
          />

        <br/>
        <br/>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
        >
          検索
        </Button>
        {
        isAdmin ? 
          <Button 
            type="button"
            variant="contained" 
            color="secondary"
            onClick={() => { history.push("/cars/new") }}
          >
            新規作成
          </Button>
          :
          <></>
        }
      </form>
      <br/>
      {
        carsResult.length === 0 ?
        <div>{searchResult}</div>
        :
        <CarsList cars={carsResult} />
      }
    </main>
  );
}
// 何故かTSが邪魔しているので
Cars.propTypes = {
  field: any,
  fieldState: any
}

export default React.memo(Cars);
