// CStgBulletUnitBaseFactoryクラス
var CStgBulletUnitBaseFactory = function( _bullet )
{
    // ユニット部分の生成
    this._unit = new CStgUnitBaseFactory( _bullet );
    
    // プレイヤーパラメータ
    this._unit._params._sizeX = 16;
    this._unit._params._sizeY = 24;
    this._unit._params._speed = 5.0;
};
    
/**
 * 初期化
 * @param {type} _posX
 * @param {type} _posY
 * @returns {CStgBulletUnitBaseFactory.prototype.CreateUnit._unit|CStgBulletUnitBaseFactory@pro;_unit@call;CreateUnit}
 */
CStgBulletUnitBaseFactory.prototype.CreateUnit = function( _posX, _posY )
{
    // キャラ作成
    var _unit = this._unit.CreateUnit( _posX, _posY );
    _unit.ExecMove = this.ExecMove;
    _unit.ExecShoot = this.ExecShoot;
    _unit.ExecAnim = this.ExecAnim;
    _unit.CheckState = this.CheckState;

    _unit.ShootNormal = this.ShootNormal;

    _unit._params._hit_circle = 10.0;
    _unit._params._wait_Shoot = 0.0;

    _unit.scaleX = 0.5;
    _unit.scaleY = 0.5;

    return _unit;
};

/**
 * 移動操作
 * @returns {undefined}
 */
CStgBulletUnitBaseFactory.prototype.ExecMove = function()
{
};

/**
 * 行動操作
 * @returns {undefined}
 */
CStgBulletUnitBaseFactory.prototype.ExecShoot = function()
{
};

/**
 * アニメーション
 * @returns {undefined}
 */
CStgBulletUnitBaseFactory.prototype.ExecAnim = function()
{
    this._sprite.image = _gGame.assets[ "dat/stg/bullet_0000.png" ];
};

/**
 * 状態チェック
 * @returns {undefined}
 */
CStgBulletUnitBaseFactory.prototype.CheckState = function()
{
};

/**
 * ショット
 * @returns {undefined}
 */
CStgBulletUnitBaseFactory.prototype.ShootNormal = function()
{
};


