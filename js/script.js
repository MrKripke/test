// Mobile Menu
$(function(){

	$('.burger').click(function () {
		$(this).toggleClass('burger_open');
		$('.menu').toggleClass('menu_open');
		$('.header__nav').toggleClass('header__nav_open');
	})
});

// Select
$(function(){
	$('.form__select').customSelect({
		block: 'select',
		transition: 400,
		placeholder: '<span>Выберите тип системы</span>',
		includeValue: true
	});
});

// File Upload
( function( $, window, document, undefined )
{
	$( '.upload__file' ).each( function()
	{
		var $input	 = $( this ),
			$label	 = $input.next( '.upload__label' ),
			labelVal = $label.html();

		$input.on( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-file' ) || '' ).replace( '{count}', this.files.length );
			else if( e.target.value )
				fileName = e.target.value.split( '\\' ).pop();
			if( fileName )
				$label.find( 'span' ).html( fileName );
			else
				$label.html( labelVal );
		});

		// Firefox bug fix
		$input
		.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	});
})( jQuery, window, document );