define({"oj-message":{fatal:"Fatale",error:"Erreur",warning:"Avertissement",info:"Infos",confirmation:"Confirmation","compact-type-summary":"{0}: {1}"},"oj-converter":{summary:"La valeur n'est pas au format attendu.",detail:"Entrez une valeur dans le format attendu.","plural-separator":", ",hint:{summary:"Exemple : {exampleValue}",detail:"Entrez une valeur dans le format de cet exemple : '{exampleValue}'","detail-plural":"Entrez une valeur dans le format de ces exemples : '{exampleValue}'"},optionHint:{detail:"'{propertyValueValid}' est une valeur acceptée pour l'option '{propertyName}'.",
"detail-plural":"'{propertyValueValid}' sont des valeurs acceptées pour l'option '{propertyName}'."},optionTypesMismatch:{summary:"Une valeur doit être indiquée pour '{requiredPropertyName}' si l'option '{propertyName}' est réglée à '{propertyValue}'."},optionTypeInvalid:{summary:"La valeur indiquée pour l'option '{propertyName}' n'est pas du type attendu."},optionOutOfRange:{summary:"La valeur {propertyValue} est hors limites pour l'option '{propertyName}'."},optionValueInvalid:{summary:"Une valeur non valide '{propertyValue}' a été précisée pour l'option '{propertyName}'."},
number:{decimalFormatMismatch:{summary:"'{value}' n'est pas au format numérique attendu."},decimalFormatUnsupportedParse:{summary:"decimalFormat : les valeurs 'short' et 'long' ne sont pas prises en charge par la fonction d'analyse du convertisseur.",detail:"Affectez l'attribut readOnly au composant. Les champs readOnly n'appellent pas la fonction d'analyse du convertisseur."},currencyFormatMismatch:{summary:"'{value}' n'est pas au format de devise attendu."},percentFormatMismatch:{summary:"'{value}' n'est pas au format de pourcentage attendu."}},
datetime:{datetimeOutOfRange:{summary:"La valeur '{value}' est hors limites pour '{propertyName}'.",detail:"Entrez une valeur comprise entre '{minValue}' et '{maxValue}'."},dateFormatMismatch:{summary:"'{value}' n'est pas au format de date attendu."},invalidTimeZoneID:{summary:"L'ID fuseau horaire fourni {timeZoneID} n'est pas valide."},nonExistingTime:{summary:"L'heure entrée n'existe pas, car elle tombe dans la période de transition vers l'heure avancée."},missingTimeZoneData:{summary:"Les données de fuseau horaire sont manquantes. Appelez la fonction require 'ojs/ojtimezonedata' pour charger les données de fuseau horaire."},
timeFormatMismatch:{summary:"'{value}' n'est pas au format horaire attendu."},datetimeFormatMismatch:{summary:"'{value}' n'est pas au format de date et d'heure attendu."},dateToWeekdayMismatch:{summary:"Le '{date}' ne tombe pas un '{weekday}'.",detail:"Entrez un jour de semaine correspondant à la date."}}},"oj-validator":{length:{hint:{min:"Entrez {min} caractères ou plus.",max:"Entrez {max} caractères ou moins.",inRange:"Entrez {min} caractères ou plus, sans dépasser {max}.",exact:"Entrez {length} caractères."},
messageDetail:{tooShort:"Entrez {min} caractères ou plus, pas moins.",tooLong:"Entrez {max} caractères ou moins, pas plus."},messageSummary:{tooShort:"Il y a trop peu de caractères.",tooLong:"Il y a trop de caractères."}},range:{number:{hint:{min:"Entrez un nombre supérieur ou égal à {min}.",max:"Entrez un nombre inférieur ou égal à {max}.",inRange:"Entrez un nombre compris entre {min} et {max}.",exact:"Entrez le nombre {num}."},messageDetail:{rangeUnderflow:"Le nombre doit être supérieur ou égal à {min}.",
rangeOverflow:"Le nombre doit être inférieur ou égal à {max}.",exact:"Le nombre doit être {num}."},messageSummary:{rangeUnderflow:"Le nombre est trop bas.",rangeOverflow:"Le nombre est trop élevé."}},datetime:{hint:{min:"Entrez une date et une heure identiques ou postérieures à {min}.",max:"Entrez une date et une heure identiques ou antérieures à {max}.",inRange:"Entrez une date et une heure comprises entre {min} et {max}."},messageDetail:{rangeUnderflow:"La date et l'heure doivent être identiques ou postérieures à {min}.",
rangeOverflow:"La date et l'heure doivent être identiques ou antérieures à {max}."},messageSummary:{rangeUnderflow:"La date et l'heure correspondent à un instant antérieur à l'instant minimum.",rangeOverflow:"La date et l'heure correspondent à un instant postérieur à l'instant maximum."}},date:{hint:{min:"Entrez une date identique ou postérieure au {min}.",max:"Entrez une date identique ou antérieure au {max}.",inRange:"Entrez une date comprise entre le {min} et le {max}."},messageDetail:{rangeUnderflow:"La date doit être identique ou postérieure au {min}.",
rangeOverflow:"La date doit être identique ou antérieure au {max}."},messageSummary:{rangeUnderflow:"La date est antérieure à la date minimum.",rangeOverflow:"La date est postérieure à la date maximum."}},time:{hint:{min:"Entrez une heure identique ou postérieure à {min}.",max:"Entrez une heure identique ou antérieure à {max}.",inRange:"Entrez une heure comprise entre {min} et {max}."},messageDetail:{rangeUnderflow:"L'heure doit être identique ou postérieure à {min}.",rangeOverflow:"L'heure doit être identique ou antérieure à {max}."},
messageSummary:{rangeUnderflow:"L'heure est antérieure à l'heure minimum.",rangeOverflow:"L'heure est postérieure à l'heure maximum."}}},restriction:{date:{messageSummary:"La date {value} est celle d'une entrée désactivée.",messageDetail:"La date {value} ne doit pas être celle d'une entrée désactivée."}},regExp:{summary:"Le format est incorrect.",detail:"La valeur '{value}' doit correspondre au modèle : '{pattern}'"},required:{summary:"Une valeur est requise.",detail:"Vous devez entrer une valeur."}},
"oj-editableValue":{required:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojInputDate":{prevText:"Précédent",nextText:"Suivant",currentText:"Aujourd'hui",weekHeader:"Sem",tooltipCalendar:"Sélectionner une date",tooltipCalendarDisabled:"Sélectionneur de date désactivé",weekText:"Semaine",datePicker:"Sélectionneur de date",inputHelp:"Appuyez sur la touche Bas ou Haut pour accéder au calendrier.",inputHelpBoth:"Appuyez sur la touche Bas ou Haut pour accéder au calendrier, et sur Maj + Bas ou Maj + Haut pour accéder au menu déroulant des heures.",
dateTimeRange:{hint:{min:"",max:"",inRange:""},messageDetail:{rangeUnderflow:"",rangeOverflow:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}},dateRestriction:{hint:"",messageSummary:"",messageDetail:""}},"oj-ojInputTime":{cancelText:"Annuler",okText:"OK",currentTimeText:"Maintenant",hourWheelLabel:"Heure",minuteWheelLabel:"Minute",ampmWheelLabel:"AMPM",tooltipTime:"Sélectionner l'heure",tooltipTimeDisabled:"Sélectionneur d'heure désactivé",inputHelp:"Appuyez sur la touche Bas ou Haut pour accéder au menu déroulant des heures.",
dateTimeRange:{hint:{min:"",max:"",inRange:""},messageDetail:{rangeUnderflow:"",rangeOverflow:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}}},"oj-inputBase":{regexp:{messageSummary:"",messageDetail:""}},"oj-ojInputPassword":{regexp:{messageDetail:"La valeur doit correspondre au modèle : '{pattern}'"}},"oj-ojFilmStrip":{labelAccArrowNextPage:"Page suivante",labelAccArrowPreviousPage:"Page précédente",tipArrowNextPage:"Suivant",tipArrowPreviousPage:"Précédente"},"oj-ojDataGrid":{accessibleSortAscending:"{id} triés dans l'ordre croissant",
accessibleSortDescending:"{id} triés dans l'ordre décroissant",accessibleActionableMode:"Activer le mode d'intervention",accessibleNavigationMode:"Entrée dans le mode de navigation, Appuyez sur F2 pour activer le mode de modification ou d'intervention",accessibleEditableMode:"Entrée dans le mode de modification. Appuyez sur Échap pour naviguer en dehors de la grille de données.",accessibleSummaryExact:"Cette grille de données comporte {rownum} rangées et {colnum} colonnes.",accessibleSummaryEstimate:"Cette grille de données comporte un nombre inconnu de rangées et de colonnes.",
accessibleSummaryExpanded:"{num} rangées sont actuellement développées.",accessibleRowExpanded:"Rangée développée",accessibleRowCollapsed:"Rangée réduite",accessibleRowSelected:"Rangée {row} sélectionnée",accessibleColumnSelected:"Colonne {column} sélectionnée",accessibleStateSelected:"sélectionné",accessibleMultiCellSelected:"{num} cellules sélectionnées",accessibleRowContext:"Rangée {index}",accessibleColumnContext:"Colonne {index}",accessibleRowHeaderContext:"En-tête de rangée {index}",accessibleColumnHeaderContext:"En-tête de colonne {index}",
accessibleRowEndHeaderContext:"En-tête de fin de rangée {index}",accessibleColumnEndHeaderContext:"En-tête de fin de colonne {index}",accessibleLevelContext:"Niveau {level}",accessibleRangeSelectModeOn:"Mode d'ajout de l'intervalle de cellules sélectionné activé",accessibleRangeSelectModeOff:"Mode d'ajout de l'intervalle de cellules sélectionné désactivé",accessibleFirstRow:"Vous avez atteint la première rangée.",accessibleLastRow:"Vous avez atteint la dernière rangée.",accessibleFirstColumn:"Vous avez atteint la première colonne.",
accessibleLastColumn:"Vous avez atteint la dernière colonne.",accessibleSelectionAffordanceTop:"Indicateur de sélection supérieur",accessibleSelectionAffordanceBottom:"Indicateur de sélection inférieur",msgFetchingData:"Extraction des données...",msgNoData:"Aucun élément à afficher.",labelResize:"Redimensionner",labelResizeWidth:"Redimensionner la largeur",labelResizeHeight:"Redimensionner la hauteur",labelSortRow:"Trier la rangée",labelSortRowAsc:"Trier la rangée par ordre croissant",labelSortRowDsc:"Trier la rangée par ordre décroissant",
labelSortCol:"Trier la colonne",labelSortColAsc:"Trier la colonne par ordre croissant",labelSortColDsc:"Trier la colonne par ordre décroissant",labelCut:"Couper",labelPaste:"Coller",labelEnableNonContiguous:"Activer les sélections non contiguës",labelDisableNonContiguous:"Désactiver les sélections non contiguës",labelResizeDialogSubmit:"OK"},"oj-ojRowExpander":{accessibleLevelDescription:"Niveau {level}",accessibleRowDescription:"Niveau {level}, rangée {num} de {total}",accessibleRowExpanded:"Rangée développée",
accessibleRowCollapsed:"Rangée réduite",accessibleStateExpanded:"développé",accessibleStateCollapsed:"réduit"},"oj-ojListView":{msgFetchingData:"Extraction des données...",msgNoData:"Aucun élément à afficher.",indexerCharacters:"A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z",accessibleReorderTouchInstructionText:"Touchez deux fois et maintenez la pression. Attendez le signal sonore puis réorganisez en faisant glisser.",accessibleReorderBeforeItem:"Avant {item}",accessibleReorderAfterItem:"Après {item}",
accessibleReorderInsideItem:"Dans {item}",labelCut:"Couper",labelCopy:"Copier",labelPaste:"Coller",labelPasteBefore:"Coller avant",labelPasteAfter:"Coller après"},"oj-_ojLabel":{tooltipHelp:"Aide",tooltipRequired:"Obligatoire"},"oj-ojInputNumber":{numberRange:{hint:{min:"",max:"",inRange:"",exact:""},messageDetail:{rangeUnderflow:"",rangeOverflow:"",exact:""},messageSummary:{rangeUnderflow:"",rangeOverflow:""}},tooltipDecrement:"Décrément",tooltipIncrement:"Incrément"},"oj-ojTable":{labelAccSelectionAffordanceTop:"Indicateur de sélection supérieur",
labelAccSelectionAffordanceBottom:"Indicateur de sélection inférieur",labelEnableNonContiguousSelection:"Activer les sélections non contiguës",labelDisableNonContiguousSelection:"Désactiver les sélections non contiguës",labelSelectRow:"Sélectionner une rangée ",labelEditRow:"Modifier une rangée",labelSelectAndEditRow:"Sélectionner et modifier une rangée ",labelSelectColumn:"Sélectionner une colonne",labelSort:"Trier",labelSortAsc:"Trier par ordre croissant",labelSortDsc:"Trier par ordre décroissant",
msgFetchingData:"Extraction des données...",msgNoData:"Aucune donnée à afficher."},"oj-ojTabs":{labelCut:"Couper",labelPasteBefore:"Coller avant",labelPasteAfter:"Coller après",labelRemove:"Supprimer",labelReorder:"Reclasser",removeCueText:"Supprimable"},"oj-ojSelect":{searchField:"Champ de recherche",noMatchesFound:"Aucune correspondance n'a été trouvée",oneMatchesFound:"Une correspondance a été trouvée",moreMatchesFound:"{num} correspondances trouvées"},"oj-ojSwitch":{SwitchON:"Activer",SwitchOFF:"Désactiver"},
"oj-ojCombobox":{noMatchesFound:"Aucune correspondance n'a été trouvée"},"oj-ojInputSearch":{noMatchesFound:"Aucune correspondance n'a été trouvée"},"oj-ojTree":{stateLoading:"Chargement...",labelNewNode:"Nouveau noeud",labelMultiSelection:"Sélection multiple",labelEdit:"Modifier",labelCreate:"Créer",labelCut:"Couper",labelCopy:"Copier",labelPaste:"Coller",labelRemove:"Supprimer",labelRename:"Renommer",labelNoData:"Aucune donnée"},"oj-ojPagingControl":{labelAccPaging:"Pagination",labelAccNavFirstPage:"Première page",
labelAccNavLastPage:"Dernière page",labelAccNavNextPage:"Page suivante",labelAccNavPreviousPage:"Page précédente",labelAccNavPage:"Page",labelLoadMore:"Afficher plus...",labelLoadMoreMaxRows:"Limite maximum de {maxRows} rangées atteinte",labelNavInputPage:"Page",labelNavInputPageMax:"de {pageMax}",msgItemRangeCurrent:"{pageFrom} à {pageTo}",msgItemRangeCurrentSingle:"{pageFrom}",msgItemRangeOf:"de",msgItemRangeOfAtLeast:"d'au moins",msgItemRangeOfApprox:"d'environ",msgItemRangeItems:"éléments",tipNavInputPage:"Aller à la page",
tipNavPageLink:"Aller à la page {pageNum}",tipNavNextPage:"Suivante",tipNavPreviousPage:"Précédente",tipNavFirstPage:"Première",tipNavLastPage:"Dernière",pageInvalid:{summary:"La valeur de page entrée n'est pas valide.",detail:"Entrez une valeur supérieure à 0."},maxPageLinksInvalid:{summary:"La valeur maxPageLinks n'est pas valide.",detail:"Entrez une valeur supérieure à 4."}},"oj-ojMasonryLayout":{labelCut:"Couper",labelPasteBefore:"Coller avant",labelPasteAfter:"Coller après"},"oj-panel":{labelAccButtonExpand:"Développer",
labelAccButtonCollapse:"Réduire",labelAccButtonRemove:"Supprimer"},"oj-ojChart":{labelDefaultGroupName:"Groupe {0}",labelSeries:"Série",labelGroup:"Groupe",labelDate:"Date",labelValue:"Valeur",labelTargetValue:"Cible",labelX:"X",labelY:"Y",labelZ:"Z",labelPercentage:"Pourcentage",labelLow:"Bas",labelHigh:"Élevé",labelOpen:"Ouvrir",labelClose:"Fermer",labelVolume:"Volume",labelQ1:"Q1",labelQ2:"Q2",labelQ3:"Q3",labelMin:"Min.",labelMax:"Max.",labelOther:"Autre",tooltipPan:"Panoramique",tooltipSelect:"Sélection par rectangle de sélection",
tooltipZoom:"Zoom par rectangle de sélection",componentName:"Graphique"},"oj-dvtBaseGauge":{componentName:"Jauge"},"oj-ojDiagram":{promotedLink:"{0} lien",promotedLinks:"{0} liens",promotedLinkAriaDesc:"Indirect",componentName:"Diagramme"},"oj-ojGantt":{componentName:"Diagramme de Gantt",accessibleDurationDays:"{0} jours",accessibleDurationHours:"{0} heures",accessibleTaskInfo:"Heure de début : {0}, heure de fin : {1}, durée : {2}",accessibleMilestoneInfo:"Heure : {0}",accessibleRowInfo:"Rangée {0}",
tooltipZoomIn:"Zoom avant",tooltipZoomOut:"Zoom arrière"},"oj-ojLegend":{componentName:"Légende"},"oj-ojNBox":{highlightedCount:"{0}/{1}",labelOther:"Autre",labelGroup:"Groupe",labelSize:"Taille",labelAdditionalData:"Données supplémentaires",componentName:"Grille à N cases"},"oj-ojPictoChart":{componentName:"Graphique/image"},"oj-ojSparkChart":{componentName:"Graphique"},"oj-ojSunburst":{labelColor:"Couleur",labelSize:"Taille",componentName:"Rayons"},"oj-ojTagCloud":{componentName:"Nuage de mots clés"},
"oj-ojThematicMap":{componentName:"Carte thématique"},"oj-ojTimeAxis":{componentName:"Axe temporel"},"oj-ojTimeline":{componentName:"Graphique temporel",labelSeries:"Série",tooltipZoomIn:"Zoom avant",tooltipZoomOut:"Zoom arrière"},"oj-ojTreemap":{labelColor:"Couleur",labelSize:"Taille",tooltipIsolate:"Isoler",tooltipRestore:"Restaurer",componentName:"Arbre"},"oj-dvtBaseComponent":{labelScalingSuffixThousand:"K",labelScalingSuffixMillion:"M",labelScalingSuffixBillion:"G",labelScalingSuffixTrillion:"T",
labelScalingSuffixQuadrillion:"Q",labelInvalidData:"Données non valides",labelNoData:"Aucune donnée à afficher",labelClearSelection:"Effacer la sélection",labelDataVisualization:"Visualisation de données",stateSelected:"Sélectionné",stateUnselected:"Non sélectionné",stateMaximized:"Agrandi",stateMinimized:"Réduit",stateExpanded:"Développé",stateCollapsed:"Réduit",stateIsolated:"Isolé",stateHidden:"Masqué",stateVisible:"Visible",stateDrillable:"Forage possible",labelAndValue:"{0}: {1}",labelCountWithTotal:"{0} de {1}"},
"oj-ojNavigationList":{defaultRootLabel:"Liste de navigation",hierMenuBtnLabel:"Bouton de menu hiérarchique",selectedLabel:"sélectionné",previousIcon:"Précédente",msgFetchingData:"Extraction des données...",msgNoData:"Aucun élément à afficher."},"oj-ojSlider":{noValue:"ojSlider n'a pas de valeur",maxMin:"La valeur Max. ne peut pas être inférieure à la valeur Min.",valueRange:"La valeur doit se situer entre les valeurs Min. et Max.",optionNum:"L'option {option} n'est pas numérique",invalidStep:"Étape non valide; doit être > 0"},
"oj-ojPopup":{ariaLiveRegionInitialFocusFirstFocusable:"Entrée dans la fenêtre contextuelle. Appuyez sur F6 pour naviguer entre la fenêtre et le contrôle associé.",ariaLiveRegionInitialFocusNone:"Fenêtre contextuelle ouverte. Appuyez sur F6 pour naviguer entre la fenêtre et le contrôle associé.",ariaLiveRegionInitialFocusFirstFocusableTouch:"Entrée dans la fenêtre contextuelle. Vous pouvez fermer cette fenêtre en accédant au dernier lien qu'elle contient.",ariaLiveRegionInitialFocusNoneTouch:"Fenêtre contextuelle ouverte. Accédez au dernier lien pour placer le focus sur cette fenêtre.",
ariaFocusSkipLink:"Touchez deux fois pour accéder à la fenêtre contextuelle ouverte.",ariaCloseSkipLink:"Touchez deux fois pour fermer la fenêtre contextuelle ouverte."},"oj-pullToRefresh":{ariaRefreshLink:"Cliquez sur le lien pour actualiser le contenu",ariaRefreshingLink:"Actualisation du contenu",ariaRefreshCompleteLink:"Actualisation terminée"},"oj-ojIndexer":{indexerOthers:"#",ariaDisabledLabel:"Aucun en-tête de groupe correspondant",ariaOthersLabel:"numéro",ariaInBetweenText:"Entre {first} et {second}",
ariaKeyboardInstructionText:"Appuyez sur Entrée pour sélectionner la valeur.",ariaTouchInstructionText:"Touchez deux fois et maintenez pour passer en mode geste, puis glissez vers le haut ou le bas pour ajuster la valeur."},"oj-ojMenu":{labelCancel:"Annuler"}});