var echarts = require('echarts/lib/echarts');

var _default = echarts.extendComponentView({
  type: 'bmap',
  render: function(bMapModel, ecModel, api) {
    var rendering = true;
    var bmap = bMapModel.getBMap();
    var viewportRoot = api.getZr().painter.getViewportRoot();
    var coordSys = bMapModel.coordinateSystem;

    var moveHandler = function(type, target) {
      if (rendering) {
        return;
      }

      var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
      var mapOffset = [
        -parseInt(offsetEl.style.left, 10) || 0,
        -parseInt(offsetEl.style.top, 10) || 0
      ];
      viewportRoot.style.left = mapOffset[0] + 'px';
      viewportRoot.style.top = mapOffset[1] + 'px';
      coordSys.setMapOffset(mapOffset);
      bMapModel.__mapOffset = mapOffset;
      api.dispatchAction({
        type: 'bmapRoam'
      });
    };

    function zoomEndHandler() {
      if (rendering) {
        return;
      }

      api.dispatchAction({
        type: 'bmapRoam'
      });
    }

    bmap.removeEventListener('moving', this._oldMoveHandler); // FIXME
    // Moveend may be triggered by centerAndZoom method when creating coordSys next time
    // bmap.removeEventListener('moveend', this._oldMoveHandler);

    bmap.removeEventListener('zoomend', this._oldZoomEndHandler);
    bmap.addEventListener('moving', moveHandler); // bmap.addEventListener('moveend', moveHandler);

    bmap.addEventListener('zoomend', zoomEndHandler);
    this._oldMoveHandler = moveHandler;
    this._oldZoomEndHandler = zoomEndHandler;
    var roam = bMapModel.get('roam');

    if (roam && roam !== 'scale') {
      bmap.enableDragging();
    } else {
      bmap.disableDragging();
    }

    if (roam && roam !== 'move') {
      bmap.enableScrollWheelZoom();
      bmap.enableDoubleClickZoom();
      bmap.enablePinchToZoom();
    } else {
      bmap.disableScrollWheelZoom();
      bmap.disableDoubleClickZoom();
      bmap.disablePinchToZoom();
    }
    /* map 2.0 */

    var originalStyle = bMapModel.__mapStyle;
    var newMapStyle = bMapModel.get('mapStyle') || {}; // FIXME, Not use JSON methods

    var mapStyleStr = JSON.stringify(newMapStyle);

    if (JSON.stringify(originalStyle) !== mapStyleStr) {
      // FIXME May have blank tile when dragging if setMapStyle
      if (Object.keys(newMapStyle).length) {
        bmap.setMapStyle(newMapStyle);
      }

      bMapModel.__mapStyle = JSON.parse(mapStyleStr);
    }
    /* map 3.0 */

    var originalStyle2 = bMapModel.__mapStyle2;
    var newMapStyle2 = bMapModel.get('mapStyleV2') || {}; // FIXME, Not use JSON methods

    var mapStyleStr2 = JSON.stringify(newMapStyle2);

    if (JSON.stringify(originalStyle2) !== mapStyleStr2) {
      // FIXME May have blank tile when dragging if setMapStyle
      if (Object.keys(newMapStyle2).length) {
        bmap.setMapStyleV2(newMapStyle2);
      }

      bMapModel.__mapStyle2 = JSON.parse(mapStyleStr2);
    }

    rendering = false;
  }
});

module.exports = _default;
