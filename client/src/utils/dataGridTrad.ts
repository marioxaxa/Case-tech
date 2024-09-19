import { GridLocaleText } from "@mui/x-data-grid/models/api/gridLocaleTextApi";


export const GRID_DEFAULT_LOCALE_TEXT_PT: GridLocaleText = {
  // Root
  noRowsLabel: 'Sem linhas',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',

  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compacto',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecionar colunas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Ocultar filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Buscar…',
  toolbarQuickFilterLabel: 'Buscar',
  toolbarQuickFilterDeleteIconLabel: 'Limpar',

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar como CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Baixar como Excel',

  // Columns management text
  columnsManagementSearchTitle: 'Buscar',
  columnsManagementNoColumns: 'Sem colunas',
  columnsManagementShowHideAllText: 'Mostrar/Ocultar Todas',
  columnsManagementReset: 'Redefinir',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelRemoveAll: 'Remover todos',
  filterPanelDeleteIconLabel: 'Excluir',
  filterPanelLogicOperator: 'Operador lógico',
  filterPanelOperator: 'Operador',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor do filtro',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorDoesNotContain: 'não contém',
  filterOperatorEquals: 'é igual a',
  filterOperatorDoesNotEqual: 'não é igual a',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'é depois de',
  filterOperatorOnOrAfter: 'é em ou depois de',
  filterOperatorBefore: 'é antes de',
  filterOperatorOnOrBefore: 'é em ou antes de',
  filterOperatorIsEmpty: 'está vazio',
  filterOperatorIsNotEmpty: 'não está vazio',
  filterOperatorIsAnyOf: 'é qualquer um de',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',

  // Header filter operators text
  headerFilterOperatorContains: 'Contém',
  headerFilterOperatorDoesNotContain: 'Não contém',
  headerFilterOperatorEquals: 'É igual a',
  headerFilterOperatorDoesNotEqual: 'Não é igual a',
  headerFilterOperatorStartsWith: 'Começa com',
  headerFilterOperatorEndsWith: 'Termina com',
  headerFilterOperatorIs: 'É',
  headerFilterOperatorNot: 'Não é',
  headerFilterOperatorAfter: 'É depois de',
  headerFilterOperatorOnOrAfter: 'É em ou depois de',
  headerFilterOperatorBefore: 'É antes de',
  headerFilterOperatorOnOrBefore: 'É em ou antes de',
  headerFilterOperatorIsEmpty: 'Está vazio',
  headerFilterOperatorIsNotEmpty: 'Não está vazio',
  headerFilterOperatorIsAnyOf: 'É qualquer um de',
  'headerFilterOperator=': 'Igual a',
  'headerFilterOperator!=': 'Diferente de',
  'headerFilterOperator>': 'Maior que',
  'headerFilterOperator>=': 'Maior ou igual a',
  'headerFilterOperator<': 'Menor que',
  'headerFilterOperator<=': 'Menor ou igual a',

  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuManageColumns: 'Gerenciar colunas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar coluna',
  columnMenuUnsort: 'Remover ordenação',
  columnMenuSortAsc: 'Ordenar por ASC',
  columnMenuSortDesc: 'Ordenar por DESC',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total row amount footer text
  footerTotalRows: 'Total de Linhas:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleção por checkbox',
  checkboxSelectionSelectAllRows: 'Selecionar todas as linhas',
  checkboxSelectionUnselectAllRows: 'Desmarcar todas as linhas',
  checkboxSelectionSelectRow: 'Selecionar linha',
  checkboxSelectionUnselectRow: 'Desmarcar linha',

  // Boolean cell text
  booleanCellTrueLabel: 'sim',
  booleanCellFalseLabel: 'não',

  // Actions cell more text
  actionsCellMore: 'mais',

  // Column pinning text
  pinToLeft: 'Fixar à esquerda',
  pinToRight: 'Fixar à direita',
  unpin: 'Desfixar',

  // Tree Data
  treeDataGroupingHeaderName: 'Agrupar',
  treeDataExpand: 'ver filhos',
  treeDataCollapse: 'ocultar filhos',

  // Grouping columns
  groupingColumnHeaderName: 'Grupo',
  groupColumn: (name) => `Agrupar por ${name}`,
  unGroupColumn: (name) => `Parar de agrupar por ${name}`,

  // Master/detail
  detailPanelToggle: 'Alternar painel de detalhes',
  expandDetailPanel: 'Expandir',
  collapseDetailPanel: 'Recolher',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Reordenar linhas',

  // Aggregation
  aggregationMenuItemHeader: 'Agregação',
  aggregationFunctionLabelSum: 'soma',
  aggregationFunctionLabelAvg: 'média',
  aggregationFunctionLabelMin: 'mínimo',
  aggregationFunctionLabelMax: 'máximo',
  aggregationFunctionLabelSize: 'tamanho',
};
