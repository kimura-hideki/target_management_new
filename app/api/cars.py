""" cars API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from db import db
from ..models.car import Car, CarSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
cars_bp = Blueprint(
    "cars_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@cars_bp.route("/cars", methods=["GET"])
@cars_bp.route("/cars/", methods=["GET"])
@cars_bp.route("/cars/<path:path>", methods=["GET"])
@login_required
def index(path=None):
    """ 
        index
        /cars/...でリクエストを受け取った場合
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@cars_bp.route("/api/cars", methods=["GET"])
@login_required
def cars():
    """
        検索処理 
    """
    params = request.values
    cars = Car.get_car_list(params)
    # 検索結果がない場合

    if len(cars) == 0:
        return jsonify({}), 404
    
    # JSONに変換
    car_schema = CarSchema()
    return jsonify({'cars': car_schema.dump(cars, many=True)}), 200

@cars_bp.route("/api/cars/<int:id>", methods=["GET"])
@login_required
def get_user(id):
    """
        ユーザ情報取得
    """
    user = db.session.query(User).get(id)
    
    # 存在しない場合
    if not user:
        return jsonify({}), 404
    
    # JSONに変換
    user_schema = UserSchema()
    return jsonify({'user': user_schema.dump(user)}), 200

@cars_bp.route("/api/cars/new/valid", methods=["post"])
@login_required
def do_create_confirm():
    """
        車種情報検証
    """
    params = request.get_json()

    cars = Car()
    cars.set_update_attribute(params)
    if not cars.valid():
        return jsonify(cars.errors), 400

    return jsonify({}), 200

@cars_bp.route("/api/users/create", methods=["post"])
@login_required
def do_create_post():
    """
        車種情報登録
    """
    params = request.get_json()

    users = User()
    users.set_update_attribute(params)

    if not users.valid():
        return jsonify(params), 400

    db.session.add(users)
    db.session.commit()

    return jsonify({}), 200

@cars_bp.route("/api/users/<int:id>/confirm", methods=["post"])
@login_required
def do_confirm(id):
    """
        ユーザ情報検証
    """
    params = request.get_json()
    print(params);
    
    # modeにより分岐
    if params["mode"] == "edit":
        # 更新時
        user = db.session.query(User).get(id)
        # 値を設定
        user.set_update_attribute(params)
        # 検証
        if not user.valid():
            # だめなら400で終了
            return jsonify(user.errors), 400
    
    return jsonify({}), 200

@cars_bp.route("/api/users/<int:id>/update", methods=["patch"])
@login_required
def do_update(id):
    """
        ユーザ情報検証
    """
    params = request.get_json()
    print(params);
    
    # modeにより分岐
    if params["mode"] == "edit":
        # 更新時
        user = db.session.query(User).get(id)
        # 値を設定
        user.set_update_attribute(params)
        # 検証
        if not user.valid():
            # だめなら400で終了
            return jsonify(user.errors), 400

        # 値は設定されているのでコミットする
        db.session.commit()
    
    return jsonify({}), 200
