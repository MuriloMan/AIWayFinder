function playIt() {
  var numForms = 1,
    field = $('.learningField'),
    time = 0,
    endOfLife = false;

  while (!endOfLife) {
    var genForm = new Generation(numForms);
    $.each(genForm.lifeForms, function(formIndex, form) {
      form.goIntoField();
	  setInterval(function(){form.walk()}, 100);	  
    });
    time++;
    if (time == 1) 
      endOfLife = true;
  }

  function FormLife() {
    this.numForms = 0;
    this.x = 10;
    this.y = 10;
    this.id = getIDHash();
    this.walk = function() {
      this.x += Math.ceil(Math.random() * 3);
      this.y += Math.ceil(Math.random() * 3);
      var css = {}, lifeForm = $("#" + this.id);
      css.top =  this.x + 'px';
      css.left = this.y + 'px';
      css.position = 'absolute';
      lifeForm.css(css);
	  this.checkBlock();
    };
    this.goIntoField = function() {
      var lifeForm = $('<div>',{id: this.id});
      lifeForm.addClass('life-forms');
      field.append(lifeForm);
    };
	this.checkBlock = function(){
		
		var range = [], rangeOfField = {};
		
		rangeOfField.width= field.width();
		rangeOfField.height = field.height();
		rangeOfField.position = field.position();
		
		range.push(rangeOfField);
		
		/*	
		$(".block").each(function(bIndex, blockItem){
			var blockI = {};
			blockI.height = blockItem.height();
			blockI.width = blockItem.width();
			blockI.position = blockItem.position();

			range.push(blockI);
		});*/
		
		
		/*checando blocks*/
		$.each(range, function(blockIndex, blockItem){
			
			/*Se esta dentro do bloco*/
			if(this.y < (field.height + field.position.top)){
				console.log("dentro");
			}
		});
	}
  }

  function Generation(numforms) {
	  var gen = [];
		for (var i = 0; i < numforms; i++) {
		  gen.push(new FormLife());
		}
	  this.lifeForms = gen;
  }
  
  function getIDHash(){
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);;
  }
}