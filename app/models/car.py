from sqlalchemy.sql.expression import false, null, true
from sqlalchemy.sql.functions import count
from db import db, ma
from sqlalchemy.orm import relationship
from sqlalchemy import Column, BigInteger, String, Enum, select, Integer
from marshmallow import fields
import enum

class AuthType(str, enum.Enum):
    administrator = "administrator"
    member = "member"

class Car(db.Model):
    __tablename__ = 'cars'
    carId = Column(BigInteger, primary_key=True, nullable=False)
    maker = Column(String(50), nullable=False)
    model = Column(String(100), nullable=False)
    grade = Column(String(100), nullable=False)
    bodyColor = Column(String(100), nullable=False)
    price = Column(Integer, nullable=False)
    navi = Column(String(1))
    kawa = Column(String(1))
    sr = Column(String(1))

    # 管理者かどうか確認
    def is_administrator(self):
        return True if self.authority == AuthType.administrator else False
    
    # 更新時、画面からの値を設定
    def set_update_attribute(self, params):
        # エラーメッセージのインスタンス変数を作成
        self.errors = {'fatal': False}
        # ユーザ画面からくる値をインスタンスに設定
        for key in list(params["user"].keys()):
            setattr(self, key, params["user"][key])
    
    # 入力チェック
    def valid(self):
        validate = True
        # 一旦ストレートに書きます。
        if not self.login_id:
            self.errors['login_id'] = 'ログインIDは必須入力です。'
            validate = False
        if validate == True:
            users = db.session.query(User).where(User.login_id == self.login_id).count()
            if not users == 0:
                self.errors['login_id'] = 'そのログインIDはすでに登録されています。'
                validate = False
        if not self.password:
            self.errors['password'] = 'パスワードは必須入力です。'
            validate = False
        if not self.user_name:
            self.errors['user_name'] = 'ユーザ名は必須入力です。'
            validate = False
        if not self.email:
            self.errors['email'] = 'Eメールは必須入力です。'
            validate = False
        if not self.authority:
            self.errors['authority'] = '権限は必須入力です。'
            validate = False

        return validate
    
    @classmethod
    def get_car_list(self, params):
        # ダサいがこうするしかなく。。。
        cars = db.session.query(self)

        if params['maker'] != "":
            cars = cars.filter(
                self.maker == params['maker']
            )
        if params['model'] != "":
            cars = cars.filter(
                self.model == params['model']
            )
        if params['grade'] != "":
            cars = cars.filter(
                self.grade == params['grade']
            )
        if params['bodyColor'] != "":
            cars = cars.filter(
                self.bodyColor == params['bodyColor']
            )
        if params['price_min'] != "":
            cars = cars.filter(
                self.price >= params['price_min']
            )
        if params['price_max'] != "":
            cars = cars.filter(
                self.price <= params['price_max']
            )
        if params['navi'] != "" and params['navi'] != "false":
            cars = cars.filter(
                self.navi == "1"
            )
        if params['kawa'] != "" and params['kawa'] != "false":
            cars = cars.filter(
                self.kawa == "1"
            )
        if params['sr'] != "" and params['sr'] != "false":
            cars = cars.filter(
                self.sr == "1"
            )
        
        # order by 
        cars = cars.order_by(self.carId)
        
        return cars.all()    
    
class CarSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Car
