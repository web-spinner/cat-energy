(function()
{
  'use strict';

  window.addEventListener('DOMContentLoaded', function()
  {

    var slider = document.querySelector('.range__slider'),
        track = document.querySelector('.range__track'),
        thumb = document.querySelector('.range__thumb'),
        btnBefore = document.querySelector('.range__button--before'),
        btnAfter = document.querySelector('.range__button--after');

    var step = 2,
        value;

    function getOffset(elem) 
    {
      if (elem.getBoundingClientRect) 
      {
        return getOffsetRect(elem)
      } 
      else 
      {
        return getOffsetSum(elem)
      }
    }

    function getOffsetSum(elem) 
    {
      var top=0, left=0
      while(elem) 
      {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
      }
      return {top: top, left: left}
    }

    function getOffsetRect(elem) 
    {
      var box = elem.getBoundingClientRect()
      var body = document.body
      var docElem = document.documentElement
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
      var clientTop = docElem.clientTop || body.clientTop || 0
      var clientLeft = docElem.clientLeft || body.clientLeft || 0
      var top  = box.top +  scrollTop - clientTop
      var left = box.left + scrollLeft - clientLeft
      return { top: Math.round(top), left: Math.round(left) }
    }




    function getMouseCoords(e)
    {
      e =  e || window.event
      if (e.pageX == null && e.clientX != null ) 
      { 
        var html = document.documentElement
        var body = document.body
        e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
      }
      return { x: e.pageX, y: e.pageY}
    }

    function getPosMouse(e, elem, flag)
    {
      elem = elem || document;
      flag = flag || true;
      e = (e.touches) ? e.changedTouches[0] : e;

      var mouseX = getMouseCoords(e).x,
          elemPosLeft = getOffset(elem).left;

      if(!flag && mouseX >= elemPosLeft && mouseX < elemPosLeft + elem.offsetWidth)
      {
        return Math.round( ( mouseX - elemPosLeft ) / elem.offsetWidth * 100);
      }
      else
      {
        return ( mouseX - elemPosLeft );
      }
    }

    function getPosThumb(flag)
    {
      flag = (typeof flag === 'undefined') ? true : flag;

      var thumbLeft = getOffset(thumb).left,
          trackLeft = getOffset(track).left;

      switch(flag)
      {
        case true:
          return ( thumbLeft - trackLeft + thumb.offsetWidth / 2 );
          break;
        case false:
          return Math.round( ( thumbLeft - trackLeft + thumb.offsetWidth / 2 ) / track.offsetWidth * 100 );
          break;
      }
    }

    function setValue(posThumb)
    {
      value = posThumb;
    }

    function setPosThumb(posThumb, flag)
    {
      flag = (typeof flag === 'undefined') ? true : flag;

      switch(flag)
      {
        case true:
          if(posThumb >= 0 && posThumb <= track.offsetWidth)
            thumb.style.left = posThumb + 'px';
          break

        case false:
          if(posThumb >= 0 && posThumb <= 100)
            thumb.style.left = posThumb + '%';
          break
      }
    }

    function conversionPosThumb( posThumb, flag )
    {
      flag = (typeof flag === 'undefined') ? true : flag;

      switch(flag)
      {
        case true:
          return Math.round( ( posThumb / track.offsetWidth ) * 100 );
          break;
        case false:
          return Math.round( ( posThumb / 100  ) * track.offsetWidth );
          break;
      }
    }

    function setAttributeValue(elem, value)
    {
      if(value >= 0 && value <= 100)
      {
        elem.setAttribute('value', value);
      }

      slider.onchange();
    }


    btnBefore.addEventListener('click', function(e)
    {
      value = 0;
      e = e || window.e;
      e.preventDefault();
      setPosThumb(0, false);
      setAttributeValue(slider, 0); 
    });  

    btnAfter.addEventListener('click', function(e)
    {
      value = 100;
      e = e || window.e;
      e.preventDefault();
      setPosThumb(value, false);
      setAttributeValue(slider, value); 
    }); 

    slider.addEventListener('click', function(e)
    {
      var width = document.body.scrollWidth;
      var posThumb = getPosMouse(e, slider, false); 

      if( posThumb < 50 && width >= 768 && e.target != track && e.target != thumb )
      {
        value = 0;
        setPosThumb(value, false);
        setAttributeValue(slider, 0); 
      }
      else if( posThumb > 50 && width >= 768 && e.target != track && e.target != thumb )
      {
        value = 100;
        setPosThumb( value, false);
        setAttributeValue(slider, 100); 
      }
    });  

    track.addEventListener('click', function(e)
    {
      var width = document.body.scrollWidth;
      var posThumb = getPosMouse(e, track); 

      if( width >= 768 )
      {
        value = conversionPosThumb( posThumb );
        setPosThumb( value, false );
        setAttributeValue(slider, value ); 
      }
    });  


    function moveThumbCallback(e)
    {
      var width = document.body.scrollWidth;
      var posThumb = getPosMouse(e, track);
      value = conversionPosThumb(posThumb);

      setPosThumb(posThumb);
      if( width >= 768 ) setAttributeValue(slider, value ); 
    }

    function upThumbCallback(e)
    {
      var width = document.body.scrollWidth;
      var posThumb = getPosMouse(e, track);

      if( width < 768 && posThumb && posThumb > track.offsetWidth / 2 )
      {
        value = 100;
        setPosThumb( value, false);
        setAttributeValue(slider, value); 
      }
      else if( width < 768 && posThumb && posThumb <= track.offsetWidth / 2 )
      {
        value = 0;
        setPosThumb(value, false);
        setAttributeValue(slider, value); 
      }
      else if( width >= 768 && posThumb )
      {
        value = conversionPosThumb(posThumb);
        setPosThumb( value, false);
        setAttributeValue(slider, value ); 
      }

      document.removeEventListener('mousemove', moveThumbCallback);
      document.removeEventListener('touchmove', moveThumbCallback);
      document.removeEventListener('mouseup', upThumbCallback);
      document.removeEventListener('touchend', upThumbCallback);
      thumb.setAttribute('tabindex', 0);
    }

    thumb.addEventListener('mousedown', function()
    {
      thumb.removeAttribute('tabindex');

      document.addEventListener('mousemove', moveThumbCallback);  

      document.addEventListener('mouseup', upThumbCallback);      
    });  

    thumb.addEventListener('touchstart', function(e){
      thumb.removeAttribute('tabindex');

      document.addEventListener('touchmove', moveThumbCallback);  

      document.addEventListener('touchend', upThumbCallback);      
    }, false);      

    thumb.ondragstart = function() 
    {
      return false;
    }


    thumb.addEventListener('focus', function(e)
    {
      this.addEventListener('keydown', function(e)
      {
        e = e || window.e;
        var posThumb = getPosThumb(false),
            width = document.body.scrollWidth;

        if(width >= 768)
        {

          switch(e.keyCode)
          {
            case 37:
              if( posThumb - step >= 0 )
              {
                value = posThumb - step;
                setPosThumb( value, false );
                setAttributeValue(slider, value);
              }
              break;
            case 39:
              if( posThumb + step <= 100 )
              {
                value = posThumb + step;
                setPosThumb( value, false );
                setAttributeValue(slider, value);
              }
              break;
          }
        }
        else
        {
          switch(e.keyCode)
          {
            case 37:
              if( posThumb - step >= 0 )
              {
                value = 0;
                setPosThumb(value, false);
                setAttributeValue(slider, value);
              }
              break;
            case 39:
              if( posThumb + step <= 100 )
              {
                value = 100;
                setPosThumb( value, false);
                setAttributeValue(slider, value);
              }
              break;
          }
        }
      });      
    });  

    function resize(){
      var width = document.body.scrollWidth;

      if(width < 768)
      {
        if(value && value <= 50)        
        {
          setPosThumb(0, false);
          setAttributeValue(slider, 0);
        }
        else if (value && value > 50)
        {
          setPosThumb(100, false);
          setAttributeValue(slider, 100);
        }
      }
      else if(width >= 768)
      {
        if(value)
        {
          setPosThumb(value, false);
          setAttributeValue(slider, value);
        }
      }
    }

    window.addEventListener('resize', resize);
  });
}());
