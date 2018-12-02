const produtos = [
  { cor: 'Plum',
    nome: 'Limpeza',
    id: 'Limpeza',
    items: ['Omo',
      'Veja',
      'Vanish',
      'Esponja',
      'Saco de lixo',
      'Detergente',
      'Álcool'] },
  { cor: 'LightSalmon',
    nome: 'Frutas e Verduras',
    id: 'Frutas_e_Verduras',
    items: ['Cebola',
      'Tomate',
      'Aspargos',
      'Alho',
      'Alface',
      'Legumes p/ Sopa',
      'Banana',
      'Maçã',
      'Abacate'] },
  { cor: 'PaleGreen',
    nome: 'Massas e Cereais',
    id: 'Massas_e_Cereais',
    items: ['Arroz',
      'Kome',
      'Macarrão',
      'Farinha de Trigo',
      'Tofu',
      'Massa de Tomate'] },
  { cor: 'Aqua',
    nome: 'Frios e Congelados',
    id: 'Frios_e_Congelados',
    items: ['Presunto',
      'Peito de Peru',
      'Mussarela',
      'Waffle',
      'Pizza',
      'Massa de Pizza',
      'Iogurte',
      'Actimel',
      'Suco de Laranja',
      'Suco de Uva'] }
];

/* variable used to store text to append as html */
let htmlToAppend = '';
const $groups = $('.groups');
const $items = $('.items');

/* Build the groups according to the json informed */
produtos.forEach(grupo => {
  /* Insert groups on the first column */
  htmlToAppend = '<div class="group cell ' + grupo.id + '" id="' + grupo.id + '">';
  htmlToAppend += '<h3>' + grupo.nome + '</h3></div>';
  $groups.append(htmlToAppend);

  /* Add the style id background color rule for each group */
  $('html > head').append('<style>.' + grupo.id +
    ' { background-color: ' + grupo.cor + ' }');

  /* Insert items for each group in the other column */
  htmlToAppend = '<div class="items ' + grupo.id + '">';
  grupo.items.forEach(item => {
    htmlToAppend += '<div class="item cell">';
    htmlToAppend += '<h3>' + item + '</h3></div>';
    // SVG to make sure the text does not reach more than 80% of the cell max width, with no wrap
/*    htmlToAppend += '<svg viewBox="0 0 240 40">' +
      '<text x="0" y="1.5rem" fill="black"><tspan class="itemText" textLength="' +
      ($items.width * 0.8) + '">' + item + '</tspan></svg></div>';*/
  });
  htmlToAppend += '</div>';
  $items.append(htmlToAppend);
});

// Show only the first category
$items.children().first().siblings().hide();

$('.group').on('click', event => {
  // console.log(event.target.id);
  let $selectedGroup = $('.items.' + event.target.id);
  $selectedGroup.siblings().hide();
  $selectedGroup.show();
});

$('.item').on('mouseenter', event => {

});

$('.item').on('mouseleave', event => {

});
