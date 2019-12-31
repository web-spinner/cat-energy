( function() 
{
  'use strict'

  window.addEventListener('DOMContentLoaded', function()
  {
   
    var menu = document.querySelector('.main-nav'); 
    var button = document.querySelector('.main-nav__toggle');

    function openMenu()
    {
      if( menu.classList.contains('main-nav--closed') )
      {
        menu.classList.remove('main-nav--closed');
        menu.classList.add('main-nav--opened');
      }
    }

    function closeMenu() 
    {
      if(menu.classList.contains('main-nav--opened'))
      {
        menu.classList.remove('main-nav--opened');
        menu.classList.add('main-nav--closed');
      } 
    }

    function toggleMenu()
    {
      if(menu.classList.contains('main-nav--opened'))
      {
        closeMenu();
      }
      else if(menu.classList.contains('main-nav--closed'))
      { 
        openMenu();
      } 
    }

    toggleMenu();
    
    button.addEventListener('click', function(e){
      e.preventDefault();
      toggleMenu();
    });

  });
}());
