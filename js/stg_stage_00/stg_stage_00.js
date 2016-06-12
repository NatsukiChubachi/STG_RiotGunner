/*
{
  "StageScript":{
    "parts_0000": {
      "_use": true,
      "_time": 50,
      "_func": "function( _s, _e ){ var _tmp; for ( var i = 0; i < 3; i++ ){ _tmp = GetNoUseEnemy(); if ( _tmp !== null ){ _tmp._params._use = true; _tmp.tl.clear(); _tmp.tl.moveTo( 50.0 + (50.0 * i), 5.0, 0.0).moveBy( 0.0, 50, 60 ).delay( 120 ).moveBy( 0.0, 500.0, 360 ); _s.addChild( _tmp ); } } }",
      "_move" : "function( _s, _e ){  }"
    },
    "parts_0010": {
      "_use": true,
      "_time": 400,
      "_func": "function( _s, _e ){ var _tmp; for ( var i = 0; i < 3; i++ ){ _tmp = GetNoUseEnemy(); if ( _tmp !== null ){ _tmp._params._use = true; _tmp.tl.clear(); _tmp.tl.moveTo( 100.0 + (50.0 * i), 5.0, 0.0).moveBy( 0.0, 50, 60 ).delay( 120 ).moveBy( 0.0, 500.0, 360 ); _s.addChild( _tmp ); } } }",
      "_move" : "function( _s, _e ){  }"
    }
  }
}
*/
_gStgStage00 = {
    "parts_0000": {
      "_use": true,
      "_time": 50,
      "_func": function( _s, _e )
      { 
          var _tmp;
          for ( var i = 0; i < 3; i++ ){
              _tmp = GetNoUseEnemy(); 
              if ( _tmp !== null )
              { 
                  _tmp._params._use = true;
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 50.0 + (30.0 * i), -25.0, 0.0)
                          .moveBy( 0.0, 75, 60 )
                          .delay( 120 )
                          .moveBy( 0.0, 500.0, 360 ); 
                  _s.addChild( _tmp ); 
              }
          }
      },
      "_move" : function( _s, _e ){  }
    },
    
    "parts_0010": {
      "_use": true,
      "_time": 250,
      "_func": function( _s, _e )
      {
          var _tmp;
          for ( var i = 0; i < 3; i++ )
          { 
              _tmp = GetNoUseEnemy();
              if ( _tmp !== null )
              {
                  _tmp._params._use = true; 
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 150.0 + (30.0 * i), -25.0, 0.0)
                          .moveBy( 0.0, 75, 60 )
                          .delay( 120 )
                          .moveBy( 0.0, 500.0, 360 );
                  _s.addChild( _tmp );
              } 
          }
      },
      "_move" : function( _s, _e ){  }
    },
    
    "parts_0011": {
      "_use": true,
      "_time": 400,
      "_func": function( _s, _e )
      { 
          var _tmp;
          for ( var i = 0; i < 3; i++ ){
              _tmp = GetNoUseEnemy(); 
              if ( _tmp !== null )
              { 
                  _tmp._params._use = true;
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 10.0 + (30.0 * i), -25.0, 0.0)
                          .moveBy( 0.0, 75, 60 )
                          .delay( 120 )
                          .moveBy( 0.0, 500.0, 360 ); 
                  _s.addChild( _tmp ); 
              }
          }
      },
      "_move" : function( _s, _e ){  }
    },
    
    "parts_0012": {
      "_use": true,
      "_time": 500,
      "_func": function( _s, _e )
      {
          var _tmp;
          for ( var i = 0; i < 3; i++ )
          { 
              _tmp = GetNoUseEnemy();
              if ( _tmp !== null )
              {
                  _tmp._params._use = true; 
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 100.0 + (30.0 * i), -25.0, 0.0)
                          .moveBy( 0.0, 75, 60 )
                          .delay( 120 )
                          .moveBy( 0.0, 500.0, 360 );
                  _s.addChild( _tmp );
              } 
          }
      },
      "_move" : function( _s, _e ){  }
    },
       
    "parts_0013": {
        "_use": true,
        "_time": 650,
        "_func": function( _s, _e )
        {
              var _tmp = GetNoUseEnemy();
              if ( _tmp !== null )
              {
                  _tmp._params._use = true; 
                  _tmp._params._life = 100;
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 150.0, -25.0, 0.0)
                          .moveBy( 0.0, 75, 60 )
                          .delay( 120 )
                          .moveBy( 0.0, 500.0, 360 );
                  _s.addChild( _tmp );
              } 
        },
        "_move" : function( _s, _e ){  }
    },
       
    "parts_0020": {
      "_use": true,
      "_time": 800,
      "_func": function( _s, _e )
      {
          var _tmp;
          for ( var i = 0; i < 5; i++ )
          { 
              _tmp = GetNoUseEnemy();
              if ( _tmp !== null )
              {
                  _tmp._params._use = true; 
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 200.0, -50.0, 0.0 ).and().rotateTo( 0, 0 )
                          .moveTo( 200.0, -50.0, (30.0*i) )
                          .moveTo( 200.0, 50, 60 )//, enchant.Easing.QUAD_EASEINOUT  )
                          .moveTo( 50.0, 100, 120 ).and().rotateTo( 45, 30 )//, enchant.Easing.QUAD_EASEINOUT  )
                          .moveTo( 50.0, 200, 60 ).and().rotateTo( 0, 30 )//, enchant.Easing.QUAD_EASEINOUT  )
                          .moveBy( 0.0, 500.0, 360 );
                  _s.addChild( _tmp );
              } 
          }
      },
      "_move" : function( _s, _e ){  }
    },
    
    "parts_0030": {
      "_use": true,
      "_time": 1100,
      "_func": function( _s, _e )
      {
          var _tmp;
          for ( var i = 0; i < 5; i++ )
          { 
              _tmp = GetNoUseEnemy();
              if ( _tmp !== null )
              {
                  _tmp._params._use = true; 
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 50.0, -50.0, 0.0 ).and().rotateTo( 0, 0 )
                          .moveTo( 50.0, -50.0, (30.0*i) )
                          .moveTo( 50.0, 50, 60 )//, enchant.Easing.QUAD_EASEINOUT  )
                          .moveTo( 200.0, 100, 120 ).and().rotateTo( -45, 30 )//, enchant.Easing.QUAD_EASEINOUT  )
                          .moveTo( 200.0, 200, 60 ).and().rotateTo( 0, 30 )//, enchant.Easing.QUAD_EASEINOUT  )
                          .moveBy( 0.0, 500.0, 360 );
                  _s.addChild( _tmp );
              } 
          }
      },
      "_move" : function( _s, _e ){  }
    },
    
    "parts_0040": {
      "_use": true,
      "_time": 1200,
      "_func": function( _s, _e )
      {
          var _tmp;
          for ( var i = 0; i < 1; i++ )
          { 
              _tmp = GetNoUseEnemy();
              if ( _tmp !== null )
              {
                  _tmp._params._use = true; 
                  _tmp._params._life = 100;
                  _tmp.tl.clear();
                  _tmp.tl
                          .moveTo( 200.0, -50.0, 0.0 ).and().rotateTo( 0, 0 )
                          .moveTo( 200.0, 50.0, 60, enchant.Easing.QUAD_EASEINOUT )
                          .delay( 30 )
                          .then( function(){
                              for ( var i = 0; i < 5; i++ )
                              {
                                var _tmp = GetNoUseEnemyBullet();
                                _tmp._params._use = true;
                                _tmp.tl.moveTo( this.x, this.y, 0 )
                                        .delay( 10 * i )
                                        .moveBy( 0, 500, 180 );
                                _gLayerGroup[ _gDefLayerIdStg ].addChild( _tmp );
                              }
                          } )
                          .delay( 90 )
                          .moveTo( 200.0, 500, 180, enchant.Easing.QUAD_EASEINOUT  )
                  _s.addChild( _tmp );
              } 
          }
      },
      "_move" : function( _s, _e ){  }
    },

};
