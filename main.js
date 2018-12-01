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
  htmlToAppend = '<div class="group cell" id="' + grupo.id + '">';
  htmlToAppend += '<h3>' + grupo.nome + '</h3></div>';
  $groups.append(htmlToAppend);
  /* add the style id background color rule for each group */
  $('html > head').append('<style>#' + grupo.id +
    ' { background-color: ' + grupo.cor + ' }');
  grupo.items.forEach(item => {
    htmlToAppend = '<div class="item cell" id="' + grupo.id + '">';
    htmlToAppend += '<h3>' + item + '</h3></div>';
    $items.append(htmlToAppend);
  });
});

$('.item').hide();
