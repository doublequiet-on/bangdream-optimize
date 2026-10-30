import { createRuntime } from './runtime/index.js?rev=c4787bae09e3364851a3';
import { characterIconUrls } from './assets/index.js?rev=c4787bae09e3364851a3';
import {
  areaItemGroupIconUrls,
  createAreaItemHelpers,
  formatAreaItemRate,
} from './domain/area.js?rev=c4787bae09e3364851a3';
import { attributeSwatch } from './ui/attribute.js?rev=c4787bae09e3364851a3';
import { createActivityActions } from './actions/activity.js?rev=c4787bae09e3364851a3';
import { createAppLifecycle } from './app/lifecycle.js?rev=c4787bae09e3364851a3';
import { createInitialState } from './app/state.js?rev=c4787bae09e3364851a3';
import {
  createBestdoriProfileImporter,
  mainBandCardIds,
  parseBestdoriProfileExport,
} from './data/bestdori.js?rev=c4787bae09e3364851a3';
import { createCalculationActions } from './actions/calculation.js?rev=c4787bae09e3364851a3';
import {
  characterBonusWithRates as buildCharacterBonusWithRates,
  createCharacterBonusHelpers,
} from './domain/character.js?rev=c4787bae09e3364851a3';
import { createConfigActions } from './actions/config.js?rev=c4787bae09e3364851a3';
import { createCoreLoader } from './app/core.js?rev=c4787bae09e3364851a3';
import {
  createDiagnostics,
  diagnosticFileName,
} from './data/diagnostics.js?rev=c4787bae09e3364851a3';
import { createDownloadActions } from './actions/download.js?rev=c4787bae09e3364851a3';
import { queryElements } from './app/elements.js?rev=c4787bae09e3364851a3';
import {
  createEventModel,
  CUSTOM_EVENT_ID,
  isHiddenEventId,
  normalizedCalculationMode,
  recentUnfinishedEvent,
} from './models/event.js?rev=c4787bae09e3364851a3';
import { createEventActions } from './actions/event.js?rev=c4787bae09e3364851a3';
import { createEventContext } from './app/event.js?rev=c4787bae09e3364851a3';
import { createFormActions } from './actions/form.js?rev=c4787bae09e3364851a3';
import { createFeedbackActions } from './actions/feedback.js?rev=c4787bae09e3364851a3';
import {
  numericStringSort,
  optionText,
  parseEntityId,
  parseNonNegativeInteger,
  readOptionalInteger,
} from './utils.js?rev=c4787bae09e3364851a3';
import { createCardView } from './views/card-library.js?rev=c4787bae09e3364851a3';
import { createEventView } from './views/event.js?rev=c4787bae09e3364851a3';
import { createFormCells } from './ui/form.js?rev=c4787bae09e3364851a3';
import { createGameMeta } from './domain/meta.js?rev=c4787bae09e3364851a3';
import {
  cloneJson,
  createPlayerModel,
  normalizedServer as normalizeServerValue,
  readFiniteInput,
} from './models/player.js?rev=c4787bae09e3364851a3';
import { createPageController } from './app/page.js?rev=c4787bae09e3364851a3';
import { createPlayerStore } from './app/player.js?rev=c4787bae09e3364851a3';
import { createPlayerView } from './views/player-library.js?rev=c4787bae09e3364851a3';
import { createProfileActions } from './actions/profile.js?rev=c4787bae09e3364851a3';
import { createProfileView } from './views/profile.js?rev=c4787bae09e3364851a3';
import {
  createReferenceView,
  installRecoveringDatalistInput,
} from './views/reference.js?rev=c4787bae09e3364851a3';
import { createReferenceData } from './data/reference.js?rev=c4787bae09e3364851a3';
import {
  renderMetrics as renderMetricsView,
  renderResultSummary as renderResultSummaryView,
} from './views/result.js?rev=c4787bae09e3364851a3';
import {
  RESULT_CACHE_LIMIT,
  createResultCacheStorage,
} from './data/result-cache.js?rev=c4787bae09e3364851a3';
import { createResourceActions } from './actions/resource.js?rev=c4787bae09e3364851a3';
import { createServerContext } from './app/server.js?rev=c4787bae09e3364851a3';
import { createSongView } from './views/song.js?rev=c4787bae09e3364851a3';
import { createStatusProxy } from './app/status.js?rev=c4787bae09e3364851a3';
import { createStatusView } from './views/status.js?rev=c4787bae09e3364851a3';
import { createViewAdapters } from './views/adapters.js?rev=c4787bae09e3364851a3';
import { createArchiveUI } from './ui/archive.js?rev=c4787bae09e3364851a3';
import { createResultCacheView } from './views/result-cache.js?rev=c4787bae09e3364851a3';

import { mountShell } from './ui/shell.js?rev=c4787bae09e3364851a3';
import { configureCardPresentation } from './ui/card-preview.js?rev=c4787bae09e3364851a3';
import { createCardBrief } from './ui/cards/brief.js?rev=c4787bae09e3364851a3';
import { cardModel } from './ui/cards/model.js?rev=c4787bae09e3364851a3';
import { createCardDetails } from './ui/cards/presentation.js?rev=c4787bae09e3364851a3';
import { createTeamEditor } from './ui/team-editor.js?rev=c4787bae09e3364851a3';
import { createHeroes } from './ui/hero.js?rev=c4787bae09e3364851a3';
import { createActivityUI } from './ui/activity.js?rev=c4787bae09e3364851a3';
import { createEquipmentUI } from './ui/equipment.js?rev=c4787bae09e3364851a3';
import {installSelects} from './ui/select.js?rev=c4787bae09e3364851a3';

// Runtime state and deferred cross-module calls.
mountShell(document);
installSelects(document);
const state = createInitialState();
const elements = queryElements(document);
void renderConfiguredAppVersion(elements.appVersion);
const status = createStatusProxy();
const resultCacheStorage = createResultCacheStorage({ limit: RESULT_CACHE_LIMIT });
const resultCacheView = createResultCacheView({ elements, eventLabel: (...args) => eventLabel(...args) });
try {
  state.resultCache = await resultCacheStorage.loadResultCache();
} catch {
  state.resultCache = [];
}
resultCacheView.renderResultCache([], {});
const deferred = {
  activatePage: (...args) => pageController.activatePage(...args),
  ensureCore: (...args) => ensureCore(...args),
  renderAreaItems: (...args) => playerView.renderAreaItems(...args),
  renderCards: (...args) => cardView.renderCards(...args),
  renderCharacterBonuses: (...args) => playerView.renderCharacterBonuses(...args),
  renderConfigForms: (...args) => pageController.renderConfigForms(...args),
  renderResultCache: (...args) => resultCacheView.renderResultCache(...args),
  renderMetrics: (...args) => renderMetrics(...args),
  renderResultSummary: (...args) => renderResultSummary(...args),
  renderSongs: (...args) => songView.renderSongs(...args),
};

async function renderConfiguredAppVersion(element) {
  if (!element) {
    return;
  }
  try {
    const response = await fetch(new URL('../package.json', import.meta.url), {
      cache: 'no-cache',
    });
    if (!response.ok) {
      return;
    }
    const metadata = await response.json();
    const version = String(metadata?.version ?? '').trim();
    if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
      return;
    }
    element.textContent = `v${version}`;
    element.hidden = false;
  } catch {
    // Version metadata is informational and must not block application startup.
  }
}

// Server, game metadata, and shared form cells.
const {
  currentServer,
  serverIndex,
} = createServerContext({
  getPlayerServer: () => readPlayer().server,
  getServerInputValue: () => elements.playerServer?.value,
  normalizeServer: normalizeServerValue,
});

const {
  areaItemLabel,
  cardAttribute,
  cardCharacterId,
  cardIconUrls,
  cardLabel,
  cardName,
  cardRarity,
  cardTrainingStatusList,
  characterLabel,
  eventDateRange,
  eventLabel,
  maxAreaItemLevel,
  maxCardLevel,
  cardEpisodeAlwaysRead,
  cardEpisodeAvailable,
  normalizeCardTrainingStatus,
  recordWithFix,
  selectedBandId,
  serverScopedValue,
  songCoverUrls,
  songLabel,
} = createGameMeta({
  getCore: () => state.core,
  serverIndex,
});

const {
  attributeCell,
  entityCell,
  inputCell,
  percentCell,
  songSelectCell,
} = createFormCells({
  attributeFallback: attributeSwatch,
  songCoverUrls,
  songLabel,
  songSearchValue: (songId) => optionText(songId, songLabel(songId)),
  getSongRecords: () => state.core?.songs,
  installRecoveringDatalistInput,
});

// Event and player normalization models.
const {
  activityModeForEvent,
  defaultEditableEvent,
  defaultEventTypeForMode,
  defaultSongListForMode,
  ensureSongListForMode,
  eventMatchesActivityMode,
  eventSongsFromPreset,
  eventWithParameterBonusFix,
  fixedSongListForMode,
  isSupportedEventType,
  normalizedActivityMode,
  supportedEventTypeOrDefault,
} = createEventModel({
  getSongRecords: () => state.core?.songs,
  getEventCharacterParameterBonusFix: () => state.core?.eventCharacterParameterBonusFix,
  serverScopedValue,
  cloneJson,
});

const {
  editableEventOverride,
  editableEventSnapshot: buildEditableEventSnapshot,
  normalizedCardConfig,
  normalizedCharacterBonus,
  normalizedEventAttributeAndCharacterBonus,
  normalizedEventAttributes,
  normalizedEventCharacterParameterBonus,
  normalizedEventCharacters,
  normalizedEventMembers,
  normalizedPlayer,
  normalizedServer,
  normalizedStatRate,
} = createPlayerModel({
  hasCardRecord: id => Boolean(state.core?.cards?.[id] ?? state.core?.cardsFix?.[id]),
  normalizedActivityMode,
  normalizedCalculationMode,
  eventWithParameterBonusFix,
  defaultEventTypeForMode,
  supportedEventTypeOrDefault,
  maxCardLevel,
  normalizeCardTrainingStatus,
});

const {
  applyEventInputToPlayer,
  assertSupportedEvent,
  assertSupportedKnownEvent,
  editableEventSnapshot,
  eventSearchValue,
  normalizeCurrentActivityForMode,
  selectedEventId,
  supportedEventRecords,
} = createEventContext({
  state,
  elements,
  customEventId: CUSTOM_EVENT_ID,
  readOptionalInteger,
  optionText,
  eventLabel,
  normalizedCalculationMode,
  activityModeForEvent,
  isSupportedEventType,
  isHiddenEventId,
  ensureSongListForMode,
  buildEditableEventSnapshot,
});

// Domain helpers and reference data.
const {
  allCharacterBonusesAreMaxed,
  bestdoriCharacterBonusFromPoints,
  maxCharacterBonusForPlayer,
  selectedCardCharacterIds,
} = createCharacterBonusHelpers({
  getCharacterRecords: () => state.core?.characters,
  normalizedServer,
  normalizedCharacterBonus,
  cardCharacterId,
});

const {
  allAreaItemsAreMaxed,
  areaItemGroups,
  areaItemIconUrls,
} = createAreaItemHelpers({
  getAreaItemRecords: () => state.core?.areaItems,
  recordWithFix,
  serverScopedValue,
  maxAreaItemLevel,
});

const {
  cacheEventPresetFromCore,
  cacheLoadedEventPreset,
  loadEventRecord,
  normalizeReferenceData,
} = createReferenceData({
  getCore: () => state.core,
  getRuntime: () => state.runtime,
  appendLog: status.appendLog,
  cloneJson,
  eventWithParameterBonusFix,
});

const {
  buildDiagnostic,
} = createDiagnostics({
  getRuntime: () => state.runtime,
  getCore: () => state.core,
  appendLog: status.appendLog,
});

// Profile, reference, player, and result view adapters.
const {
  activeProfileName,
  nextProfileName,
  renderPlayerProfileControls,
} = createProfileView({
  profileSelect: elements.playerProfile,
  profileNameInput: elements.playerProfileName,
  deleteButton: elements.deletePlayerProfile,
  getProfiles: () => state.playerProfiles,
  getActiveId: () => state.activePlayerProfileId,
});

const {
  matchingCardPreviewIds,
  renderReferenceOptions,
  warmupCardSearchIndex,
} = createReferenceView({
  elements,
  currentServer,
  getCore: () => state.core,
  getPlayer: () => peekPlayer(),
  cardLabel,
  cardName,
  cardIconUrls,
  songLabel,
  areaItemLabel,
  characterLabel,
  supportedEventRecords,
  eventLabel,
});

const {
  cancelPendingSave,
  ensurePlayerProfiles,
  peekPlayer,
  readPlayer,
  refreshPlayerProfiles,
  initializePlayerDefaults,
  safeReadPlayer,
  savePlayerNow,
  writePlayer,
} = createPlayerStore({
  state,
  playerJson: elements.playerJson,
  normalizePlayer: normalizedPlayer,
  cacheEventPresetFromCore,
  activityModeForEvent,
  ensureSongListForMode,
  recentUnfinishedEvent,
  customEventId: CUSTOM_EVENT_ID,
  defaultEditableEvent,
  renderPlayerProfileControls,
  onError: status.setError,
});

const {
  cardEntityCell,
  characterEntityCell,
  mergedEntityIds,
  renderMetrics,
  renderResultSummary,
} = createViewAdapters({
  elements,
  numericStringSort,
  renderMetricsView,
  renderResultSummaryView,
  selectedBandId,
  areaItemGroups,
  areaItemLabel,
  formatAreaItemRate,
  songCoverUrls,
  songLabel,
  getSongRecord: (songId) => state.core?.songs?.[String(songId)],
  getCore: () => state.core,
  cardLabel,
  cardName,
  cardRarity,
  cardCharacterId,
  normalizedCardConfig,
  readPlayer,
  cardIconUrls,
  cardAttribute,
  attributeFallback: attributeSwatch,
  entityCell,
  characterIconUrls,
  characterLabel,
});

// Profile import/export adapters and core data loader.
const {
  bestdoriProfileToPlayerConfig,
  playerToBestdoriProfileExport,
  importEnabledAreaItems,
  importMainBandCards,
  importMainBandCharacterBonuses,
} = createBestdoriProfileImporter({
  normalizedPlayer,
  normalizedServer,
  normalizedCharacterBonus,
  normalizedStatRate,
  recordWithFix,
  maxCardLevel,
  maxAreaItemLevel,
  cardCharacterId,
  getCharacterRecords: () => state.core?.characters,
  bestdoriCharacterBonusFromPoints,
});

const {
  cacheCurrentEventPreset,
  ensureCore,
  preloadReferenceData,
} = createCoreLoader({
  state,
  elements,
  normalizePlayer: normalizedPlayer,
  normalizeReferenceData,
  cacheEventPresetFromCore,
  cacheLoadedEventPreset,
  loadEventRecord,
  readPlayer,
  writePlayer,
  renderReferenceOptions,
  warmupCardSearchIndex,
  renderConfigForms: deferred.renderConfigForms,
  appendLog: status.appendLog,
});

// User action handlers.
const configActions = createConfigActions({
  readPlayer,
  writePlayer,
  normalizedCardConfig,
  normalizedCharacterBonus,
  maxAreaItemLevel,
  maxCharacterBonusForPlayer,
  allAreaItemsAreMaxed,
  allCharacterBonusesAreMaxed,
  buildCharacterBonusWithRates,
  cardCharacterId,
  getAreaItemRecords: () => state.core?.areaItems,
  getCharacterRecords: () => state.core?.characters,
  renderCards: deferred.renderCards,
  renderAreaItems: deferred.renderAreaItems,
  renderCharacterBonuses: deferred.renderCharacterBonuses,
});

const profileActions = createProfileActions({
  initializePlayerDefaults,
  state,
  elements,
  normalizedPlayer,
  normalizedServer,
  parseEntityId,
  parseNonNegativeInteger,
  parseBestdoriProfileExport,
  ensureCore: deferred.ensureCore,
  readPlayer,
  writePlayer,
  savePlayerNow,
  refreshPlayerProfiles,
  renderPlayerProfileControls,
  renderConfigForms: deferred.renderConfigForms,
  nextProfileName,
  activeProfileName,
  bestdoriProfileToPlayerConfig,
  playerToBestdoriProfileExport,
  importMainBandCards,
  importMainBandCharacterBonuses,
  importEnabledAreaItems,
  activatePage: deferred.activatePage,
  setStatus: status.setStatus,
  setError: status.setError,
});

const calculationActions = createCalculationActions({
  state,
  elements,
  readPlayer,
  writePlayer,
  savePlayerNow,
  readOptionalInteger,
  parseEntityId,
  applyEventInputToPlayer,
  editableEventSnapshot,
  normalizeCurrentActivityForMode,
  ensureOwnedCardCharacterBonuses: configActions.ensureOwnedCardCharacterBonuses,
  ensureCore: deferred.ensureCore,
  renderConfigForms: deferred.renderConfigForms,
  renderResultSummary: deferred.renderResultSummary,
  renderMetrics: deferred.renderMetrics,
  buildDiagnostic,
  diagnosticFileName,
  activatePage: deferred.activatePage,
  setStatus: status.setStatus,
  setError: status.setError,
  eventLabel,
  normalizedPlayer,
  areaItemGroups,
  mainBandCardIds,
  importMainBandCards,
  importMainBandCharacterBonuses,
  importEnabledAreaItems,
  cardCharacterId,
  resultCacheLimit: RESULT_CACHE_LIMIT,
  renderResultCache: deferred.renderResultCache,
  persistResultCache: resultCacheStorage.saveResultCache,
  clearPersistedResultCache: resultCacheStorage.clearResultCache,
});

const feedbackActions = createFeedbackActions({
  state,
  elements,
  diagnosticFileName,
});

const resourceActions = createResourceActions({
  state,
  elements,
  cancelPendingSave,
  readPlayer,
  writePlayer,
  refreshPlayerProfiles,
  initializePlayerDefaults,
  renderConfigForms: deferred.renderConfigForms,
  renderReferenceOptions,
  renderResultSummary: deferred.renderResultSummary,
  renderMetrics: deferred.renderMetrics,
  renderResultCache: deferred.renderResultCache,
  clearPersistedResultCache: resultCacheStorage.clearResultCache,
  invalidateResultCache: calculationActions.invalidateResultCache,
  hasActiveCalculation: calculationActions.hasActiveCalculation,
  ensureCore: deferred.ensureCore,
  setStatus: status.setStatus,
  setError: status.setError,
});

const downloadActions = createDownloadActions({
  state,
  elements,
  setStatus: status.setStatus,
  setError: status.setError,
});

// Page views.
const loadCardDetail = id => state.runtime.syncCardDetail(id);
const readOnlyCardDetails = createCardDetails({loadCardDetail});
configureCardPresentation(({id,config,player,captain,order,teamCardIds}) => {
  const currentPlayer = player ?? safeReadPlayer();
  const card = cardModel(state.core, currentPlayer, id, config, state.activePlayerProfileId);
  const teamCards = Array.isArray(teamCardIds) ? teamCardIds.map(teamId => teamId
    ? cardModel(state.core, currentPlayer, teamId, undefined, state.activePlayerProfileId) : null) : undefined;
  return createCardBrief(card, {captain,order,teamCards,onOpen:c=>readOnlyCardDetails.open(c,{context:config?'本次计算':'当前档案'})});
});
const cardView = createCardView({
  loadCardDetail,
  rows: elements.cardRows,
  getProfileId: () => state.activePlayerProfileId,
  writePlayer,
  expandedGroups: state.expandedCardGroups,
  groupCache: state.cardGroupCache,
  getCore: () => state.core,
  getPlayer: peekPlayer,
  entityCell,
  inputCell,
  cardLabel,
  cardName,
  cardRarity,
  cardIconUrls,
  normalizedCardConfig,
  cardTrainingStatusList,
  maxCardLevel,
  cardEpisodeAlwaysRead,
  cardEpisodeAvailable,
  cardCharacterId,
  cardAttribute,
  characterLabel,
  updateCard: configActions.updateCard,
  updateCardEpisode: configActions.updateCardEpisode,
  deleteCard: configActions.deleteCard,
  clearCards: configActions.clearCards,
});

const eventActions = createEventActions({
  readPlayer,
  normalizePlayer: normalizedPlayer,
  selectedEventId,
  editableEventSnapshot,
  defaultEventTypeForMode,
  assertSupportedEvent,
  eventMatchesActivityMode,
  editableEventOverride,
  ensureSongListForMode,
  writePlayer,
  renderConfigForms: deferred.renderConfigForms,
  normalizedEventAttributes,
  normalizedEventCharacters,
  normalizedEventMembers,
  fixedSongListForMode,
  renderSongs: deferred.renderSongs,
});

const activityActions = createActivityActions({
  getProfileId: () => state.activePlayerProfileId,
  elements,
  customEventId: CUSTOM_EVENT_ID,
  normalizedPlayer,
  normalizedCalculationMode,
  activityModeForEvent,
  defaultEditableEvent,
  defaultEventTypeForMode,
  defaultSongListForMode,
  ensureSongListForMode,
  eventMatchesActivityMode,
  isHiddenEventId,
  editableEventOverride,
  fixedSongListForMode,
  normalizedEventAttributes,
  normalizedEventCharacters,
  normalizedEventMembers,
  serverIndex,
  readFiniteInput,
  readOptionalInteger,
  ensureCore: deferred.ensureCore,
  loadEventRecord,
  cacheLoadedEventPreset,
  assertSupportedEvent,
  assertSupportedKnownEvent,
  editableEventSnapshot,
  eventSearchValue,
  readPlayer,
  writePlayer,
  updateCurrentEvent: eventActions.updateCurrentEvent,
  renderReferenceOptions,
  renderConfigForms: deferred.renderConfigForms,
  setStatus: status.setStatus,
  setError: status.setError,
});

const playerView = createPlayerView({
  elements,
  recordWithFix,
  serverScopedValue,
  writePlayer,
  getProfileId: () => state.activePlayerProfileId,
  getCore: () => state.core,
  maxCharacterBonusForPlayer,
  expandedAreaItemGroups: state.expandedAreaItemGroups,
  isCharacterBonusesCollapsed: () => state.characterBonusesCollapsed,
  setCharacterBonusesCollapsed: (collapsed) => {
    state.characterBonusesCollapsed = collapsed;
  },
  readPlayer,
  areaItemGroups,
  areaItemGroupIconUrls,
  areaItemIconUrls,
  areaItemLabel,
  maxAreaItemLevel,
  formatAreaItemRate,
  hasAreaItemResources: () => Object.keys(state.core?.areaItems ?? {}).length > 0,
  hasCharacterResources: () => Object.keys(state.core?.characters ?? {}).length > 0,
  allAreaItemsAreMaxed,
  allCharacterBonusesAreMaxed,
  characterIdsForPlayer: (player) => mergedEntityIds(state.core?.characters, player.characterBouns),
  selectedCardCharacterIds,
  normalizedCharacterBonus,
  entityCell,
  characterEntityCell,
  inputCell,
  updateAreaItem: configActions.updateAreaItem,
  updateCharacterBonus: configActions.updateCharacterBonus,
});

const eventView = createEventView({
  elements,
  customEventId: CUSTOM_EVENT_ID,
  readPlayer,
  editableEventSnapshot,
  isSupportedEventType: (eventType) => isSupportedEventType(
    eventType,
    readPlayer().calculationMode,
  ),
  eventLabel,
  eventDateRange,
  normalizedEventAttributeAndCharacterBonus,
  normalizedEventCharacterParameterBonus,
  normalizedEventAttributes,
  normalizedEventCharacters,
  normalizedEventMembers,
  attributeCell,
  percentCell,
  characterEntityCell,
  cardEntityCell,
  cardAttribute,
  attributeFallback: attributeSwatch,
  updateEventAttribute: eventActions.updateEventAttribute,
  deleteEventAttribute: eventActions.deleteEventAttribute,
  updateEventCharacter: eventActions.updateEventCharacter,
  deleteEventCharacter: eventActions.deleteEventCharacter,
  updateEventMember: eventActions.updateEventMember,
  deleteEventMember: eventActions.deleteEventMember,
});

const songView = createSongView({
  getCore:()=>state.core,
  getProfileId:()=>state.activePlayerProfileId,
  readPlayer,writePlayer,
  songLabel,songCoverUrls,
  rows: elements.songRows,
  selectedEventId,
  editableEventSnapshot,
  getSongRecord: (songId) => state.core?.songs?.[String(songId)],
  normalizedActivityMode,
  fixedSongListForMode,
  eventSongsFromPreset,
  songSelectCell,
  updateSong: eventActions.updateSong,
});

// Page controller, form actions, status view, and lifecycle.
const teamEditor = createTeamEditor({getCore:()=>state.core,getPlayer:safeReadPlayer,getProfileId:()=>state.activePlayerProfileId,writePlayer,onApply:deferred.renderConfigForms,importDraft:calculationActions.loadMainBandDraft,openDetails:c=>readOnlyCardDetails.open(c,{context:'当前档案'})});
const heroes = createHeroes({readAsset:path=>state.runtime.loadHeaderAsset(path),getCore:()=>state.core,getPlayer:safeReadPlayer,getProfileId:()=>state.activePlayerProfileId});
const activityUI = createActivityUI({elements,getPlayer:readPlayer,writePlayer,renderForms:deferred.renderConfigForms,eventSnapshot:editableEventSnapshot,activityModeForEvent,getCore:()=>state.core,getProfileId:()=>state.activePlayerProfileId});
const equipmentUI = createEquipmentUI({elements,getPlayer:readPlayer,getProfileId:()=>state.activePlayerProfileId,writePlayer,renderForms:deferred.renderConfigForms,areaItemGroups,areaItemLabel});
const pageController = createPageController({
  elements,
  onRender: player => {activityUI.render(player);equipmentUI.render(player);archiveUI.render();void heroes.update();calculationActions.syncProfileResult();},
  renderTeams: teamEditor.renderTeams,
  normalizePlayer: normalizedPlayer,
  editableEventSnapshot,
  normalizedActivityMode,
  normalizedCalculationMode,
  activityModeForEvent,
  eventSearchValue,
  renderReferenceOptions,
  renderPlayerProfileControls,
  renderEventSummary: eventView.renderEventSummary,
  renderEventParameters: eventView.renderEventParameters,
  renderSongs: songView.renderSongs,
  renderCards: cardView.renderCards,
  renderAreaItems: playerView.renderAreaItems,
  renderCharacterBonuses: playerView.renderCharacterBonuses,
  areaItemGroups,
  areaItemGroupIconUrls,
  formatAreaItemRate,
  cardAttribute,
  cardIconUrls,
  cardLabel,
  cardName,
  cardRarity,
  safeReadPlayer,
});

const archiveUI=createArchiveUI({state,elements,readPlayer,writePlayer,refreshProfiles:refreshPlayerProfiles,renderForms:player=>pageController.renderConfigForms(player),setError:status.setError,setStatus:status.setStatus});

const formActions = createFormActions({
  elements,
  ensureCore: deferred.ensureCore,
  parseEntityId,
  normalizedPlayer,
  normalizedCharacterBonus,
  readPlayer,
  writePlayer,
  renderConfigForms: pageController.renderConfigForms,
  maxCardLevel,
  cardCharacterId,
  expandCardGroupForCard: cardView.expandCardGroupForCard,
  matchingCardPreviewIds,
  setStatus: status.setStatus,
  setError: status.setError,
});

const statusView = createStatusView({
  elements,
  renderResultSummary,
  renderMetrics,
});
status.attach(statusView);

const { bootstrap } = createAppLifecycle({
  state,
  elements,
  createRuntime,
  installRecoveringDatalistInput,
  ensureCore,
  ensurePlayerProfiles,
  initializePlayerDefaults,
  readPlayer,
  writePlayer,
  renderConfigForms: pageController.renderConfigForms,
  configureRuntimeControls: resourceActions.configureRuntimeControls,
  activatePage: pageController.activatePage,
  preloadReferenceData,
  warmupCardSearchIndex,
  renderReferenceOptions,
  handlers: {
    ...activityActions,
    ...calculationActions,
    ...configActions,
    ...formActions,
    ...feedbackActions,
    ...profileActions,
    ...downloadActions,
    ...resourceActions,
    handleToggleAreaItems: playerView.handleToggleAreaItems,
    handleToggleCharacterBonuses: playerView.handleToggleCharacterBonuses,
  },
  appendLog: status.appendLog,
  setStatus: status.setStatus,
  setError: status.setError,
});

document.addEventListener('player-config-change', () => {calculationActions.syncProfileResult();void heroes.update();});
document.addEventListener('game-language-change', () => {
  pageController.renderConfigForms(readPlayer());
  if (state.lastDiagnostic) renderResultSummary(state.lastDiagnostic.result, {diagnostic:state.lastDiagnostic});
});
await bootstrap();
pageController.activatePage(location.hash.slice(1) || 'activity');
window.addEventListener('hashchange', () => pageController.activatePage(location.hash.slice(1)));
