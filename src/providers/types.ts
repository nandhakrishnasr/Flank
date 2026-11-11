export type WidgetKind =
  | 'clipboard'
  | 'weather'
  | 'stats'
  | 'battery'
  | 'player'
  | 'focus'
  | 'clock'
  | 'scratchpad'
  | 'colorpicker'
  | 'calendar'
  | 'audio'
  | 'network'
  | 'bluetooth'
  | 'tasks'
  | 'calculator'
  | 'storage'
  | 'display'
  | 'privacy'
  | 'ambient'
  | 'runner'
  | 'gpu'
  | 'github'
  | 'widgets';

export interface DockItem {
  id: string;
  kind: 'app' | 'link' | 'widget';
  label: string;
  shortCode?: string;
  icon: string;
  target?: string;
  widgetKind?: WidgetKind;
  shortcut?: string;
  enabled: boolean;
  iconUri?: string;
  iconPath?: string;
  group?: 'apps' | 'widgets' | 'system';
}

export interface ClipboardEntry {
  id: string;
  kind: 'text' | 'link' | 'image' | 'file' | 'code';
  title: string;
  content: string;
  previewSubtitle?: string;
  sourceApp: string;
  copiedAt: string;
  relativeTime: string;
  lengthLabel: string;
  pinned: boolean;
  monogram?: string;
  imageDataUrl?: string;
  thumbGradient?: string;
}

export interface WeatherHour {
  label: string;
  tempC: number;
  icon: 'sun' | 'moon' | 'cloud' | 'rain';
}

export interface WeatherPayload {
  city: string;
  tempC: number;
  condition: string;
  icon: 'sun' | 'moon' | 'cloud' | 'rain';
  highC: number;
  lowC: number;
  hourly: WeatherHour[];
}

export interface DiskMount {
  mount: string;
  usedGb: number;
  totalGb: number;
  percent: number;
}

export interface StatsPayload {
  cpuPercent: number;
  memUsedGb: number;
  memTotalGb: number;
  memPercent: number;
  gpuPercent: number;
  diskMount: string;
  diskUsedGb: number;
  diskTotalGb: number;
  diskPercent: number;
  disks: DiskMount[];
  cpuHistory: number[];
  cores: number[];
  netDownBps: number;
  netUpBps: number;
  refreshSec: 1 | 2 | 5;
  paused: boolean;
}

export interface PeripheralBattery {
  id: string;
  name: string;
  kind: 'mouse' | 'keyboard' | 'headphones' | 'system';
  percent: number;
  charging: boolean;
  connected: boolean;
  detail?: string;
}

export interface BatteryPayload {
  hasSystemBattery: boolean;
  percent: number;
  charging: boolean;
  acConnected: boolean;
  stateText: string;
  timeRemainingText: string;
  powerMode: string;
  healthPercent: number;
  model?: string;
  remainingWh?: number;
  fullChargedWh?: number;
  designWh?: number;
  voltageV?: number;
  powerRateW?: number;
  history?: number[];
  peripherals: PeripheralBattery[];
}

export interface PlayerPayload {
  playing: boolean;
  title: string;
  artist: string;
  album?: string;
  artworkUrl?: string;
  sourceApp?: string;
  positionSec: number;
  durationSec: number;
}

export interface FocusPayload {
  running: boolean;
  mode: 'focus' | 'break';
  durationMinutes: number;
  remainingSec: number;
  totalSec: number;
  completedSessions: number;
  focusedMinutesToday: number;
}

export interface WorldClockCity {
  id: string;
  city: string;
  country: string;
  timezone: string;
  timeText: string;
  dateText: string;
  offsetText: string;
  isDay: boolean;
}

export interface WorldClockPayload {
  localTimeText: string;
  localDateText: string;
  localZoneText: string;
  cities: WorldClockCity[];
}

export interface ScratchpadNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ScratchpadPayload {
  activeNoteId: string;
  notes: ScratchpadNote[];
}

export interface ColorPickerPayload {
  currentHex: string;
  rgbText: string;
  hslText: string;
  cssVarText: string;
  contrastWhite: number;
  contrastDark: number;
  history: string[];
}

export interface CalendarEventItem {
  id: string;
  title: string;
  timeText: string;
  relativeText: string;
  joinUrl?: string;
  provider?: string;
}

export interface CalendarPayload {
  nextSummary: string;
  todayDateText: string;
  events: CalendarEventItem[];
}

export interface AudioPayload {
  volumePercent: number;
  muted: boolean;
  micMuted: boolean;
  outputDevice: string;
  inputDevice: string;
}

export interface ListeningPort {
  port: number;
  pid: number;
  processName: string;
  url: string;
}

export interface NetworkPayload {
  connected: boolean;
  ssid: string;
  localIp: string;
  pingMs: number;
  downMbps: number;
  upMbps: number;
  ports: ListeningPort[];
}

export interface BluetoothDeviceItem {
  id: string;
  name: string;
  type: 'headphones' | 'mouse' | 'keyboard' | 'controller' | 'device';
  connected: boolean;
  batteryLevel?: number | null;
}

export interface BluetoothPayload {
  connectedCount: number;
  devices: BluetoothDeviceItem[];
}

export interface ProcessItem {
  pid: number;
  name: string;
  memMb: number;
  threads: number;
}

export interface TaskItem {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

export interface TasksPayload {
  items: TaskItem[];
  pendingCount: number;
}

export interface CalculatorHistoryItem {
  expr: string;
  result: string;
}

export interface CalculatorPayload {
  lastExpr: string;
  lastResult: string;
  history: CalculatorHistoryItem[];
}

export interface StorageDrive {
  letter: string;
  label: string;
  type: string;
  usedGb: number;
  totalGb: number;
  freeGb: number;
  percent: number;
}

export interface StoragePayload {
  primaryPercent: number;
  primaryDrive: string;
  drives: StorageDrive[];
}

export interface DisplayPayload {
  monitorName?: string;
  brightness: number;
  nightLight: boolean;
  resolution: string;
  refreshRate: number;
  supportedRefreshRates?: number[];
  scaling: number;
  statusMessage?: string;
}

export interface PrivacyPayload {
  micActive: boolean;
  cameraActive: boolean;
  micMuted: boolean;
  activeApps: string[];
}

export interface AmbientPayload {
  playing: boolean;
  sound: 'rain' | 'waves' | 'campfire' | 'coffee' | 'wind' | 'brown';
  volume: number;
}

export interface RunnerCommand {
  id: string;
  name: string;
  cmd: string;
  desc: string;
}

export interface RunnerPayload {
  commands: RunnerCommand[];
  lastOutput: string;
  lastCmd: string;
  running: boolean;
}

export interface GpuPayload {
  name: string;
  utilizationPercent: number;
  tempC: number;
  vramUsedGb: number;
  vramTotalGb: number;
  driverVersion?: string;
}

export interface GithubItem {
  id: string;
  title: string;
  repo: string;
  type: 'pr' | 'issue' | 'mention';
  url: string;
  status: string;
}

export interface GithubPayload {
  username?: string;
  connected: boolean;
  pendingCount: number;
  items: GithubItem[];
}

export interface FlankState {
  dataSource: 'sample' | 'live';
  themeId: string;
  edgeOverride: 'left' | 'right' | null;
  accentOverride: string | null;
  recentAccents?: string[];
  dockState?: 'expanded' | 'collapsing' | 'collapsed' | 'expanding';
  startCollapsed?: boolean;
  autoCollapse?: boolean;
  autoCollapseSeconds?: number;
  collapseOnFullscreen?: boolean;
  collapseHotkey?: string;
  showLogoOnTab?: boolean;
  useOnlineFaviconFallback?: boolean;
  widgetsCollapsed?: boolean;
  reserveScreenSpace: boolean;
  autostart: boolean;
  activeWidget: WidgetKind | null;
  activeFullWindow: 'clipboard' | 'stats' | 'battery' | 'clock' | 'settings' | null;
  items: DockItem[];
  clipboard: {
    count: number;
    maxItems: number;
    items: ClipboardEntry[];
  };
  weather: WeatherPayload;
  stats: StatsPayload;
  battery: BatteryPayload;
  player: PlayerPayload;
  focus: FocusPayload;
  clock: WorldClockPayload;
  scratchpad: ScratchpadPayload;
  colorpicker: ColorPickerPayload;
  calendar: CalendarPayload;
  audio: AudioPayload;
  network: NetworkPayload;
  ai?: any;
  activity?: any;
  bluetooth?: BluetoothPayload;
  topProcesses?: ProcessItem[];
  tasks?: TasksPayload;
  calculator?: CalculatorPayload;
  storage?: StoragePayload;
  display?: DisplayPayload;
  privacy?: PrivacyPayload;
  ambient?: AmbientPayload;
  runner?: RunnerPayload;
  gpu?: GpuPayload;
  github?: GithubPayload;
}

