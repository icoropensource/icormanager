function formatDateTime (value, row) {
  if (!value) {
    return ''
  }
  return value.slice(0, 19).replace('T', ' ')
}

export default {
  meta: {
    name: 'Statystyki',
    stats_route: true,
    '1': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o rozdziałach',
      title: 'Czas i liczba generowań w podziale na użytkowników (za ostatnie 7 dni)',
      DATA_URL: '/icormanager/app/stats/getChapterGenTimeCountByUserLast7d',
      TABLE: '#el_getChapterGenTimeCountByUserLast7d',
      columns: [{
        label: 'Użytkownik',
        name: 'username',
        field: 'username',
        align: 'left',
        sortable: true
      },
      {
        label: 'ID rozdziału',
        name: 'chapterid',
        field: 'chapterid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Tytuł',
        name: 'title',
        field: 'title',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem czas generowania',
        name: 'totaltime',
        field: 'totaltime',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem liczba generowań',
        name: 'gencount',
        field: 'gencount',
        align: 'left',
        sortable: true
      }
      ]
    },
    '2': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o rozdziałach',
      title: 'Czas i liczba generowań (za ostatnie 7 dni)',
      DATA_URL: '/icormanager/app/stats/getChapterGenTimeCountLast7d',
      TABLE: '#el_getChapterGenTimeCountLast7d',
      columns: [{
        label: 'ID rozdziału',
        name: 'chapterid',
        field: 'chapterid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Tytuł',
        name: 'title',
        field: 'title',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem czas generowania',
        name: 'totaltime',
        field: 'totaltime',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem liczba generowań',
        name: 'gencount',
        field: 'gencount',
        align: 'left',
        sortable: true
      }
      ]
    },
    '3': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o rozdziałach',
      title: 'Czas i liczba generowań oraz liczba plików (za ostatnie 7 dni - UWAGA liczba plików nie jest na teraz zliczana)',
      DATA_URL: '/icormanager/app/stats/getChapterGenTimeCountWithFilesLast7d',
      TABLE: '#el_getChapterGenTimeCountWithFilesLast7d',
      columns: [{
        label: 'ID rozdziału',
        name: 'chapterid',
        field: 'chapterid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Tytuł',
        name: 'title',
        field: 'title',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem czas generowania',
        name: 'totaltime',
        field: 'totaltime',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem liczba generowań',
        name: 'gencount',
        field: 'gencount',
        align: 'left',
        sortable: true
      },
      {
        label: 'Razem liczba plików',
        name: 'filescount',
        field: 'filescount',
        align: 'left',
        sortable: true
      }
      ]
    },
    '4': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o rozdziałach',
      title: 'Statusy rozdziałów (od początku)',
      DATA_URL: '/icormanager/app/stats/getChapterStates',
      TABLE: '#el_getChapterStates',
      columns: [{
        label: 'ID CMS',
        name: 'cmsid',
        field: 'cmsid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Nazwa CMS',
        name: 'cmsname',
        field: 'cmsname',
        align: 'left',
        sortable: true
      },
      {
        label: 'ID rozdziału',
        name: 'chapterid',
        field: 'chapterid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Tytuł',
        name: 'title',
        field: 'title',
        align: 'left',
        sortable: true
      },
      {
        label: 'Ostatnia zmiana',
        name: 'created',
        field: 'created',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'Priorytet',
        name: 'priority',
        field: 'priority',
        align: 'left',
        sortable: true
      },
      {
        label: 'ID operacji',
        name: 'operationoid',
        field: 'operationoid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      }
      ]
    },
    '5': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o serwisach',
      title: 'Czas i liczba generowań (za ostatnie 7 dni)',
      DATA_URL: '/icormanager/app/stats/getCMSGenTimeCountLast7d',
      TABLE: '#el_getCMSGenTimeCountLast7d',
      columns: [{
        label: 'ID CMS',
        name: 'cmsid',
        field: 'cmsid',
        align: 'left',
        sortable: true
      },
      {
        label: 'Nazwa CMS',
        name: 'cmsname',
        field: 'cmsname',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba generowań',
        name: 'gencount',
        field: 'gencount',
        align: 'left',
        sortable: true
      },
      {
        label: 'Czas generowań',
        name: 'totaltime',
        field: 'totaltime',
        align: 'left',
        sortable: true
      }
      ]
    },
    '6': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o plikach',
      title: 'Czas i liczba generowań (za ostatnie 7 dni)',
      DATA_URL: '/icormanager/app/stats/getFilesGenTimeCountLast7d',
      TABLE: '#el_getFilesGenTimeCountLast7d',
      columns: [{
        label: 'Dzień',
        name: 'dzien',
        field: 'dzien',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba plików',
        name: 'liczbaplikow',
        field: 'liczbaplikow',
        align: 'left',
        sortable: true
      },
      {
        label: 'Rozmiar',
        name: 'rozmiar',
        field: 'rozmiar',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba zapisów',
        name: 'liczbazapisow',
        field: 'liczbazapisow',
        align: 'left',
        sortable: true
      },
      {
        label: 'Czas zapisów',
        name: 'czaszapisu',
        field: 'czaszapisu',
        align: 'left',
        sortable: true
      }
      ]
    },
    '7': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o plikach',
      title: 'Czas i liczba generowań plików skopiowanych (za ostatnie 7 dni)',
      DATA_URL: '/icormanager/app/stats/getFilesCopiedGenTimeCountLast7d',
      TABLE: '#el_getFilesCopiedGenTimeCountLast7d',
      columns: [{
        label: 'Dzień',
        name: 'dzien',
        field: 'dzien',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba plików',
        name: 'liczbaplikow',
        field: 'liczbaplikow',
        align: 'left',
        sortable: true
      },
      {
        label: 'Rozmiar',
        name: 'rozmiar',
        field: 'rozmiar',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba zapisów',
        name: 'liczbazapisow',
        field: 'liczbazapisow',
        align: 'left',
        sortable: true
      },
      {
        label: 'Czas zapisów',
        name: 'czaszapisu',
        field: 'czaszapisu',
        align: 'left',
        sortable: true
      },
      {
        label: 'Czas kopiowania',
        name: 'czaskopiowania',
        field: 'czaskopiowania',
        align: 'left',
        sortable: true
      }
      ]
    },
    '8': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o plikach',
      title: 'Czas i liczba generowań plików wg ścieżek (za ostatnie 7 dni)',
      DATA_URL: '/icormanager/app/stats/getFilesPathGenTimeCountLast7d',
      TABLE: '#el_getFilesPathGenTimeCountLast7d',
      columns: [{
        label: 'Ścieżka',
        name: 'dstpath',
        field: 'dstpath',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba plików',
        name: 'gencount',
        field: 'gencount',
        align: 'left',
        sortable: true
      },
      {
        label: 'Rozmiar',
        name: 'rozmiar',
        field: 'rozmiar',
        align: 'left',
        sortable: true
      },
      {
        label: 'Liczba zapisów',
        name: 'liczbazapisow',
        field: 'liczbazapisow',
        align: 'left',
        sortable: true
      },
      {
        label: 'Czas zapisów',
        name: 'czaszapisu',
        field: 'czaszapisu',
        align: 'left',
        sortable: true
      }
      ]
    },
    '9': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o zadaniach',
      title: 'Lista zadań (wg daty utworzenia)',
      DATA_URL: '/icormanager/app/stats/getExecutorMethodsListAll?status=',
      TABLE: '#el_getExecutorMethodsListAll',
      columns: [{
        label: 'eventtime',
        name: 'eventtime',
        field: 'eventtime',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'meid',
        name: 'meid',
        field: 'meid',
        align: 'left',
        sortable: true
      },
      {
        label: 'cid',
        name: 'cid',
        field: 'cid',
        align: 'left',
        sortable: true
      },
      {
        label: 'name',
        name: 'name',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        label: 'fieldname',
        name: 'fieldname',
        field: 'fieldname',
        align: 'left',
        sortable: true
      },
      {
        label: 'oid',
        name: 'oid',
        field: 'oid',
        align: 'left',
        sortable: true
      },
      {
        label: 'value',
        name: 'value',
        field: 'value',
        align: 'left',
        sortable: true
      },
      {
        label: 'uid',
        name: 'uid',
        field: 'uid',
        align: 'left',
        sortable: true
      },
      {
        label: 'isparallel',
        name: 'isparallel',
        field: 'isparallel',
        align: 'left',
        sortable: true
      },
      {
        label: 'isqueued',
        name: 'isqueued',
        field: 'isqueued',
        align: 'left',
        sortable: true
      },
      {
        label: 'eventtime_ready',
        name: 'eventtime_ready',
        field: 'eventtime_ready',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_deleted',
        name: 'eventtime_deleted',
        field: 'eventtime_deleted',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_working',
        name: 'eventtime_working',
        field: 'eventtime_working',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_done',
        name: 'eventtime_done',
        field: 'eventtime_done',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'priority',
        name: 'priority',
        field: 'priority',
        align: 'left',
        sortable: true
      },
      {
        label: 'actions',
        name: 'actions',
        field: 'oid',
        align: 'left',
        sortable: false,
        actions: [{ action: 'view', label: 'pokaż', mode: 'executorMethod' }]
      }
      ]
    },
    '9Working': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o zadaniach',
      title: 'Lista zadań (wg daty utworzenia)',
      DATA_URL: '/icormanager/app/stats/getExecutorMethodsListAll?status=Working',
      TABLE: '#el_getExecutorMethodsListAllWorking',
      columns: [{
        label: 'eventtime',
        name: 'eventtime',
        field: 'eventtime',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'meid',
        name: 'meid',
        field: 'meid',
        align: 'left',
        sortable: true
      },
      {
        label: 'cid',
        name: 'cid',
        field: 'cid',
        align: 'left',
        sortable: true
      },
      {
        label: 'name',
        name: 'name',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        label: 'fieldname',
        name: 'fieldname',
        field: 'fieldname',
        align: 'left',
        sortable: true
      },
      {
        label: 'oid',
        name: 'oid',
        field: 'oid',
        align: 'left',
        sortable: true
      },
      {
        label: 'value',
        name: 'value',
        field: 'value',
        align: 'left',
        sortable: true
      },
      {
        label: 'uid',
        name: 'uid',
        field: 'uid',
        align: 'left',
        sortable: true
      },
      {
        label: 'isparallel',
        name: 'isparallel',
        field: 'isparallel',
        align: 'left',
        sortable: true
      },
      {
        label: 'isqueued',
        name: 'isqueued',
        field: 'isqueued',
        align: 'left',
        sortable: true
      },
      {
        label: 'eventtime_ready',
        name: 'eventtime_ready',
        field: 'eventtime_ready',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_deleted',
        name: 'eventtime_deleted',
        field: 'eventtime_deleted',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_working',
        name: 'eventtime_working',
        field: 'eventtime_working',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_done',
        name: 'eventtime_done',
        field: 'eventtime_done',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'priority',
        name: 'priority',
        field: 'priority',
        align: 'left',
        sortable: true
      },
      {
        label: 'actions',
        name: 'actions',
        field: 'oid',
        align: 'left',
        sortable: false,
        actions: [{ action: 'view', label: 'pokaż', mode: 'executorMethod' }]
      }
      ]
    },
    '9Ready': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o zadaniach',
      title: 'Lista zadań (wg daty utworzenia)',
      DATA_URL: '/icormanager/app/stats/getExecutorMethodsListAll?status=Ready',
      TABLE: '#el_getExecutorMethodsListAllReady',
      columns: [{
        label: 'eventtime',
        name: 'eventtime',
        field: 'eventtime',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'meid',
        name: 'meid',
        field: 'meid',
        align: 'left',
        sortable: true
      },
      {
        label: 'cid',
        name: 'cid',
        field: 'cid',
        align: 'left',
        sortable: true
      },
      {
        label: 'name',
        name: 'name',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        label: 'fieldname',
        name: 'fieldname',
        field: 'fieldname',
        align: 'left',
        sortable: true
      },
      {
        label: 'oid',
        name: 'oid',
        field: 'oid',
        align: 'left',
        sortable: true
      },
      {
        label: 'value',
        name: 'value',
        field: 'value',
        align: 'left',
        sortable: true
      },
      {
        label: 'uid',
        name: 'uid',
        field: 'uid',
        align: 'left',
        sortable: true
      },
      {
        label: 'isparallel',
        name: 'isparallel',
        field: 'isparallel',
        align: 'left',
        sortable: true
      },
      {
        label: 'isqueued',
        name: 'isqueued',
        field: 'isqueued',
        align: 'left',
        sortable: true
      },
      {
        label: 'eventtime_ready',
        name: 'eventtime_ready',
        field: 'eventtime_ready',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_deleted',
        name: 'eventtime_deleted',
        field: 'eventtime_deleted',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_working',
        name: 'eventtime_working',
        field: 'eventtime_working',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_done',
        name: 'eventtime_done',
        field: 'eventtime_done',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'priority',
        name: 'priority',
        field: 'priority',
        align: 'left',
        sortable: true
      },
      {
        label: 'actions',
        name: 'actions',
        field: 'oid',
        align: 'left',
        sortable: false,
        actions: [{ action: 'view', label: 'pokaż', mode: 'executorMethod' }]
      }
      ]
    },
    '9Processing': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o zadaniach',
      title: 'Lista zadań (wg daty utworzenia)',
      DATA_URL: '/icormanager/app/stats/getExecutorMethodsListAll?status=Processing',
      TABLE: '#el_getExecutorMethodsListAllProcessing',
      columns: [{
        label: 'eventtime',
        name: 'eventtime',
        field: 'eventtime',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'meid',
        name: 'meid',
        field: 'meid',
        align: 'left',
        sortable: true
      },
      {
        label: 'cid',
        name: 'cid',
        field: 'cid',
        align: 'left',
        sortable: true
      },
      {
        label: 'name',
        name: 'name',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        label: 'fieldname',
        name: 'fieldname',
        field: 'fieldname',
        align: 'left',
        sortable: true
      },
      {
        label: 'oid',
        name: 'oid',
        field: 'oid',
        align: 'left',
        sortable: true
      },
      {
        label: 'value',
        name: 'value',
        field: 'value',
        align: 'left',
        sortable: true
      },
      {
        label: 'uid',
        name: 'uid',
        field: 'uid',
        align: 'left',
        sortable: true
      },
      {
        label: 'isparallel',
        name: 'isparallel',
        field: 'isparallel',
        align: 'left',
        sortable: true
      },
      {
        label: 'isqueued',
        name: 'isqueued',
        field: 'isqueued',
        align: 'left',
        sortable: true
      },
      {
        label: 'eventtime_ready',
        name: 'eventtime_ready',
        field: 'eventtime_ready',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_deleted',
        name: 'eventtime_deleted',
        field: 'eventtime_deleted',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_working',
        name: 'eventtime_working',
        field: 'eventtime_working',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_done',
        name: 'eventtime_done',
        field: 'eventtime_done',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'priority',
        name: 'priority',
        field: 'priority',
        align: 'left',
        sortable: true
      },
      {
        label: 'actions',
        name: 'actions',
        field: 'oid',
        align: 'left',
        sortable: false,
        actions: [{ action: 'view', label: 'pokaż', mode: 'executorMethod' }]
      }
      ]
    },
    '9Deleted': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o zadaniach',
      title: 'Lista zadań (wg daty utworzenia)',
      DATA_URL: '/icormanager/app/stats/getExecutorMethodsListAll?status=Deleted',
      TABLE: '#el_getExecutorMethodsListAllDeleted',
      columns: [{
        label: 'eventtime',
        name: 'eventtime',
        field: 'eventtime',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'meid',
        name: 'meid',
        field: 'meid',
        align: 'left',
        sortable: true
      },
      {
        label: 'cid',
        name: 'cid',
        field: 'cid',
        align: 'left',
        sortable: true
      },
      {
        label: 'name',
        name: 'name',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        label: 'fieldname',
        name: 'fieldname',
        field: 'fieldname',
        align: 'left',
        sortable: true
      },
      {
        label: 'oid',
        name: 'oid',
        field: 'oid',
        align: 'left',
        sortable: true
      },
      {
        label: 'value',
        name: 'value',
        field: 'value',
        align: 'left',
        sortable: true
      },
      {
        label: 'uid',
        name: 'uid',
        field: 'uid',
        align: 'left',
        sortable: true
      },
      {
        label: 'isparallel',
        name: 'isparallel',
        field: 'isparallel',
        align: 'left',
        sortable: true
      },
      {
        label: 'isqueued',
        name: 'isqueued',
        field: 'isqueued',
        align: 'left',
        sortable: true
      },
      {
        label: 'eventtime_ready',
        name: 'eventtime_ready',
        field: 'eventtime_ready',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_deleted',
        name: 'eventtime_deleted',
        field: 'eventtime_deleted',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_working',
        name: 'eventtime_working',
        field: 'eventtime_working',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'eventtime_done',
        name: 'eventtime_done',
        field: 'eventtime_done',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'priority',
        name: 'priority',
        field: 'priority',
        align: 'left',
        sortable: true
      },
      {
        label: 'actions',
        name: 'actions',
        field: 'oid',
        align: 'left',
        sortable: false,
        actions: [{ action: 'view', label: 'pokaż', mode: 'executorMethod' }]
      }
      ]
    },
    '10': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o użytkownikach',
      title: 'Lista aktywnych sesji (ostatnie 24h)',
      DATA_URL: '/icormanager/app/stats/getSessionsGenActiveLast1d',
      TABLE: '#el_getSessionsGenActiveLast1d',
      columns: [{
        label: 'created',
        name: 'created',
        field: 'created',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'uid',
        name: 'uid',
        field: 'uid',
        align: 'left',
        sortable: true
      },
      {
        label: 'username',
        name: 'username',
        field: 'username',
        align: 'left',
        sortable: true
      },
      {
        label: 'last_access',
        name: 'last_access',
        field: 'last_access',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'sessions',
        name: 'sessions',
        field: 'sessions',
        align: 'left',
        sortable: true
      }
      ]
    },
    '11': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o bazie danych',
      title: 'Lista aktywnych zadań (PG)',
      DATA_URL: '/icormanager/app/stats/getDBPGStatActivity',
      TABLE: '#el_getDBPGStatActivity',
      columns: [{
        label: 'datid',
        name: 'datid',
        field: 'datid',
        align: 'left',
        sortable: true
      },
      {
        label: 'datname',
        name: 'datname',
        field: 'datname',
        align: 'left',
        sortable: true
      },
      {
        label: 'pid',
        name: 'pid',
        field: 'pid',
        align: 'left',
        sortable: true
      },
      {
        label: 'usesysid',
        name: 'usesysid',
        field: 'usesysid',
        align: 'left',
        sortable: true
      },
      {
        label: 'usename',
        name: 'usename',
        field: 'usename',
        align: 'left',
        sortable: true
      },
      {
        label: 'application_name',
        name: 'application_name',
        field: 'application_name',
        align: 'left',
        sortable: true
      },
      {
        label: 'backend_start',
        name: 'backend_start',
        field: 'backend_start',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'query_start',
        name: 'query_start',
        field: 'query_start',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'state_change',
        name: 'state_change',
        field: 'state_change',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'state',
        name: 'state',
        field: 'state',
        align: 'left',
        sortable: true
      },
      {
        label: 'query',
        name: 'query',
        field: 'query',
        align: 'left',
        sortable: true
      }
      ]
    },
    '12': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o systemie',
      title: 'Wolne miejsce na dyskach ',
      DATA_URL: '/icormanager/app/stats/getServerBasicInfo',
      TABLE: '#el_getServerBasicInfo',
      columns: [{
        label: 'Dysk',
        name: 'disk',
        field: 'disk',
        align: 'left',
        sortable: true
      },
      {
        label: 'Rozmiar',
        name: 'total',
        field: 'total',
        align: 'right',
        sortable: true
      },
      {
        label: 'Wolne',
        name: 'free',
        field: 'free',
        align: 'right',
        sortable: true
      },
      {
        label: '%',
        name: 'percent',
        field: 'percent',
        align: 'right',
        sortable: true
      }
      ]
    },
    '14': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o bazie danych',
      title: 'Rozmiar bazy danych (PG)',
      DATA_URL: '/icormanager/app/stats/getDBPGDatabaseSize',
      TABLE: '#el_getDBPGDatabaseSize',
      columns: [{
        label: 'human_size',
        name: 'human_size',
        field: 'human_size',
        align: 'left',
        sortable: true
      },
      {
        label: 'raw_size',
        name: 'raw_size',
        field: 'raw_size',
        align: 'left',
        sortable: true
      }
      ]
    },
    '15': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o bazie danych',
      title: 'Statystyki IO dla tabel (PG)',
      DATA_URL: '/icormanager/app/stats/getDBPGStatIOUserTables',
      TABLE: '#el_getDBPGStatIOUserTables',
      columns: [{
        label: 'relname',
        name: 'relname',
        field: 'relname',
        align: 'left',
        sortable: true
      },
      {
        label: 'heap_blks_read',
        name: 'heap_blks_read',
        field: 'heap_blks_read',
        align: 'left',
        sortable: true
      },
      {
        label: 'heap_blks_hit',
        name: 'heap_blks_hit',
        field: 'heap_blks_hit',
        align: 'left',
        sortable: true
      },
      {
        label: 'idx_blks_read',
        name: 'idx_blks_read',
        field: 'idx_blks_read',
        align: 'left',
        sortable: true
      },
      {
        label: 'idx_blks_hit',
        name: 'idx_blks_hit',
        field: 'idx_blks_hit',
        align: 'left',
        sortable: true
      },
      {
        label: 'toast_blks_read',
        name: 'toast_blks_read',
        field: 'toast_blks_read',
        align: 'left',
        sortable: true
      },
      {
        label: 'toast_blks_hit',
        name: 'toast_blks_hit',
        field: 'toast_blks_hit',
        align: 'left',
        sortable: true
      },
      {
        label: 'tidx_blks_read',
        name: 'tidx_blks_read',
        field: 'tidx_blks_read',
        align: 'left',
        sortable: true
      },
      {
        label: 'tidx_blks_hit',
        name: 'tidx_blks_hit',
        field: 'tidx_blks_hit',
        align: 'left',
        sortable: true
      }
      ]
    },
    '16': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o bazie danych',
      title: 'Statystyki dla tabel (PG)',
      DATA_URL: '/icormanager/app/stats/getDBPGStatUserTables',
      TABLE: '#el_getDBPGStatUserTables',
      columns: [{
        label: 'relname',
        name: 'relname',
        field: 'relname',
        align: 'left',
        sortable: true
      },
      {
        label: 'seq_scan',
        name: 'seq_scan',
        field: 'seq_scan',
        align: 'left',
        sortable: true
      },
      {
        label: 'seq_tup_read',
        name: 'seq_tup_read',
        field: 'seq_tup_read',
        align: 'left',
        sortable: true
      },
      {
        label: 'idx_scan',
        name: 'idx_scan',
        field: 'idx_scan',
        align: 'left',
        sortable: true
      },
      {
        label: 'idx_tup_fetch',
        name: 'idx_tup_fetch',
        field: 'idx_tup_fetch',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_tup_ins',
        name: 'n_tup_ins',
        field: 'n_tup_ins',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_tup_upd',
        name: 'n_tup_upd',
        field: 'n_tup_upd',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_tup_del',
        name: 'n_tup_del',
        field: 'n_tup_del',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_tup_hot_upd',
        name: 'n_tup_hot_upd',
        field: 'n_tup_hot_upd',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_live_tup',
        name: 'n_live_tup',
        field: 'n_live_tup',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_dead_tup',
        name: 'n_dead_tup',
        field: 'n_dead_tup',
        align: 'left',
        sortable: true
      },
      {
        label: 'n_mod_since_analyze',
        name: 'n_mod_since_analyze',
        field: 'n_mod_since_analyze',
        align: 'left',
        sortable: true
      },
      {
        label: 'last_vacuum',
        name: 'last_vacuum',
        field: 'last_vacuum',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'last_autovacuum',
        name: 'last_autovacuum',
        field: 'last_autovacuum',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'last_analyze',
        name: 'last_analyze',
        field: 'last_analyze',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'last_autoanalyze',
        name: 'last_autoanalyze',
        field: 'last_autoanalyze',
        align: 'left',
        sortable: true,
        format: formatDateTime
      },
      {
        label: 'vacuum_count',
        name: 'vacuum_count',
        field: 'vacuum_count',
        align: 'left',
        sortable: true
      },
      {
        label: 'autovacuum_count',
        name: 'autovacuum_count',
        field: 'autovacuum_count',
        align: 'left',
        sortable: true
      },
      {
        label: 'analyze_count',
        name: 'analyze_count',
        field: 'analyze_count',
        align: 'left',
        sortable: true
      },
      {
        label: 'autoanalyze_count',
        name: 'autoanalyze_count',
        field: 'autoanalyze_count',
        align: 'left',
        sortable: true
      }
      ]
    },
    '17': {
      contentTitle: 'Statystyki',
      contentSubtitle: 'dane o bazie danych',
      title: 'Statystyki dla tabel (PG)',
      DATA_URL: '/icormanager/app/stats/getExecutorMethodsGroupByStatus',
      TABLE: '#el_getExecutorMethodsGroupByStatus',
      columns: [{
        label: 'status',
        name: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      },
      {
        label: 'total',
        name: 'total',
        field: 'total',
        align: 'left',
        sortable: true
      }
      ]
    }
  }
}
