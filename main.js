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
let selection = {};

/* Build the groups according to the json informed */
produtos.forEach(grupo => {
  const groupId = grupo.nome.replace(/ /g, '');
  /* Insert groups on the first column */
  /* Template:
  <div class="group cell grupo_id" id="grupo_id">
    <h3>grupo_nome</h3>
  </div> */
  htmlToAppend = '<div class="group cell ' + groupId +
    '" id="' + groupId + '">';
  htmlToAppend += '<h3>' + grupo.nome + '</h3></div>';
  $groups.append(htmlToAppend);

  /* Add the style id background color rule for each group */
  $('html > head').append('<style>.' + groupId +
    ' { background-color: ' + grupo.cor + ' }');

  /* Insert items for each group in the other column */
  htmlToAppend = '<div class="items ' + groupId + '">';
  grupo.items.forEach(item => {
    /* Template:
    <div class="item cell">
      <h3>item</h3>
      <div class="quantity">
        <h4 class="plus">+</h4>
        <h4 class="current"></h4>
        <h4 class="minus">-</h4>
      </div>
    </div> */
    htmlToAppend += '<div class="item cell">';
    htmlToAppend += '<h3>' + item + '</h3>';
    htmlToAppend += '<div class="quantity" id="' + item.replace(/ /g, '') +
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
$('.quantity').hide();

// Show the selected group
$('.group').on('click', event => {
  let $selectedGroup = $('.items.' + event.target.id);
  $selectedGroup.siblings().hide();
  $selectedGroup.show();
});

// Show set quantity buttons on hover
$('.item').on('mouseenter', event => {
  $(event.currentTarget).children('.quantity').show();
});

$('.item').on('mouseleave', event => {
  $(event.currentTarget).children('.quantity').hide();
});

$('.plus').on('click', event => {
  const itemId = $(event.currentTarget).parent().attr('id');
  if (selection[itemId]) {
    selection[itemId]++;
  } else {
    selection[itemId] = 1;
  }
  console.log(itemId + ': ' + selection[itemId]);
});
