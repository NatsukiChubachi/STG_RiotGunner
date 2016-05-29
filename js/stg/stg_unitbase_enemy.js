// CStgEnemyUnitBaseFactoryクラス
var CStgEnemyUnitBaseFactory = function( _bullet )
{
    // ユニット部分の生成
    this._unit = new CStgUnitBaseFactory( _bullet );
    
    // プレイヤーパラメータ
    this._unit._params._sizeX = 32;
    this._unit._params._sizeY = 32;
    this._unit._params._speed = 100.0;
};
    
/**
 * 初期化
 * @param {type} _posX
 * @param {type} _posY
 * @returns {CStgEnemyUnitBaseFactory@pro;_unit@call;CreateUnit|CStgEnemyUnitBaseFactory.prototype.CreateUnit._unit}
 */
CStgEnemyUnitBaseFactory.prototype.CreateUnit = function( _posX, _posY )
{
    // キャラ作成
    var _unit = this._unit.CreateUnit( _posX, _posY );
    _unit.ExecMove = this.ExecMove;
    _unit.ExecShoot = this.ExecShoot;
    _unit.ExecAnim = this.ExecAnim;
    _unit.CheckState = this.CheckState;

    _unit.ShootNormal = this.ShootNormal;

    _unit._params._anim_time = 0.0;
    _unit._params._anim_index = 0;

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
CStgEnemyUnitBaseFactory.prototype.ExecMove = function()
{
};

/**
 * 行動操作
 * @returns {undefined}
 */
CStgEnemyUnitBaseFactory.prototype.ExecShoot = function()
{
};

/**
 * アニメーション
 * @returns {undefined}
 */
CStgEnemyUnitBaseFactory.prototype.ExecAnim = function()
{
    // 変数の取得
    var _game  = _gGame;
    var _fps   = 1.0 / _game.fps;

    this._params._anim_time += _fps;
    if ( this._params._anim_time > 0.05 )
    {
        this._params._anim_time = 0.0;
        this._params._anim_index += 1;
        if ( this._params._anim_index > 1 )
        {
            this._params._anim_index = 0;
        }
    }

    switch( this._params._anim_index )
    {
    case 0:
        this._sprite.image = _gGame.assets[ "dat/stg/unit_0010_0000.png" ];
        break;
    case 1:
        this._sprite.image = _gGame.assets[ "dat/stg/unit_0010_0001.png" ];
        break;
    default:
        this._sprite.image = _gGame.assets[ "dat/stg/unit_0010_0000.png" ];
        break;
    };
};

/**
 * 状態チェック
 * @returns {undefined}
 */
CStgEnemyUnitBaseFactory.prototype.CheckState = function()
{
};

/**
 * ショット
 * @returns {undefined}
 */
CStgEnemyUnitBaseFactory.prototype.ShootNormal = function()
{
};


