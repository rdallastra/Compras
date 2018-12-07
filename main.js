const products = [
  { color: 'Plum',
    name: 'Limpeza',
    items: ['Omo',
      'Veja',
      'Vanish',
      'Esponja',
      'Saco_de_lixo',
      'Detergente',
      'Álcool'] },
  { color: 'LightSalmon',
    name: 'Frutas_e_Verduras',
    items: ['Cebola',
      'Tomate',
      'Aspargos',
      'Alho',
      'Alface',
      'Legumes_p/_Sopa',
      'Banana',
      'Maçã',
      'Abacate'] },
  { color: 'PaleGreen',
    name: 'Massas_e_Cereais',
    items: ['Arroz',
      'Kome',
      'Macarrão',
      'Farinha_de_Trigo',
      'Tofu',
      'Massa_de_Tomate'] },
  { color: 'Aqua',
    name: 'Frios_e_Congelados',
    items: ['Presunto',
      'Peito_de_Peru',
      'Mussarela',
      'Waffle',
      'Pizza',
      'Massa_de_Pizza',
      'Iogurte',
      'Actimel',
      'Suco_de_Laranja',
      'Suco_de_Uva'] }
];

/*  This is an implementation of visibility functions, to hide elements
    while preserve space arrangement */
(function ($) {
  $.fn.invisible = function () {
    return this.each(function () {
      $(this).css('visibility', 'hidden');
    });
  };
  $.fn.visible = function () {
    return this.each(function () {
      $(this).css('visibility', 'visible');
    });
  };
}(jQuery));

/* variable used to store text to append as html */
let htmlToAppend = '';
const $groups = $('.groups');
const $items = $('.items');
// Object created to hold the current shopping list
let selection = {};

/* Build the groups according to the json informed */
products.forEach(group => {
  /* Insert groups on the first column */
  /* Template:
  <div class="group cell group_name">
    <h3>group_name</h3>
  </div> */
  htmlToAppend = '<div class="group cell ' + group.name +
                  '" id="' + group.name + '">';
  htmlToAppend += '<h3>' + group.name.replace(/_/g, ' ') + '</h3></div>';
  $groups.append(htmlToAppend);

  /* Add the style id background color rule for each group */
  $('html > head').append('<style>.' + group.name +
    ' { background-color: ' + group.color + ' }');

  /* Insert items for each group in the other column */
  htmlToAppend = '<div class="items ' + group.name + '">';
  group.items.forEach(item => {
    /* Template:
    <div class="item cell">
      <h3>item</h3>
      <div class="quantity" id="item">
        <h4 class="plus">+</h4>
        <h4 class="current"></h4>
        <h4 class="minus">-</h4>
      </div>
    </div> */
    htmlToAppend += '<div class="item cell">';
    htmlToAppend += '<h3>' + item.replace(/_/g, ' ') + '</h3>';
    htmlToAppend += '<div class="quantity" id="' + item +
                    '"><h4 class="plus">+</h4><h4 class="current"></h4>' +
                    '<h4 class="minus">-</h4></div></div>';
    // SVG to make sure the text does not go more than 80% of the cell max width, with no wrap
    /* htmlToAppend += '<svg viewBox="0 0 240 40">' +
      '<text x="0" y="1.5rem" fill="black"><tspan class="itemText" textLength="' +
      ($items.width * 0.8) + '">' + item + '</tspan></svg></div>'; */
  });
  htmlToAppend += '</div>';
  $items.append(htmlToAppend);
});

// Show only the first category
$items.children().first().siblings().hide();

// Hide quantity buttons
$('.quantity').children('.plus, .minus').invisible();

// Show the selected group
$('.group').on('click', event => {
  let $selectedGroup = $('.items.' + event.target.id);
  $selectedGroup.siblings().hide();
  $selectedGroup.show();
});

// Show set quantity buttons on hover
$('.item').on('mouseenter', event => {
  const $quantity = $(event.currentTarget).children('.quantity');
  $quantity.children('.plus, .minus').visible();
});

// Hide quantity buttons on leave
$('.item').on('mouseleave', event => {
  const $quantity = $(event.currentTarget).children('.quantity');
  $quantity.children('.plus, .minus').invisible();
});

// Increase item quantity in object selection
$('.plus').on('click', event => {
  const itemId = $(event.currentTarget).parent().attr('id');
  if (selection[itemId]) {
    selection[itemId]++;
  } else {
    selection[itemId] = 1;
  }
  $(event.currentTarget).next().text(selection[itemId]);
  console.log(itemId + ': ' + selection[itemId]);
});

// Decrease item quantity in object selection
$('.minus').on('click', event => {
  const itemId = $(event.currentTarget).parent().attr('id');
  if (selection[itemId]) {
    if (selection[itemId] === 1) {
      delete selection[itemId];
      $(event.currentTarget).prev().text('');
    } else {
      selection[itemId]--;
      $(event.currentTarget).prev().text(selection[itemId]);
    }
  }
  console.log(itemId + ': ' + selection[itemId]);
});

function makeList (selection) {
//  let htmlToAppend = '';

  htmlToAppend = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Compras</title>
    <link rel="stylesheet" type="text/css" href="reset.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    <ul>`;
  Object.keys(selection).forEach(key => {
    htmlToAppend += `<li>${key}: ${selection[key]}</li>`;
  });
  htmlToAppend += `</ul></body></html>`;
  console.log(htmlToAppend);
  let listWindow = window.open();
  listWindow.document.body.innerHTML = htmlToAppend;
};

// Build shopping list from selected $items
$('#make-list').on('click', event => {
  makeList(selection);
});
