
// CStgEffectUnitBaseFactoryクラス
var CStgEffectUnitBaseFactory = function()
{
    // ユニット部分の生成
    this._unit = new CStgUnitBaseFactory( null );
    
    // プレイヤーパラメータ
    this._unit._params._sizeX = 32;
    this._unit._params._sizeY = 32;
};

/**
 * 初期化
 * @returns {CStgEffectUnitBaseFactory.prototype.CreateUnit._tmp|CStgEffectUnitBaseFactory@pro;_unit@call;CreateUnit}
 */
CStgEffectUnitBaseFactory.prototype.CreateUnit = function()
{
    // キャラ作成
    var _tmp = this._unit.CreateUnit( 0.0, 0.0 );
    _tmp._sprite.image = _gGame.assets[ "dat/stg/effect_0000.png" ];

    _tmp._sprite.moveTo( 0.0, 0.0 );
    _tmp._sprite.scale( 1.0, 1.0 );
    _tmp._sprite.tl
            .moveBy( 100.0, 100.0, 180 ).and().scaleTo( 0.0, 0.0, 15 )
            .moveBy( 0.0, 0.0, 0 ).and().scaleTo( 0.0, 0.0, 0 )
            .loop();
    // _tmp._sprite.opacity = 0.75;

    _tmp._params._use = false;

    _tmp.ExecAnim = this.ExecAnim;

    return _tmp;
};

/**
 * アニメーション
 * @returns {undefined}
 */
CStgEffectUnitBaseFactory.prototype.ExecAnim = function()
{
    // this._sprite.image = _gGame.assets[ "dat/stg/bg0000.jpg" ];
};

/**
 * 移動操作
 * @returns {undefined}
 */
CStgEffectUnitBaseFactory.prototype.ExecMove = function()
{
    // this._sprite.image = _gGame.assets[ "dat/stg/bg0000.jpg" ];
};

CStgEffectUnitBaseFactory.prototype.SetEffect_0000 = function(_tmp)
{
    _tmp.ExecAnim = null;
    _tmp.ExecShoot = null;
    _tmp.ExecAnim = null;
    _tmp.CheckState = null;
    
    _tmp._sprite.image = _gGame.assets[ "dat/stg/effect_0000.png" ];
    _tmp._sprite.image.width = 32;
    _tmp._sprite.image.height = 32;
    _tmp._sprite.width = 32;
    _tmp._sprite.height = 32;
};
