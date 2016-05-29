
// CStgBgEntityUnitBaseFactoryクラス
var CStgBgEntityUnitBaseFactory = function( _bullet )
{
    // ユニット部分の生成
    this._unit = new CStgUnitBaseFactory( _bullet );
    
    // プレイヤーパラメータ
    this._unit._params._sizeX = 500;
    this._unit._params._sizeY = 500;
    this._unit._params._speed = 10.0;
};

/**
 * 初期化
 * @returns {Array|CStgBgEntityUnitBaseFactory.prototype.CreateUnit._unitTable}
 */
CStgBgEntityUnitBaseFactory.prototype.CreateUnit = function()
{
    // キャラ作成
    var _unitTable = new Array( 3 );
    _unitTable[ 0 ] = this._unit.CreateUnit( 0.0, 0.0 );
    _unitTable[ 1 ] = this._unit.CreateUnit( 0.0, 0.0 );
    _unitTable[ 2 ] = this._unit.CreateUnit( 0.0, 0.0 );

    _unitTable[ 0 ].ExecMove = this.ExecMove;
    _unitTable[ 1 ].ExecMove = this.ExecMove;
    _unitTable[ 2 ].ExecMove = this.ExecMove;

    _unitTable[ 0 ].ExecAnim = this.ExecAnim;
    _unitTable[ 1 ].ExecAnim = this.ExecAnim;
    _unitTable[ 2 ].ExecAnim = this.ExecAnim;

    _unitTable[ 0 ]._sprite.moveTo( 0.0, -490.0 );
    _unitTable[ 1 ]._sprite.moveTo( 0.0,   10.0 );
    _unitTable[ 2 ]._sprite.moveTo( 0.0, 500.0 );

    _unitTable[ 0 ]._sprite.opacity = 0.75;
    _unitTable[ 1 ]._sprite.opacity = 0.75;
    _unitTable[ 2 ]._sprite.opacity = 0.75;

    _unitTable[ 0 ]._sprite.tl.moveTo( 0.0, 0.0, 180 ).moveTo( 0.0, -490.0, 0 ).loop();
    _unitTable[ 1 ]._sprite.tl.moveTo( 0.0, 490.0, 180 ).moveTo( 0.0, 10.0, 0 ).loop();
    _unitTable[ 2 ]._sprite.tl.moveTo( 0.0, 990.0, 180 ).moveTo( 0.0, 500.0, 0 ).loop();

    return _unitTable;
};

/**
 * アニメーション
 * @returns {undefined}
 */
CStgBgEntityUnitBaseFactory.prototype.ExecAnim = function()
{
    this._sprite.image = _gGame.assets[ "dat/stg/bg0000.jpg" ];
};

/**
 * 移動操作
 * @returns {undefined}
 */
CStgBgEntityUnitBaseFactory.prototype.ExecMove = function()
{
};

