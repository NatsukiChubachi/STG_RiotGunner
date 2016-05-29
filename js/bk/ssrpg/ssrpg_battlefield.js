/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var _gSsrpgBattleField_MapChipSizeX = 50;
var _gSsrpgBattleField_MapChipSizeY = 40;

// SSRPG戦場クラス
var CSsrpgBattleField = function() {
    
    // 初期化処理
    this.initialize = function( _game ) 
    {
        // シーン作成
        this._game = _game;
        this._scene = new Scene();
        
        // 背景色
        this._scene.backgroundColor = "#999999";
        
        // ラベル作成
        var lblMsg = new Label( "SSRPG BattleField Page." );
        lblMsg.x = 10;
        lblMsg.y = 10;
        lblMsg.font = "16px cursive";
        lblMsg.textAlign = "left";
        this._scene.addChild( lblMsg );

        // 作成したシーンを追加する
        this._game.pushScene( this._scene );
        
        // 背景
        this.createChip = function(x, y)
        {
            var iSizeX = _gSsrpgBattleField_MapChipSizeX;
            var iSizeY = _gSsrpgBattleField_MapChipSizeY;
            
            var _field = new Sprite(iSizeX, iSizeY);
            {
                var surf = new Surface(iSizeX, iSizeY);
                surf.context.beginPath();
                surf.context.fillStyle = "rgba(255,0,0,0.5)";
                surf.context.rect(0, 0, iSizeX, iSizeY);
                surf.context.stroke();
                _field.image = surf;
                
                _field.x = iSizeX * x;
                _field.y = iSizeY * y;
            }
            this._scene.addChild( _field );
        };
        
        for(var j=0; j<4; j++)
        {
            for(var i=0; i<8; i++)
            {
                this.createChip(i, j);
            }
        }
              
    };
    
    return this;
};


