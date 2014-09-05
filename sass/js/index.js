var ui = {
  $listColor: $('#js-list-color')

};
$listColorChild = ui.$listColor.find('li');

/* 显示名字 */
$listColorChild.each(function(e) {
  var $this = $(this);
  var colorName = $this.prop('class').substr(8);
  var colorRgb = getHexBgColor($this);
  $(this).html('$' + colorName + '<br>' + colorRgb);
});
function getHexBgColor($bgColorEle) {
  var rgb = $bgColorEle.css('background-color');
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    rgb = '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  return rgb;
}
/* 显示名字 end */