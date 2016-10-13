$(function() {

var day = document.getElementById('day');
day.innerHTML = moment().format('MMMM Do YYYY');
	
function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	var i = 0;
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)]
	}
}

function checkPromptValue(text) {
	var promptValue = prompt(text)
	while (promptValue === "") {
		alert("Field is empty, please try again");
	  	var promptValue = prompt(text)
	  	}
	if (!promptValue) {
		throw null;
	}
	return promptValue;
}
	
function Column(name) {
  var self = this;

  this.id = randomString();
  this.name = name;
  this.element = createColumn();

  function createColumn() {
	  var today = moment().format('LTS');
	  var column = $('<div>').addClass('column col-xs-12 col-sm-4 col-md-3');
	  var columnTitle = $('<h2>').addClass('column-title').text(self.name);
	  var columnDate = $('<p>').addClass('column-date').text(today);
	  var columnCardList = $('<ul>').addClass('column-list');
	  var columnDelete = $('<button>').addClass('btn-delete').text('x');
	  var columnAddCard = $('<button>').addClass('add-card').text('Add service');
	
	  columnDelete.click(function() {
	    self.removeColumn();
	  });
	  columnAddCard.click(function(event) {
	    self.addCard(new Card(checkPromptValue("Write service name")));
	  });
	
	  column.append(columnTitle, columnDate)
	    .append(columnDate)
	    .append(columnDelete)
	    .append(columnAddCard)
	    .append(columnCardList);
	
	return column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.element.children('ul').append(card.element);
	    },
	removeColumn: function() {
	    this.element.remove();
	    }
};
	
function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	this.element = createCard(); //
		
	function createCard() {
		var card = $('<li>').addClass('card');
		var cardDescription = $('<p>').addClass('card-description').text(self.description);
		var cardDelete = $('<button>').addClass('btn-delete').text('x');

		cardDelete.click(function(){
			self.removeCard();
		});

		card.append(cardDelete)
			.append(cardDescription);
		
	return card;
	}
}	

Card.prototype = {
	removeCard: function() {
		this.element.remove();
	}
}
	
var board = {
  name: 'Table Kanban',
    addColumn: function(column) {
    	this.element.append(column.element);
    	initSortable();
    },
  element: $('#board .column-container')
};

function initSortable() {
  $('.column-card-list').sortable({
    connectWith: '.column-card-list',
    placeholder: 'card-placeholder'
  }).disableSelection();
}

$("#sortable").sortable({
    change: function(event, ui) {
      ui.placeholder.css({visibility: 'visible', border : '1px dotted white', background : 'rgba(183,183,183,0.5)'});
    }
});
$("#sortable").disableSelection();

$('.create-column')
  .click(function(){
		var name = checkPromptValue('Add patient name');
		var column = new Column(name);
    	board.addColumn(column);
});

var dogRocky = new Column('Dog Rocky');
var catAmanda = new Column('Cat Amanda');
var dogLucky = new Column('Dog Lucky');

board.addColumn(dogRocky);
board.addColumn(catAmanda);
board.addColumn(dogLucky);

var card1 = new Card('Vaccination for rabies');
var card2 = new Card('Blood test');
var card3 = new Card('Deworming');
var card4 = new Card('Monthly control');

dogRocky.addCard(card1);
catAmanda.addCard(card2);
dogLucky.addCard(card3);
dogLucky.addCard(card4);

})