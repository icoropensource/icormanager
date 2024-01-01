export default {
  getActionLabelByJob (thisPageAction, jobtype) {
    let actionlabel = ''
    switch (thisPageAction) {
      case 'Container':
        actionlabel = 'Strona zbiorcza'
        break
      case 'ObjectsView':
        actionlabel = 'Widok danych'
        break
      case 'ExecuteMethod':
        actionlabel = 'Metoda'
        break
      case 'HTML Redirect':
        actionlabel = 'Redyrekcja'
        break
      case 'WWWServerMethod':
        actionlabel = 'Metoda WWW'
        break
      case 'None':
        actionlabel = 'Brak'
        break
      case 'MenuAsPage':
        actionlabel = 'Dane'
        break
      case 'CustomPageByMethod':
        actionlabel = 'Strona'
        break
      case 'SummaryList':
        actionlabel = 'Zestawienie'
        break
      case 'MenuClassRecur':
        actionlabel = 'Zagłębienie menu'
        break
      case 'ObjectAdd':
        actionlabel = 'Nowa pozycja'
        break
      case 'ObjectEdit':
        actionlabel = 'Edycja danych'
        break
      case 'ObjectDelete':
        actionlabel = 'Usunięcie pozycji'
        break
      case 'ObjectApplyMethods':
        actionlabel = 'Metoda'
        break
      case 'Workflow Project':
        actionlabel = 'Serwis CMS'
        break
    }
    if (actionlabel === '') {
      switch (jobtype) {
        case 'objectedit':
          actionlabel = 'Widok obiektu'
          break
        case 'objectsview':
          actionlabel = 'Lista obiektów'
          break
        case 'menuaspage':
          actionlabel = 'Dane'
          break
        case 'menuitemedit':
          actionlabel = 'Edycja pozycji'
          break
        case 'menuitemeditsubmit':
          actionlabel = 'Zapamiętanie pozycji'
          break
        case 'custompagebymethod':
          actionlabel = 'Strona'
          break
        case 'reportsubmit':
          actionlabel = 'Zapamiętanie strony'
          break
        case 'summarylist':
          actionlabel = 'Lista zestawień'
          break
        case 'summaryexecute':
          actionlabel = 'Zestawienie'
          break
        case 'summaryparameters':
          actionlabel = 'Parametry zestawienia'
          break
        case 'outputpageget':
          actionlabel = 'Strona wynikowa'
          break
        case 'summaryrecur':
          actionlabel = 'Zagłębienie zestawienia'
          break
        case 'sheetget':
          actionlabel = 'Widok obiektu'
          break
        case 'menuitem':
          actionlabel = 'Dane'
          break
        case 'menuitemsubmit':
          actionlabel = 'Zapamiętanie danych'
          break
        case 'gethtmlfieldvalue':
          actionlabel = 'Pobranie wartości pola'
          break
        case 'getfieldvalues':
          actionlabel = 'Pobranie wartości pola'
          break
        case 'getfieldvaluesac':
          actionlabel = 'Pobranie wartości pola'
          break
        case 'getfieldversions':
          actionlabel = 'Pobranie historii pola'
          break
        case 'menuxml':
          actionlabel = 'Menu XML'
          break
        case 'menufavget':
          actionlabel = 'Menu ulubione'
          break
        case 'menufavset':
          actionlabel = 'Menu ulubione zapamiętanie'
          break
        case 'menuclassrecur':
          actionlabel = 'Menu zagłębione'
          break
        case 'menuclassrecuraction':
          actionlabel = 'Menu zagłębione operacja'
          break
        case 'menuclassrecurcontext':
          actionlabel = 'Menu kontekstowe'
          break
        case 'menuclassrecurcontextsubmit':
          actionlabel = 'Menu kontekstowe operacja'
          break
        case 'menuobjrecuraction':
          actionlabel = 'Menu kontekstowe akcja'
          break
        case 'workflowmenustruct':
          actionlabel = 'Serwis CMS'
          break
        case 'workflowmenustructcontext':
          actionlabel = 'Menu kontekstowe CMS'
          break
        case 'workflowmenustructcontextsubmit':
          actionlabel = 'Menu kontekstowe akcja'
          break
        case 'workflowmenustructchaptermove':
          actionlabel = 'Przeniesienie rozdziału'
          break
        case 'workflowmenustructchaptermovedrag':
          actionlabel = 'Przeniesienie rozdziału myszką'
          break
        case 'workflowmenustructattachmentmovedrag':
          actionlabel = 'Przeniesienie załącznika'
          break
      }
    }
    return actionlabel
  }
}
