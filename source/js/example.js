(function()
{
  'use strict';

  window.addEventListener('DOMContentLoaded', function()
  {

    var slider = document.querySelector('.range__slider'),
        before = document.querySelector('.demo__item--before'),
        after = document.querySelector('.demo__item--after'),
        bg = document.querySelector('.example__inner--demo');

    var value,
        bgStyle;


    function changeImages(value)
    {
      before.style.width = 100 - value + '%';
      after.style.width = value + '%';
    }

    function addGradient(param, type)
    {
      type = type || 'linear';

      var array_prefix = ['-webkit', '-o', '-ms', '-moz'];

      for(var i=0; i < array_prefix.length; i++) 
      {
        var rules = '';

        if(param instanceof Array)
        {
          for(var j=0; j < param.length; j++)
          {
            rules += array_prefix[i]+'-' + type + '-gradient(' + param[j] + '), ';
          }
          rules = rules.slice(0, -2); 
        }
        else
        {
          rules = array_prefix[i] + '-' + type + '-gradient(' + param + ')';
        }
        bg.style.background = rules;
      }

      bgStyle = bg.style.background;
    }

    function changeGradient(value)
    {
      var param = [
        'bottom, transparent 460px, #ffffff 183px',
        'left, transparent 0, transparent ' + ( 100 - value ) + '%, #ebebeb ' + ( 100 - value ) + '%, #ebebeb 100%'
      ];

      addGradient(param);
    }

    slider.onchange = function()
    {
      value = slider.getAttribute('value');
      var width = document.body.scrollWidth;

      changeImages(value);

      if(width >= 768)
      {
        changeGradient(value);
      }
      else
      {
        changeGradient(0);
      }
    }
    
  });
}());
