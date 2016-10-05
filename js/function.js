var $zodiacXML = null;
$(document).ready(function() {
	var pImages = '';
	$.get('zodiac.xml', function(xml) {
		$zodiacXML = $(xml);
		$zodiacXML.find('item').each(function() {
			$.preLoadImages('images/symbolic/'+jQuery(this).children('symbol').text());
		});
	});
	$('#main-image-box').facets({
		control: '#zodiac-list',
		autoCliping: true,
		clipSpacing: 1,
		keepItOpened: true,
		contentRelations: true,
		beforeMax: function(index) {
			var id = $('#main-image-box div:eq('+index+')').attr('id');
			var $item = $zodiacXML.find('item#'+id);
			var $template = $('#zodiac-template').clone();
			$template.find('h1').text($item.children('german').text());
			$template.find('.element').text($item.children('element').text());
			$template.find('.latin').text($item.children('latin').text());
			$template.find('.period').text($item.children('period').text());
			$template.find('.length').text($item.children('length').text());
			$template.find('.horoscope').attr('href', $item.children('horoscope').text());
			$template.find('.symbol').html($('<img />').attr('src', 'images/symbolic/'+$item.children('symbol').text()));

			$('#zodiac-information').empty().append($template.show());
		}
	});
	$('a[rel=resetAll]').click(function() {
		jQuery.facets.restore();
		$('#zodiac-information').empty();
	});
});